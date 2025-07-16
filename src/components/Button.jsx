export default function Button({ children, ...props }) {
  return (
    <button
      className="px-6 py-3 font-semibold rounded-lg shadow transition bg-green-600 text-white"
      {...props}
    >
      {children}
    </button>
  );
}