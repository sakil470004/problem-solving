40. Real Production Scenario:

Your infinite scroll is causing duplicate API calls. Why?

Answer:

Common causes:
- Observer triggering multiple times
- Missing loading state guard
- Not throttling calls

Fix on Code

if (loading) return;
setLoading(true);

We need to Always control race conditions.