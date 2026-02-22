// 28. Coding Challenge – Implement Throttle

// Answer:

function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
    }
  };


const handleScroll = throttle(() => {
  console.log("Scroll event handled");
}, 1000);

window.addEventListener("scroll", handleScroll);

//  