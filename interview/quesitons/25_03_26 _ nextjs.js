

// Q. What is API routing in Next.js?

// A. Next.js allows building backend endpoints inside the project.
// Example:

//- path: /pages/api/users.js
export default function handler(req,res){
  res.status(200).json({name:"John"})
}


