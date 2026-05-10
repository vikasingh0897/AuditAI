import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-surface sticky top-0 z-50 border-b border-surface-variant w-full">
      <div className="flex items-center justify-between h-20 px-4 md:px-16 max-w-[1440px] mx-auto w-full">
        {/* Logo Section */}
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/AuditAI-Logo.svg" alt="Audit AI Logo" className="h-12 w-auto" />
          </NavLink>
        </div>

        {/* Primary CTA */}
        <NavLink
          to="/auditpage"
          className="bg-primary text-white px-6 py-2.5 rounded text-sm font-semibold hover:opacity-90 active:scale-95 transition-all inline-block"
        >
          Start Audit
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
