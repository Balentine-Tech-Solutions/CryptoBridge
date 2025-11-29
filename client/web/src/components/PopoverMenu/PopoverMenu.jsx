import React, { useState, useRef, useEffect } from 'react';
import './PopoverMenu.css';

export default function PopoverMenu({ trigger, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="popover-menu" ref={menuRef}>
      <button
        className="popover-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </button>

      {isOpen && (
        <div className="popover-content" role="menu">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="popover-item"
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
