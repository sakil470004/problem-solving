43. Explain Event Delegation.

Answer:

Instead of attaching event listeners to many elements, attach one to parent.

Example On Picture

document.getElementById("list").addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    console.log("Item clicked");
  }
});

Why?
- Better performance
- Handles dynamic elements
- Fewer listeners

React internally uses event delegation.