import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Trash2, Calculator, ChevronRight } from 'lucide-react';

// Interfaces...
interface Tool {
  _id: string;
  toolName: string;
  tiers: Tier[];
}
interface Tier {
  planName: string;
  pricePerSeat: number;
  isFlatFee: boolean;
}
interface AuditToolEntry {
  toolName: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

// Defining the shape of our main form state
interface FormDataState {
  tools: AuditToolEntry[];
  teamSize: number;
  useCase: string;
}

const AuditForm: React.FC = () => {
  const navigate = useNavigate();
  const captchaRef = useRef<HCaptcha>(null);
  const [availableTools, setAvailableTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'config' | 'stack'>('config');

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataState>(() => {
    const saved = localStorage.getItem('audit_form_data');
    return saved
      ? JSON.parse(saved)
      : {
          tools: [] as AuditToolEntry[],
          teamSize: 1,
          useCase: 'Coding',
        };
  });

  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [addingState, setAddingState] = useState({ monthlySpend: '', seats: formData.teamSize });

  useEffect(() => {
    localStorage.setItem('audit_form_data', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/tools/getAllTools`);
        const result = await response.json();
        if (result.success) setAvailableTools(result.data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  const handleAddTool = () => {
    if (!selectedTool || !selectedTier) return;
    // FIXED: Changed 'any' to 'AuditToolEntry'
    if (formData.tools.some((t: AuditToolEntry) => t.toolName === selectedTool.toolName)) {
      alert('Tool already added');
      return;
    }

    const newToolEntry: AuditToolEntry = {
      toolName: selectedTool.toolName,
      plan: selectedTier.planName,
      monthlySpend: parseFloat(addingState.monthlySpend) || 0,
      seats: addingState.seats,
    };

    // FIXED: Changed 'any' to 'FormDataState'
    setFormData((prev: FormDataState) => ({ ...prev, tools: [newToolEntry, ...prev.tools] }));
    setSelectedTool(null);
    setSelectedTier(null);
    setAddingState({ monthlySpend: '', seats: formData.teamSize });

    if (window.innerWidth < 1024) setActiveTab('stack');
  };

  const handleSubmit = async () => {
    if (!captchaToken) {
      alert('Please complete the captcha verification.');
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${baseUrl}/api/audit/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, hCaptchaToken: captchaToken }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.removeItem('audit_form_data');
        navigate(`/audit/${data.data.slug}`);
      } else {
        alert(data.message || 'Verification failed. Please try again.');
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
      }
    } catch (err) {
      console.error('Submission failed', err);
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background">
        <div className="relative">
          <Calculator className="w-16 h-16 text-primary animate-bounce" />
        </div>
        <h2 className="mt-6 font-black text-sm uppercase tracking-widest text-primary">
          Loading Tools...
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-on-surface font-geist pb-10">
      <div className="lg:hidden flex p-2 bg-white border-b border-outline-variant sticky top-16 z-40">
        <button
          onClick={() => setActiveTab('config')}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'config' ? 'bg-primary text-white shadow-lg' : 'text-outline'}`}
        >
          1. Configure
        </button>
        <button
          onClick={() => setActiveTab('stack')}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'stack' ? 'bg-primary text-white shadow-lg' : 'text-outline'}`}
        >
          2. My Stack ({formData.tools.length})
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 lg:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div
            className={`lg:col-span-5 space-y-6 ${activeTab === 'stack' ? 'hidden lg:block' : 'block'}`}
          >
            <section className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-outline-variant shadow-sm space-y-8">
              <div>
                <h2 className="text-2xl font-black tracking-tight mb-1">Audit Configuration</h2>
                <p className="text-sm text-outline font-medium">
                  Input your current AI infrastructure usage.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">
                    Team Size
                  </label>
                  <input
                    type="number"
                    min={0}
                    className="w-full p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold focus:border-primary focus:bg-white transition-all outline-none"
                    value={formData.teamSize}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teamSize: Math.max(1, parseInt(e.target.value) || 1),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">
                    Core Work
                  </label>
                  <select
                    className="w-full p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold focus:border-primary focus:bg-white transition-all outline-none appearance-none"
                    value={formData.useCase}
                    onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  >
                    <option>Coding</option>
                    <option>Writing</option>
                    <option>Research</option>
                    <option>Mixed</option>
                  </select>
                </div>
              </div>

              <div className="p-5 bg-primary/5 rounded-[2rem] border border-primary/10 space-y-4">
                <select
                  className="w-full p-4 bg-white border border-outline-variant rounded-2xl text-sm font-bold"
                  value={selectedTool?.toolName || ''}
                  onChange={(e) => {
                    setSelectedTool(
                      availableTools.find((t) => t.toolName === e.target.value) || null
                    );
                    setSelectedTier(null);
                  }}
                >
                  <option value="">Select AI Tool...</option>
                  {availableTools.map((t) => (
                    <option key={t._id} value={t.toolName}>
                      {t.toolName}
                    </option>
                  ))}
                </select>

                {selectedTool && (
                  <select
                    className="w-full p-4 bg-white border border-outline-variant rounded-2xl text-sm font-bold"
                    onChange={(e) =>
                      setSelectedTier(
                        selectedTool.tiers.find((t) => t.planName === e.target.value) || null
                      )
                    }
                  >
                    <option value="">Select Tier...</option>
                    {selectedTool.tiers.map((t) => (
                      <option key={t.planName} value={t.planName}>
                        {t.planName}
                      </option>
                    ))}
                  </select>
                )}

                {selectedTier && (
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="Monthly $"
                      type="number"
                      min={0}
                      className="p-4 bg-white border border-outline-variant rounded-2xl text-sm font-bold outline-none"
                      value={addingState.monthlySpend}
                      onChange={(e) =>
                        setAddingState({ ...addingState, monthlySpend: e.target.value })
                      }
                    />
                    <input
                      placeholder="Seats"
                      type="number"
                      min={1}
                      className="p-4 bg-white border border-outline-variant rounded-2xl text-sm font-bold outline-none text-center"
                      value={addingState.seats}
                      onChange={(e) =>
                        setAddingState({ ...addingState, seats: parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>
                )}

                <button
                  onClick={handleAddTool}
                  disabled={!selectedTier}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-30"
                >
                  Add to stack
                </button>
              </div>

              <div className="flex justify-center mt-6">
                <HCaptcha
                  ref={captchaRef}
                  sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY || ''}
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={formData.tools.length === 0 || !captchaToken}
                className="w-full py-6 bg-on-surface text-white rounded-[2rem] font-black text-xl hover:bg-primary transition-all disabled:opacity-30 shadow-xl flex items-center justify-center gap-3 group"
              >
                RUN AUDIT{' '}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </section>
          </div>

          <div
            className={`lg:col-span-7 space-y-6 ${activeTab === 'config' ? 'hidden lg:block' : 'block'}`}
          >
            {formData.tools.length === 0 ? (
              <div className="p-10 text-center text-outline font-bold">No tools added yet.</div>
            ) : (
              // FIXED: Changed 'any' to 'AuditToolEntry'
              formData.tools.map((tool: AuditToolEntry, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-white shadow rounded mb-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">{tool.toolName}</p>
                    <p className="text-xs text-outline">
                      {tool.plan} • ${tool.monthlySpend}/mo
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        // FIXED: Changed 'any' to 'AuditToolEntry'
                        tools: formData.tools.filter((_: AuditToolEntry, i: number) => i !== index),
                      })
                    }
                  >
                    <Trash2
                      size={16}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditForm;
