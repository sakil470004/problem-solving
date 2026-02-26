1. React Native / Expo Questions
Question	Key Points to Answer
What is Expo and why did you use it?	Managed workflow, faster development, easy build process, no native code setup
Difference between Expo Go and Development Build?	Expo Go has limitations (no native modules), Dev Build allows custom native code like FCM
How does React Navigation work?	Stack Navigator for auth flow, Tab Navigator for main app, nested navigation
What is AsyncStorage? When to use it?	Local key-value storage, used for tokens, user data, settings persistence
How do you handle state management?	Context API for global auth state, useState for local component state
What is FlatList? Why use it over ScrollView?	Virtualized list, renders only visible items, better performance for large lists
How did you make the app responsive?	useWindowDimensions hook, dynamic styles based on screen width, breakpoints

2. Node.js / Express Questions
Question	Key Points to Answer
What is middleware in Express?	Functions that run between request and response, used for auth, logging, error handling
Explain your JWT authentication flow	Login → generate token → client stores it → sends in header → middleware verifies
How does the protect middleware work?	Extracts token from header, verifies with jwt.verify(), attaches user to req object
What is bcrypt? Why hash passwords?	One-way hashing, prevents plain text storage, compare() for verification
How did you structure your backend?	MVC pattern - Models, Controllers, Routes separated for maintainability
How do you handle errors in Express?	Try-catch blocks, error middleware, proper status codes (400, 401, 404, 500)

3. MongoDB / Mongoose Questions
Question	Key Points to Answer
Why MongoDB over SQL?	Flexible schema, JSON-like documents, good for rapid development, scales horizontally
What is Mongoose? Why use it?	ODM (Object Data Modeling), schema validation, middleware hooks, easier queries
Explain your User schema	username, email, password (hashed), fcmToken, timestamps
What are Mongoose virtuals?	Computed properties not stored in DB, e.g., likesCount, commentsCount
How did you implement pagination?	skip() and limit() methods, page & limit query params
What is populate() in Mongoose?	Joins referenced documents, e.g., populate('author') gets full user object

4. Firebase / Push Notifications Questions
Question	Key Points to Answer
How does FCM work?	Device registers → gets token → backend sends via Firebase Admin SDK → Firebase delivers
Why store FCM token in database?	To send notifications later when someone interacts with user's post
When do you send notifications?	On like (if not own post), on comment (if not own post)
What's the difference between notification and data messages?	Notification: system handles display. Data: app handles, more control
Why did you need a Development Build?	Expo Go removed push notification support in SDK 53+, native modules required

5. API Design Questions
Question	Key Points to Answer
What is REST API?	Stateless, uses HTTP methods (GET, POST, PUT, DELETE), resource-based URLs
Why use POST for like instead of PUT?	POST for action/toggle, could also argue PUT for updating like state
How do you secure your APIs?	JWT authentication, protected routes, input validation, proper error handling
What status codes did you use?	200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 404 (not found), 500 (server error)
