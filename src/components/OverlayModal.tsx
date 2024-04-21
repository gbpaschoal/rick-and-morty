export default function OverlayModal({ children }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-2 z-4 flex flex-col items-center px-4">
      {children}
    </div>
  );
}
