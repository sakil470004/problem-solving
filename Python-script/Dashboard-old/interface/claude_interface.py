# interface/claude_interface.py
from typing import Dict, Any, Optional, List
import logging
from datetime import datetime
import json
from pathlib import Path
import anthropic

class ClaudeInterface:
    """Handles secure interaction with Claude AI"""
    
    def __init__(self, config: 'DashboardConfig', encoder: 'SecureEncoder'):
        """
        Initialize Claude interface
        Args:
            config: DashboardConfig instance
            encoder: SecureEncoder instance
        """
        self._setup_logging()
        self.config = config
        self.encoder = encoder
        self.client = anthropic.Client(api_key=config.claude_key)
        self.response_path = config.get_path('responses')
        self.logger.info("ClaudeInterface initialized successfully")
        
    def _setup_logging(self) -> None:
        """Configure logging for ClaudeInterface"""
        self.logger = logging.getLogger('ClaudeInterface')
        
    async def send_message(self, 
                          content: str,
                          context: Optional[Dict] = None,
                          max_tokens: int = 1024) -> Dict[str, Any]:
        """
        Send message to Claude
        Args:
            content: Message content
            context: Optional context information
            max_tokens: Maximum tokens for response
        Returns:
            Dict[str, Any]: Response data
        """
        try:
            # Prepare message with context
            message_data = self._prepare_message(content, context)
            
            # Encode sensitive data
            encoded_message = self.encoder.encode_data(message_data)
            
            # Send to Claude
            response = await self.client.messages.create(
                model=self.config.get_setting('CLAUDE_MODEL', 'claude-3-opus-20240229'),
                max_tokens=max_tokens,
                messages=[{
                    "role": "user",
                    "content": encoded_message
                }]
            )
            
            # Process and store response
            processed_response = self._process_response(response, message_data)
            self._store_response(processed_response)
            
            return processed_response
            
        except Exception as e:
            self.logger.error(f"Error sending message to Claude: {str(e)}")
            raise
            
    def _prepare_message(self, 
                        content: str,
                        context: Optional[Dict]) -> Dict[str, Any]:
        """
        Prepare message with metadata
        Args:
            content: Message content
            context: Optional context
        Returns:
            Dict[str, Any]: Prepared message data
        """
        return {
            "content": content,
            "context": context or {},
            "timestamp": datetime.now().isoformat(),
            "message_id": f"msg_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        }
        
    def _process_response(self, 
                         response: Any,
                         original_message: Dict) -> Dict[str, Any]:
        """
        Process Claude's response
        Args:
            response: Claude response
            original_message: Original message data
        Returns:
            Dict[str, Any]: Processed response data
        """
        return {
            "response_id": response.id,
            "content": response.content,
            "original_message": original_message,
            "tokens_used": response.usage.total_tokens,
            "timestamp": datetime.now().isoformat()
        }
        
    def _store_response(self, response_data: Dict[str, Any]) -> None:
        """
        Store response securely
        Args:
            response_data: Response data to store
        """
        try:
            # Encode response data
            encoded_response = self.encoder.encode_data(response_data)
            
            # Create response file
            response_file = self.response_path / f"{response_data['response_id']}.enc"
            response_file.write_text(encoded_response)
            
            self.logger.debug(f"Response stored: {response_data['response_id']}")
            
        except Exception as e:
            self.logger.error(f"Error storing response: {str(e)}")
            raise
            
    def get_response_history(self, 
                           limit: Optional[int] = None,
                           since: Optional[datetime] = None) -> List[Dict[str, Any]]:
        """
        Retrieve response history
        Args:
            limit: Optional limit on number of responses
            since: Optional datetime to filter responses
        Returns:
            List[Dict[str, Any]]: Response history
        """
        try:
            responses = []
            for response_file in self.response_path.glob('*.enc'):
                # Read and decode response
                encoded_data = response_file.read_text()
                response_data = self.encoder.decode_data(encoded_data)
                
                # Apply filters
                if since and datetime.fromisoformat(response_data['timestamp']) < since:
                    continue
                    
                responses.append(response_data)
                
            # Sort by timestamp and apply limit
            responses.sort(key=lambda x: x['timestamp'], reverse=True)
            if limit:
                responses = responses[:limit]
                
            return responses
            
        except Exception as e:
            self.logger.error(f"Error retrieving response history: {str(e)}")
            raise
            
    def cleanup_old_responses(self, max_age_days: int = 30) -> int:
        """
        Clean up old response files
        Args:
            max_age_days: Maximum age of responses to keep
        Returns:
            int: Number of responses cleaned up
        """
        try:
            cleanup_count = 0
            current_time = datetime.now()
            
            for response_file in self.response_path.glob('*.enc'):
                # Check file age
                file_age = current_time - datetime.fromtimestamp(response_file.stat().st_mtime)
                
                if file_age.days > max_age_days:
                    response_file.unlink()
                    cleanup_count += 1
                    
            self.logger.info(f"Cleaned up {cleanup_count} old responses")
            return cleanup_count
            
        except Exception as e:
            self.logger.error(f"Error cleaning up responses: {str(e)}")
            raise