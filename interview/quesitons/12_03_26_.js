Q. Senior Debug Question:
Why does this component re-render even though props didn’t change?

Possible reasons:
- Parent re-rendered
- New object/array created inline
- New function reference passed
- Context value changed
- StrictMode double rendering (development only)

Fix:
- Memoize
- Move logic outside render
- Use React.memo