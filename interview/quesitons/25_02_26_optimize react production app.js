35. How would you secure a React + Node app using JWT?

Answer:

Frontend:
- Store token in HTTP-only cookie
- Never store JWT in localStorage (XSS risk)

Backend:
- Verify JWT in middleware
- Use short expiry + refresh token
- Hash passwords (bcrypt)
- Rate limit login attempts

Security mindset:
Assume frontend is compromised. Backend must enforce everything.