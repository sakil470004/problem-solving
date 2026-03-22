4. Question (React – Core)

Why is useEffect dependency array important, and what happens if you misuse it?

Answer
Purpose:

Controls when side effects run.

Example:
useEffect(() => {
  fetchData();
}, [userId]);

Runs when userId changes.

Common Mistakes:
1. Missing dependency
useEffect(() => {
  console.log(count);
}, []); // BUG

→ stale value

2. Infinite loop
useEffect(() => {
  setState(data);
}, [data]);
Rule:

Dependencies must include everything used inside effect

Fix:

Use ESLint rule:

react-hooks/exhaustive-deps
Critical Insight:

Misusing this causes:

memory leaks

infinite re-renders

stale UI

Source: React Docs – Hooks