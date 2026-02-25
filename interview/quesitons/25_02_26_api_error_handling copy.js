34. Real Scenario: Your React app is slow in production. What steps do you take?

Answer:

1. Run Lighthouse
2. Analyze bundle size (npm run build --analyze)

3. Check:
   - Large dependencies
   - Unnecessary re-renders
  - Missing memoization
  - Large images

4. Implement:
  - Code splitting
  - Lazy loading
  - Image optimization
  - React Profiler

We Should Never guess. Measure first.