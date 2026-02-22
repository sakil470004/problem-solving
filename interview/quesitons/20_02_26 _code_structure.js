31. System Design: How would you structure a scalable React project?

Answer:

A scalable React project should follow feature-based architecture, not type-based.

❌ Bad:

/components
/pages
/utils


✅ Better:

/features
   /auth
   /products
   /cart
/shared
   /components
   /hooks
   /utils

   

Each feature contains:

UI

hooks

API logic

types

Why?

Isolation

Easier scaling

Clear ownership

Avoids massive folders