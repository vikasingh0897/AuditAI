import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Share2,
  Sparkles,
  AlertCircle,
  TrendingDown,
  ArrowLeft,
  Clock,
  CheckCircle2,
  RefreshCw,
  Download,
} from 'lucide-react';
import LeadModal from './LeadModal';

interface Recommendation {
  toolName: string;
  currentSpend: number;
  suggestedAction: string;
  potentialSavings: number;
  reason: string;
}

interface AuditData {
  _id: string;
  teamSize: number;
  totalMonthlySavings: number;
  aiSummary: string;
  recommendations: Recommendation[];
  createdAt: string;
  isLeadCaptured?: boolean;
}

const ResultsDashboard: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${baseUrl}/api/audit/${slug}`);
        const data = await res.json();
        if (data.success) setAuditData(data.data);
      } catch (err) {
        console.error('Failed to load audit', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAudit();
  }, [slug]);

  const handleRegenerateSummary = async () => {
    if (!auditData) return;
    setIsRegenerating(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      // Calls your PATCH route using the database _id
      const res = await fetch(`${baseUrl}/api/audit/${auditData._id}/refresh-summary`, {
        method: 'PATCH',
      });
      const data = await res.json();

      if (data.success) {
        // Update the state with the fresh summary
        setAuditData((prev) => (prev ? { ...prev, aiSummary: data.data.aiSummary } : prev));
      }
    } catch (err) {
      console.error('Failed to refresh summary', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">
            Compiling Report...
          </p>
        </div>
      </div>
    );

  if (!auditData)
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-bold">Audit Not Found</h2>
        <Link to="/auditpage" className="text-primary font-bold flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Start New Audit
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-geist print:bg-white print:pb-0">
      {/* HEADER / NAVIGATION (Hidden when printing) */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/auditpage"
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">
              New Audit
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {new Date(auditData.createdAt).toLocaleDateString()}
              </span>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="bg-slate-100 text-slate-600 p-2 sm:px-4 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-slate-200 transition"
              title="Download PDF"
            >
              <Download size={14} /> <span className="hidden sm:inline">PDF</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white p-2 sm:px-5 sm:py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:opacity-90 transition active:scale-95 shadow-md"
            >
              <Share2 size={14} /> <span className="hidden sm:inline">Save & Share</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 pt-6 md:pt-10 space-y-6 md:space-y-8 print:pt-0">
        {/* HERO SAVINGS CARD */}
        <section className="bg-primary text-white p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] shadow-xl shadow-primary/20 relative overflow-hidden print:shadow-none print:text-black print:border print:border-slate-200 print:bg-white">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
            <div className="text-center md:text-left w-full">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-80 print:text-slate-500">
                Projected Annual Savings
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mt-2">
                ${(auditData.totalMonthlySavings * 12).toLocaleString()}
                <span className="text-xl md:text-2xl opacity-50 ml-1 md:ml-2">/yr</span>
              </h1>
              <p className="mt-3 md:mt-4 text-white/80 font-medium text-sm md:text-lg max-w-sm mx-auto md:mx-0 print:text-slate-600">
                We've identified{' '}
                <span className="text-white font-bold print:text-black">
                  ${auditData.totalMonthlySavings.toLocaleString()}
                </span>{' '}
                in monthly optimizations for your team of {auditData.teamSize}.
              </p>
            </div>
            <div className="hidden sm:block bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/20 text-center shrink-0 print:hidden">
              <TrendingDown className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 text-green-300" />
              <span className="text-xl md:text-2xl font-black block">Optimize</span>
            </div>
          </div>
        </section>

        {/* AI STRATEGY SUMMARY */}
        <section className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2rem] border border-slate-200 shadow-sm relative print:shadow-none">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg print:hidden">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              </div>
              <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-slate-800">
                AI Strategy Summary
              </h3>
            </div>
            {/* REGENERATE BUTTON */}
            <button
              onClick={handleRegenerateSummary}
              disabled={isRegenerating}
              className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition flex items-center gap-1 disabled:opacity-50 print:hidden"
            >
              <RefreshCw size={12} className={isRegenerating ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">
                {isRegenerating ? 'Refreshing...' : 'Regenerate'}
              </span>
            </button>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm md:text-lg italic print:text-black">
            "{auditData.aiSummary}"
          </p>
        </section>

        {/* DETAILED TOOL BREAKDOWN */}
        {auditData.recommendations?.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
              Actionable Breakdown
            </h3>
            {auditData.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 print:shadow-none print:break-inside-avoid"
              >
                {/* Tool Info */}
                <div className="flex gap-4 items-center">
                  <div className="hidden sm:flex bg-slate-50 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl items-center justify-center shrink-0 border border-slate-100 print:hidden">
                    <span className="text-lg md:text-xl font-black text-slate-400">
                      {rec.toolName[0]}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-black text-slate-900">{rec.toolName}</h4>
                    <span className="inline-block mt-1 bg-amber-50 text-amber-700 text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-amber-100">
                      {rec.suggestedAction}
                    </span>
                  </div>
                </div>

                {/* Financial Comparison - Mobile Row, Desktop Columns */}
                <div className="flex flex-row md:flex-row gap-6 md:gap-8 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Current
                    </p>
                    <p className="text-base md:text-lg font-bold text-slate-600">
                      ${rec.currentSpend}
                      <span className="text-xs opacity-50">/mo</span>
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-[9px] md:text-[10px] font-bold text-green-600 uppercase tracking-widest">
                      Savings
                    </p>
                    <p className="text-base md:text-lg font-bold text-green-600">
                      -${rec.potentialSavings}
                      <span className="text-xs opacity-50">/mo</span>
                    </p>
                  </div>
                </div>

                <div className="hidden lg:block w-px h-10 bg-slate-100" />

                {/* Reason */}
                <div className="w-full md:max-w-xs border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1 print:text-black">
                    <CheckCircle2 className="w-3 h-3 print:hidden" /> Why?
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium print:text-slate-800">
                    {rec.reason}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* BOTTOM CTA (Hidden when printing) */}
        <div className="pt-6 pb-8 md:pb-12 text-center print:hidden">
          <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">
            Audit ID: {slug}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl sm:rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all active:scale-95 shadow-xl"
          >
            Email Me This Report
          </button>
        </div>
      </main>

      {/* LEAD CAPTURE MODAL (Hidden when printing) */}
      <div className="print:hidden">
        <LeadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          slug={slug as string}
          isAlreadyCaptured={auditData.isLeadCaptured}
        />
      </div>
    </div>
  );
};

export default ResultsDashboard;
