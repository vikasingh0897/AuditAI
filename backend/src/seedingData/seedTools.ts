import 'dotenv/config';
import mongoose from 'mongoose';
import Pricing from '../models/pricing.model.js';

export const pricingData = [
  // --- AI CODE ASSISTANTS ---
  {
    toolName: 'Cursor',
    category: 'AI Code Assistant',
    officialPricingUrl: 'https://www.cursor.com/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Pro',
        pricePerSeat: 20,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Unlimited completions', 'Advanced models'],
      },
      {
        planName: 'Business',
        pricePerSeat: 40,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Admin dashboard', 'Enforced privacy mode'],
      },
    ],
    alternatives: ['GitHub Copilot', 'Windsurf', 'PearAI'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'GitHub Copilot',
    category: 'AI Code Assistant',
    officialPricingUrl: 'https://github.com/features/copilot/plans',
    credexAvailable: true,
    tiers: [
      {
        planName: 'Individual',
        pricePerSeat: 10,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Standard completions'],
      },
      {
        planName: 'Business',
        pricePerSeat: 19,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['License management'],
      },
    ],
    alternatives: ['Cursor', 'Windsurf'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Windsurf',
    category: 'AI Code Assistant',
    officialPricingUrl: 'https://codeium.com/windsurf/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Pro',
        pricePerSeat: 15,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['High-speed context', 'Advanced reasoning'],
      },
      {
        planName: 'Teams',
        pricePerSeat: 30,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Team management', 'Centralized billing'],
      },
    ],
    alternatives: ['Cursor', 'GitHub Copilot'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'PearAI',
    category: 'AI Code Assistant',
    officialPricingUrl: 'https://trypear.ai/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Pro',
        pricePerSeat: 20,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Open source focused', 'Direct AI chat'],
      },
    ],
    alternatives: ['Cursor', 'Windsurf'],
    lastVerified: new Date('2026-05-01'),
  },
  // --- AI CHAT & LLM ---
  {
    toolName: 'OpenAI ChatGPT',
    category: 'AI Chat & LLM',
    officialPricingUrl: 'https://openai.com/chatgpt/pricing/',
    credexAvailable: true,
    tiers: [
      {
        planName: 'Plus',
        pricePerSeat: 20,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['GPT-4 Access'],
      },
      {
        planName: 'Team',
        pricePerSeat: 25,
        isFlatFee: false,
        minSeats: 2,
        billing: 'monthly',
        features: ['Workspace data excluded from training'],
      },
    ],
    alternatives: ['Anthropic Claude', 'Google Gemini'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Anthropic Claude',
    category: 'AI Chat & LLM',
    officialPricingUrl: 'https://www.anthropic.com/claude/team',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Pro',
        pricePerSeat: 20,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Claude 3.5 Sonnet', 'Higher usage limits'],
      },
      {
        planName: 'Team',
        pricePerSeat: 30,
        isFlatFee: false,
        minSeats: 5,
        billing: 'monthly',
        features: ['Admin tools', 'Shared projects'],
      },
    ],
    alternatives: ['OpenAI ChatGPT', 'Google Gemini'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Google Gemini',
    category: 'AI Chat & LLM',
    officialPricingUrl: 'https://gemini.google.com/advanced',
    credexAvailable: true,
    tiers: [
      {
        planName: 'Advanced',
        pricePerSeat: 20,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['1.5 Pro model', '2TB Storage'],
      },
      {
        planName: 'Business',
        pricePerSeat: 30,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Enterprise-grade security'],
      },
    ],
    alternatives: ['OpenAI ChatGPT', 'Anthropic Claude'],
    lastVerified: new Date('2026-05-01'),
  },
  // --- ENGINEERING & DEVTOOLS ---
  {
    toolName: 'Vercel',
    category: 'Engineering & DevTools',
    officialPricingUrl: 'https://vercel.com/pricing',
    credexAvailable: true,
    tiers: [
      {
        planName: 'Pro',
        pricePerSeat: 20,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Preview deployments', 'Advanced Analytics'],
      },
      {
        planName: 'Enterprise',
        pricePerSeat: 3000,
        isFlatFee: true,
        minSeats: 1,
        billing: 'monthly',
        features: ['SSO', 'SLA'],
      },
    ],
    alternatives: ['Netlify', 'Railway'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Netlify',
    category: 'Engineering & DevTools',
    officialPricingUrl: 'https://www.netlify.com/pricing/',
    credexAvailable: true,
    tiers: [
      {
        planName: 'Pro',
        pricePerSeat: 19,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Advanced builds', 'Password protection'],
      },
    ],
    alternatives: ['Vercel', 'Railway'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Railway',
    category: 'Engineering & DevTools',
    officialPricingUrl: 'https://railway.app/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Hobby',
        pricePerSeat: 5,
        isFlatFee: true,
        minSeats: 1,
        billing: 'monthly',
        features: ['Basic hosting'],
      },
      {
        planName: 'Pro',
        pricePerSeat: 20,
        isFlatFee: true,
        minSeats: 1,
        billing: 'monthly',
        features: ['Priority support'],
      },
    ],
    alternatives: ['Vercel', 'Render'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Render',
    category: 'Engineering & DevTools',
    officialPricingUrl: 'https://render.com/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Starter',
        pricePerSeat: 7,
        isFlatFee: true,
        minSeats: 1,
        billing: 'monthly',
        features: ['DDoS protection', 'Auto-deploy'],
      },
      {
        planName: 'Team',
        pricePerSeat: 19,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Centralized logging'],
      },
    ],
    alternatives: ['Railway', 'Vercel'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'v0.dev',
    category: 'Engineering & DevTools',
    officialPricingUrl: 'https://v0.dev/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Premium',
        pricePerSeat: 20,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['2000 credits/mo', 'Private generations'],
      },
    ],
    alternatives: ['Bolt.new', 'Lovable.dev'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Bolt.new',
    category: 'Engineering & DevTools',
    officialPricingUrl: 'https://bolt.new/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Pro',
        pricePerSeat: 25,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Full-stack editing', 'Instant deployment'],
      },
    ],
    alternatives: ['v0.dev', 'Lovable.dev'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Lovable.dev',
    category: 'Engineering & DevTools',
    officialPricingUrl: 'https://lovable.dev/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Pro',
        pricePerSeat: 25,
        isFlatFee: true,
        minSeats: 1,
        billing: 'monthly',
        features: ['Full-stack apps', 'Custom domains'],
      },
    ],
    alternatives: ['v0.dev', 'Bolt.new'],
    lastVerified: new Date('2026-05-01'),
  },
  // --- PRODUCTIVITY & SAAS ---
  {
    toolName: 'Linear',
    category: 'Productivity & SaaS',
    officialPricingUrl: 'https://linear.app/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Basic',
        pricePerSeat: 10,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Unlimited issues'],
      },
      {
        planName: 'Business',
        pricePerSeat: 16,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['SAML SSO'],
      },
    ],
    alternatives: ['Jira', 'Asana'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Jira',
    category: 'Productivity & SaaS',
    officialPricingUrl: 'https://www.atlassian.com/software/jira/pricing',
    credexAvailable: true,
    tiers: [
      {
        planName: 'Standard',
        pricePerSeat: 8.6,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Project roles', 'Audit logs'],
      },
      {
        planName: 'Premium',
        pricePerSeat: 17.0,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Advanced roadmaps'],
      },
    ],
    alternatives: ['Linear', 'Monday.com'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Asana',
    category: 'Productivity & SaaS',
    officialPricingUrl: 'https://asana.com/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Starter',
        pricePerSeat: 13.49,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Workflow builder', 'Project dashboards'],
      },
    ],
    alternatives: ['Linear', 'Jira'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Monday.com',
    category: 'Productivity & SaaS',
    officialPricingUrl: 'https://monday.com/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Basic',
        pricePerSeat: 12,
        isFlatFee: false,
        minSeats: 3,
        billing: 'monthly',
        features: ['Unlimited boards', '200+ templates'],
      },
      {
        planName: 'Standard',
        pricePerSeat: 14,
        isFlatFee: false,
        minSeats: 3,
        billing: 'monthly',
        features: ['Timeline & Gantt views', 'Automations'],
      },
    ],
    alternatives: ['Jira', 'Asana', 'Linear'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Figma',
    category: 'Productivity & SaaS',
    officialPricingUrl: 'https://www.figma.com/pricing/',
    credexAvailable: true,
    tiers: [
      {
        planName: 'Professional',
        pricePerSeat: 15,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Unlimited files', 'Dev Mode'],
      },
      {
        planName: 'Organization',
        pricePerSeat: 45,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Design systems', 'Centralized admin'],
      },
    ],
    alternatives: ['Penpot', 'Canva'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Penpot',
    category: 'Productivity & SaaS',
    officialPricingUrl: 'https://penpot.app/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Pro',
        pricePerSeat: 0,
        isFlatFee: true,
        minSeats: 1,
        billing: 'monthly',
        features: ['Open Source', 'Unlimited files'],
      },
    ],
    alternatives: ['Figma'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Canva',
    category: 'Productivity & SaaS',
    officialPricingUrl: 'https://www.canva.com/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Pro',
        pricePerSeat: 15,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Brand kits', 'Premium templates'],
      },
    ],
    alternatives: ['Figma', 'Adobe Express'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Adobe Express',
    category: 'Productivity & SaaS',
    officialPricingUrl: 'https://www.adobe.com/express/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Premium',
        pricePerSeat: 9.99,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Stock photos', 'AI effects'],
      },
    ],
    alternatives: ['Canva', 'Figma'],
    lastVerified: new Date('2026-05-01'),
  },
  // --- DATA & ANALYTICS ---
  {
    toolName: 'Supabase',
    category: 'Data & Analytics',
    officialPricingUrl: 'https://supabase.com/pricing',
    credexAvailable: true,
    tiers: [
      {
        planName: 'Pro',
        pricePerSeat: 25,
        isFlatFee: true,
        minSeats: 1,
        billing: 'monthly',
        features: ['No pausing', 'Daily backups'],
      },
    ],
    alternatives: ['Firebase', 'Appwrite', 'Neon'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Firebase',
    category: 'Data & Analytics',
    officialPricingUrl: 'https://firebase.google.com/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Blaze',
        pricePerSeat: 0,
        isFlatFee: false,
        minSeats: 1,
        billing: 'usage-based',
        features: ['Pay as you go', 'Full integration'],
      },
    ],
    alternatives: ['Supabase', 'Appwrite'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Neon',
    category: 'Data & Analytics',
    officialPricingUrl: 'https://neon.tech/pricing',
    credexAvailable: true,
    tiers: [
      {
        planName: 'Launch',
        pricePerSeat: 15,
        isFlatFee: true,
        minSeats: 1,
        billing: 'monthly',
        features: ['Autoscaling', 'Point-in-time recovery'],
      },
    ],
    alternatives: ['Supabase', 'PlanetScale'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'PlanetScale',
    category: 'Data & Analytics',
    officialPricingUrl: 'https://planetscale.com/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Scaler',
        pricePerSeat: 39,
        isFlatFee: true,
        minSeats: 1,
        billing: 'monthly',
        features: ['Automatic backups', 'Data branching'],
      },
    ],
    alternatives: ['Neon', 'Supabase'],
    lastVerified: new Date('2026-05-01'),
  },
  {
    toolName: 'Appwrite',
    category: 'Data & Analytics',
    officialPricingUrl: 'https://appwrite.io/pricing',
    credexAvailable: false,
    tiers: [
      {
        planName: 'Pro',
        pricePerSeat: 25,
        isFlatFee: false,
        minSeats: 1,
        billing: 'monthly',
        features: ['Unlimited teams', 'Custom domains'],
      },
    ],
    alternatives: ['Supabase', 'Firebase'],
    lastVerified: new Date('2026-05-01'),
  },
];

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is missing in .env');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🚀 Connected to MongoDB...');

    await Pricing.deleteMany({});
    const seeded = await Pricing.insertMany(pricingData);
    console.log(`✅ Seeded ${seeded.length} tools into the updated schema.`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
