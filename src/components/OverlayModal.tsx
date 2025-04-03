import React from 'react';
import * as Icon from './../assets/icons';

type OverlayModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function OverlayModal({
  children,
  isOpen,
  onClose,
}: OverlayModalProps) {
  React.useEffect(() => {
    const isAlreadyOpen = document.body.style.overflowY === 'hidden';

    if (isOpen && !isAlreadyOpen) {
      document.body.style.overflowY = 'hidden';
    }

    return () => {
      if (!isAlreadyOpen) {
        document.body.style.overflowY = '';
      }
    };
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 z-4 flex flex-col items-center px-4"
      id="modal">
      <div
        onClick={onClose}
        className="absolute -z-1 backdrop-blur-2xl w-full h-screen"
        aria-expanded={isOpen}>
        <button
          className="ml-auto grid
        place-items-center z-3 p-4"
          type="button"
          role="button"
          aria-label="Close Modal"
          aria-controls="modal"
          title="Close">
          <Icon.Close className="fill-light-100/60 hover:fill-light-200" />
        </button>
      </div>
      {children}
    </div>
  );
}
