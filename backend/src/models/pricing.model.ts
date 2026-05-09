import mongoose from 'mongoose';

// Plan-specific details for the Audit Engine
export interface IPricingTier {
  planName: string;
  pricePerSeat: number;
  isFlatFee: boolean; // true for "bundle" pricing, false for "per-user"
  billing: 'monthly' | 'annual' | 'usage-based' | 'custom';
  minSeats: number;
  maxSeats?: number; // Helps identify if a user is "over-plan"
  includedCredits?: number; // API tokens or credits
  features: string[]; // To show what they get/lose if they switch
}

// Main Tool Schema for Comparison Logic
export interface IPricing extends mongoose.Document {
  toolName: string;
  category:
    | 'AI Code Assistant' // Cursor, GitHub Copilot, Windsurf
    | 'AI Chat & LLM' // ChatGPT, Claude, Gemini, Perplexity
    | 'Infrastructure & API' // OpenAI API, Anthropic API, AWS, Google Cloud
    | 'Engineering & DevTools' // GitHub (Team/Ent), Jira, Sentry, Vercel
    | 'Productivity & SaaS' // Notion, Slack, Monday.com, CRM tools
    | 'Data & Analytics'; // Mixpanel, Datadog, Snowflake

  officialPricingUrl: string;
  credexAvailable: boolean;
  credexDiscountedPrice?: number; // credex discounts
  tiers: IPricingTier[];
  alternatives: string[]; // For "switch to" recommendations
  lastVerified: Date;
}

const pricingSchema = new mongoose.Schema<IPricing>(
  {
    toolName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
      enum: [
        'AI Code Assistant',
        'AI Chat & LLM',
        'Infrastructure & API',
        'Engineering & DevTools',
        'Productivity & SaaS',
        'Data & Analytics',
      ],
    },
    officialPricingUrl: {
      type: String,
      required: true,
    },
    credexAvailable: {
      type: Boolean,
      default: false,
    },
    credexDiscountedPrice: {
      type: Number,
    },
    tiers: [
      {
        planName: {
          type: String,
          required: true,
        },
        pricePerSeat: {
          type: Number,
          min: 0,
          required: true,
        },
        isFlatFee: {
          type: Boolean,
          default: false,
        },
        billing: {
          type: String,
          enum: ['monthly', 'annual', 'usage-based', 'custom'],
          required: true,
        },
        includedCredits: {
          type: Number,
        },
        minSeats: {
          type: Number,
          default: 1,
          min: 0,
        },
        maxSeats: {
          type: Number,
        },
        features: [String],
      },
    ],

    alternatives: [
      {
        type: String,
      },
    ],
    lastVerified: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pricing = mongoose.model<IPricing>('Pricing', pricingSchema);
export default Pricing;
