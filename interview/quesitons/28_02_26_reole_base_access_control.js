37. What causes memory leaks in React?

Answer:

Uncleaned timers

Unremoved event listeners

Unsubscribed WebSocket

Setting state after unmount

Example fix:

useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  return () => clearInterval(interval);
}, []);

Always clean up side effects.