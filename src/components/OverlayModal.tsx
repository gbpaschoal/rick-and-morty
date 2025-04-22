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
    if (isOpen) document.body.style.overflowY = 'hidden'

    return () => {document.body.style.overflowY = ''}
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 z-4 grid place-content-center px-4">
      <div
        onClick={onClose}
        className="absolute -z-1 bg-gray-800/80 backdrop-blur-md w-full min-h-screen">
        <button className="ml-auto grid z-3 p-4">
          <Icon.Close className="fill-gray-200 hover:fill-white" />
        </button>
      </div>
      {children}
    </div>
  );
}
