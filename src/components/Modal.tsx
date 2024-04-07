import React from 'react';

function Modal({ onClose }) {
  return (
    <div onClick={onClose} className="text-light-100">
      Modal
    </div>
  );
}

export function MainModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div onClick={() => setIsOpen(true)} className="text-light-100">
      Abrir
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
