42. What is a memory leak in React? Give real example.

Answer:

Memory leak occurs when resources are not cleaned up.

Problem on Example:
WebSocket never closes on unmount.

Example:

useEffect(() => {
  const socket = new WebSocket("ws://example.com");

  socket.onmessage = () => {};

}, []);

Fix:

useEffect(() => {
  const socket = new WebSocket("ws://example.com");

  return () => socket.close();
}, []);


Rule:
Every side effect must have cleanup.