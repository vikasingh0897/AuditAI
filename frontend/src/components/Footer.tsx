import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-low border-t border-surface-variant w-full mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between py-12 px-4 md:px-16 max-w-[1440px] mx-auto w-full">
        {/* Brand and Developer Credit */}
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <div className="font-sans text-xl font-bold text-primary mb-2">Audit AI</div>
          <div className="text-sm text-on-surface-variant">
            © 2026 Audit AI. Precision Infrastructure Auditing.
          </div>
          <div className="text-xs text-on-surface-variant mt-2">
            Developed by{' '}
            <a
              href="https://linkedin.com/in/vikasingh0897"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Vikas Singh
            </a>
            {' | '}
            <a
              href="https://github.com/vikasingh0897"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              @vikasingh0897
            </a>
          </div>
        </div>

        {/* Essential Product Links */}
        <nav
          className="flex flex-wrap justify-center gap-x-8 gap-y-4"
          aria-label="Footer navigation"
        >
          <a
            href="#"
            className="text-on-surface-variant text-xs font-semibold hover:text-primary underline decoration-2 underline-offset-4 transition-all"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-on-surface-variant text-xs font-semibold hover:text-primary underline decoration-2 underline-offset-4 transition-all"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-on-surface-variant text-xs font-semibold hover:text-primary underline decoration-2 underline-offset-4 transition-all"
          >
            Security Documentation
          </a>
          <a
            href="mailto:support@auditai.example"
            className="text-on-surface-variant text-xs font-semibold hover:text-primary underline decoration-2 underline-offset-4 transition-all"
          >
            Contact Support
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
