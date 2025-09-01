import { useEffect } from "react";

export default function TopBarModal({
  type = "info",
  message = "",
  isOpen = false,
  onClose,
  duration = 3000, // default auto-close after 3s
}) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 transform transition-transform duration-500 ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      } ${styles[type]} text-white text-center py-3 shadow-lg z-50`}
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
