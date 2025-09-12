function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Example usage
const log = debounce((num) => console.log(num), 1000);
log(1); log(2); log(3); // Only logs 3 after 1 second
