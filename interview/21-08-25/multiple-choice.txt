Next.js Questions

What is the use of the getInitialProps function in Next.js?
Answer: It fetches some data and passes it as props to your page.
Explanation: getInitialProps is a static lifecycle method in Next.js used to fetch data during server-side rendering or static generation and pass it as props to the page component. It runs on the server for initial page loads and on the client for client-side navigation.
How does Next.js handle 404 pages?
Answer: By creating a custom 404.js file inside the pages directory.
Explanation: In Next.js, a custom 404 page can be created by adding a 404.js file in the pages directory. This file will be used to render a custom 404 error page when a route is not found.
What is a potential drawback of using getInitialProps in Next.js?
Answer: It disables Automatic Static Optimization.
Explanation: Using getInitialProps prevents Next.js from automatically optimizing pages for static generation, forcing the page to be server-side rendered or client-side rendered, which can impact performance.
Which method in Next.js can be used for client-side navigation?
Answer: Router.push.
Explanation: The Router.push method from next/router is used for programmatic client-side navigation in Next.js, allowing navigation to a new route without a full page reload.
How can you share state between pages in a Next.js app?
Answer: By using a state management library like Redux or MobX.
Explanation: State management libraries like Redux or MobX are commonly used in Next.js to share state across pages, as they provide a centralized store accessible to all components.
In Next.js, how can you add environment variables that will be available only on the server side?
Answer: By adding the variable to the .env file.
Explanation: Environment variables in the .env file (without the NEXT_PUBLIC_ prefix) are only available on the server side in Next.js. Variables prefixed with NEXT_PUBLIC_ are exposed to the client side.
What does fallback: blocking do in the getStaticPaths function in Next.js?
Answer: It generates the page at request time if the page was not generated at build time, and the user will not see the page until it’s fully generated.
Explanation: With fallback: 'blocking' in getStaticPaths, if a page is not pre-generated at build time, Next.js generates it on-demand during the request, and the user waits until the page is fully rendered before seeing it.
How can you make a Next.js application fully server-rendered?
Answer: By using getServerSideProps in every page.
Explanation: Using getServerSideProps in page components ensures that pages are rendered on the server for each request, making the application fully server-side rendered.
In Next.js, how can you generate a static site with data that needs to be fetched from an API?
Answer: By using getStaticProps and fetching the data inside this function.
Explanation: getStaticProps is used to fetch data at build time for static site generation, allowing you to fetch data from an API and pass it as props to the page.
In Next.js, how can you pass data from getServerSideProps or getStaticProps to your page?
Answer: By returning an object with a props key from these functions.
Explanation: Both getServerSideProps and getStaticProps return an object with a props key, which contains the data passed to the page component as props.


JavaScript Questions

In JavaScript, how can you copy an object by value, not by reference?
Answer: Using the JSON.parse() and JSON.stringify() methods.
Explanation: JSON.parse(JSON.stringify(obj)) creates a deep copy of an object, ensuring the new object is independent of the original. Object.assign() and the spread operator (...) only create shallow copies, which may still reference nested objects.
In JavaScript, what does the this keyword refer to inside an arrow function?
Answer: The context in which the arrow function was defined.
Explanation: Arrow functions do not have their own this binding; they inherit the this value from the surrounding lexical context (where the function is defined).


Git Questions

Which Git command enables you to pick up commits from a branch within a repository and apply it to another branch?
Answer: git cherry-pick.
Explanation: The git cherry-pick command allows you to apply specific commits from one branch to another by selecting their commit hashes.
What are Hooks in Git?
Answer: Scripts that Git runs before or after an event like commit, push, update, or receive.
Explanation: Git hooks are custom scripts stored in the .git/hooks directory that execute automatically before or after specific Git events, such as pre-commit or post-merge.


CSS Questions

Which CSS framework includes a responsive grid system, Sass variables and mixins, and prebuilt components such as navbars and carousels?
Answer: Bootstrap.
Explanation: Bootstrap is a popular CSS framework that provides a responsive grid system, Sass variables and mixins, and prebuilt components like navbars, carousels, and modals.
In the context of CSS, what is a pseudo-class?
Answer: A keyword added to selectors that specifies a special state of the selected element(s).
Explanation: Pseudo-classes (e.g., :hover, :focus, :nth-child) target elements based on their state or position, allowing dynamic styling without additional classes.
Which CSS property is used to change the text color of an element?
Answer: color.
Explanation: The color CSS property sets the foreground color of an element’s text content.
What’s the difference between display: none and visibility: hidden in CSS?
Answer: display: none removes the element from the layout, visibility: hidden makes it invisible but still occupies space.
Explanation: display: none removes the element entirely from the document flow, while visibility: hidden hides the element but preserves its space in the layout.
Which pseudo-class in CSS is used to select elements based on a specific position in a list of elements?
Answer: :nth-child().
Explanation: The :nth-child() pseudo-class selects elements based on their position within a parent element, using patterns like n, odd, or even.


SQL Question

In SQL, how would you rename a column in a table?
Answer: Using the ALTER TABLE command.
Explanation: The ALTER TABLE command, combined with RENAME COLUMN (in databases like PostgreSQL) or CHANGE/MODIFY (in MySQL), is used to rename a column. The exact syntax depends on the database system.