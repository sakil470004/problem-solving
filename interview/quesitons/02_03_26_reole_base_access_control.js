39. Advanced: Explain hydration in Next.js.

Answer:
Hydration is when:
- Server renders HTML
- Browser attaches event listeners
- React becomes interactive

Problem:
If server HTML ≠ client render → hydration error.

Fix:
Avoid using:
- window during SSR
- Random values without guards