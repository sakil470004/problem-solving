You need to build a real-time chat system in React + Node. What architecture would you use?

Answer: Here is How I will try to approch 
Frontend:
- React
- WebSocket client

Backend:
- Node + WebSocket (or Socket.io)
- Redis for pub/sub (if multiple servers)

Scaling:
- Horizontal scaling
- Load balancer
- Sticky sessions
- Message queue

Database:
- MongoDB for message storage
- Index by roomId + timestamp

Security:
- Authenticate socket connection with JWT
- Rate limit messages

Production mindset:
- Stateless backend + centralized message broker.