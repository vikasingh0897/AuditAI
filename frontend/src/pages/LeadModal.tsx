import React, { useState } from 'react';
import { X, Copy, CheckCircle2 } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  isAlreadyCaptured?: boolean;
}

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, slug, isAlreadyCaptured }) => {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  // Honeypot state
  const [websiteUrl, setWebsiteUrl] = useState('');

  const [isCaptured, setIsCaptured] = useState(isAlreadyCaptured || false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/audit/${slug}`;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${baseUrl}/api/leads/capture/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Include the honeypot field in the payload
        body: JSON.stringify({ email, companyName, website_url: websiteUrl }),
      });

      const data = await res.json();

      // Even if it was caught by the honeypot, your middleware returns success: true,
      // which is exactly what we want so the bot thinks it succeeded.
      if (data.success) {
        setIsCaptured(true);
      }
    } catch (err) {
      console.error('Lead capture failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-md p-8 relative shadow-2xl animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-800"
        >
          <X size={24} />
        </button>

        {!isCaptured ? (
          <div>
            <h2 className="text-2xl font-black mb-2">Save & Share Report</h2>
            <p className="text-slate-500 mb-6 text-sm">
              Enter your email to unlock the shareable link and get a copy of this report sent to
              your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* HONEYPOT FIELD - Visually hidden but accessible to bots */}
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <label htmlFor="website_url">Leave this field blank</label>
                <input
                  type="text"
                  id="website_url"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </div>

              <input
                type="text"
                required
                placeholder="Company Name"
                className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-primary outline-none font-bold"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                type="email"
                required
                placeholder="Work Email"
                className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-primary outline-none font-bold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Get Link'}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-green-600 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black mb-2">Report Saved!</h2>
            <p className="text-slate-500 mb-6 text-sm">
              Anyone with this link can view your audit.
            </p>

            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
              <input
                readOnly
                value={shareUrl}
                className="bg-transparent flex-1 outline-none px-2 text-sm text-slate-600"
              />
              <button
                onClick={handleCopy}
                className="bg-white p-3 rounded-lg border border-slate-200 hover:bg-slate-100 transition"
              >
                {copied ? (
                  <CheckCircle2 size={18} className="text-green-600" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadModal;
