38. How would you implement role-based access control in React?

Answer:

Store user role in auth context

Create ProtectedRoute component

function ProtectedRoute({ role, children }) {
  const { user } = useAuth();
  if (user.role !== role) return <Navigate to="/" />;
  return children;
}

Security rule:
Frontend hides UI.
Backend enforces permission.

Never trust frontend alone.