// Q. What is event delegation?

// Event delegation attaches a single event listener to a parent element instead of multiple child elements.


// Benefits:

// Better performance

// Works with dynamically added elements
// Example:

document.getElementById("list")
.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Item clicked");
  }
});


