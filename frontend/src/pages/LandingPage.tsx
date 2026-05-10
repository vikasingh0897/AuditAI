import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, ShieldCheck, Share2, Sparkles } from 'lucide-react';

/**
 * LandingPage - A high-conversion, mobile-optimized hero view.
 * Designed to act as a lead-generation asset for Credex.
 */
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background font-geist selection:bg-primary/20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative px-4 pt-12 pb-20 md:pt-24 md:pb-32 max-w-7xl mx-auto text-center">
        {/* Abstract Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] bg-primary/10 blur-[120px] -z-10 rounded-full opacity-50" />

        {/* Dynamic Badge */}
        <div className="inline-flex items-center gap-2 bg-surface-container-highest/40 backdrop-blur-md px-3 py-1 rounded-full mb-8 border border-primary-fixed-dim/20 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary">
            The Mint for AI Spend
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-on-surface mb-6 leading-[1.1] tracking-tighter">
          Stop Overpaying for <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-primary to-primary-fixed-dim bg-clip-text text-transparent italic">
            AI Infrastructure.
          </span>
        </h1>

        {/* Subheadline / Value Prop */}
        <p className="text-base md:text-xl text-on-surface-variant max-w-xl mx-auto mb-10 leading-relaxed px-2">
          Startups are bleeding cash on unoptimized seats and direct API overages. Get a definitive,
          data-backed audit of your stack in 60 seconds.
        </p>

        {/* Primary Action Area */}
        <div className="flex flex-col items-center justify-center gap-6 px-4">
          <button
            onClick={() => navigate('/auditpage')}
            className="group w-full sm:w-auto bg-on-surface text-surface-bright text-lg font-bold px-10 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.95]"
          >
            Start Free Audit{' '}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-4 text-outline font-medium uppercase tracking-[0.15em] text-[10px]">
            <span>No Login Required</span>
            <span className="w-1 h-1 bg-outline-variant rounded-full" />
            <span>Instant Analysis</span>
          </div>
        </div>
      </section>

      {/* Modern Bento Feature Grid */}
      <section className="px-4 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Optimization Logic */}
          <div className="group bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/30 flex flex-col justify-between hover:bg-surface-container-high transition-all duration-300">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-12 shadow-sm group-hover:scale-110 transition-transform">
              <BarChart3 className="text-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Usage-Fit Benchmarks</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                We compare your team size against vendor tiers to find the "Goldilocks" plan for
                your specific use case.
              </p>
            </div>
          </div>

          {/* Radical Honesty */}
          <div className="group bg-primary-container/10 p-8 rounded-[2.5rem] border border-primary-fixed-dim/20 flex flex-col justify-between hover:bg-primary-container/20 transition-all duration-300">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-12 shadow-sm group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Zero-Bias Audits</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                If your stack is already perfect, we’ll tell you. We don't manufacture fake savings
                to push credits.
              </p>
            </div>
          </div>

          {/* Social / Viral Sharing */}
          <div className="group bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/30 flex flex-col justify-between hover:bg-surface-container-high transition-all duration-300">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-12 shadow-sm group-hover:scale-110 transition-transform">
              <Share2 className="text-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Shareable Results</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Generate unique URLs with identifying data stripped—perfect for sharing with
                founders and investors.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
