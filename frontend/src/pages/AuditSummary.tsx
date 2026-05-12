import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TrendingDown, ArrowLeft, Download, Sparkles, AlertCircle, Clock } from 'lucide-react';

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
}

const AuditSummary: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/audit/${slug}`);
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch audit:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAudit();
  }, [slug]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">
            Generating Report...
          </p>
        </div>
      </div>
    );

  if (!data)
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-bold">Audit Not Found</h2>
        <Link to="/audit" className="text-primary font-bold flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Start New Audit
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-geist">
      {/* HEADER */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/audit"
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Generated {new Date(data.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 pt-10 space-y-8">
        {/* HERO SAVINGS CARD */}
        <section className="bg-primary text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <span className="text-xs font-black uppercase tracking-[0.3em] opacity-70">
                Total Potential Savings
              </span>
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter mt-2">
                ${(data.totalMonthlySavings * 12).toLocaleString()}
                <span className="text-2xl opacity-50 ml-2">/yr</span>
              </h1>
              <p className="mt-4 text-primary-fixed-dim font-medium text-lg max-w-sm">
                We've identified{' '}
                <span className="text-white font-bold">
                  ${data.totalMonthlySavings.toLocaleString()}
                </span>{' '}
                in monthly optimizations for your team of {data.teamSize}.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
              <TrendingDown className="w-12 h-12 mx-auto mb-2 text-green-300" />
              <span className="text-2xl font-black block">~42%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                Avg. Reduction
              </span>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
        </section>

        {/* AI INSIGHT */}
        <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">
              AI Strategy Summary
            </h3>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg italic">"{data.aiSummary}"</p>
        </section>

        {/* TOOL BREAKDOWN */}
        {/* TOOL BREAKDOWN */}
        <section className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
            Recommended Actions
          </h3>
          {data.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-primary/30"
            >
              <div className="flex gap-4">
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100">
                  <span className="text-xl font-black text-slate-400">{rec.toolName[0]}</span>
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900">{rec.toolName}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-green-100">
                      {rec.suggestedAction}
                    </span>
                  </div>
                </div>
              </div>

              {/* NEW: Comparison Logic */}
              <div className="flex gap-8 border-t md:border-t-0 pt-4 md:pt-0 border-slate-50">
                <div className="text-left md:text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Current
                  </p>
                  <p className="text-lg font-bold text-slate-600">
                    ${rec.currentSpend}
                    <span className="text-xs opacity-50">/mo</span>
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    Savings
                  </p>
                  <p className="text-lg font-bold text-primary">
                    -${rec.potentialSavings}
                    <span className="text-xs opacity-50">/mo</span>
                  </p>
                </div>
              </div>

              <div className="hidden lg:block w-px h-10 bg-slate-100" />

              <div className="max-w-xs">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Why?
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{rec.reason}</p>
              </div>
            </div>
          ))}
        </section>

        {/* FOOTER ACTION */}
        <div className="pt-10 flex flex-col items-center gap-4">
          <button className="bg-slate-900 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-primary transition-all active:scale-95 shadow-xl">
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Audit ID: {slug}
          </p>
        </div>
      </main>
    </div>
  );
};

export default AuditSummary;
