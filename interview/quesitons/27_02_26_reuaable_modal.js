36. Coding Challenge: Create a reusable Modal component


function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl">
        {children}
        <button onClick={onClose} className="mt-4">
          Close
        </button>
      </div>
    </div>
  );
}


Why good:
- Controlled by parent
- Reusable
- Decoupled

what is reast api?

A REST API (Representational State Transfer Application Programming Interface) is an architectural style for designing networked applications that uses standard HTTP methods to enable communication between different computer systems over the internet.