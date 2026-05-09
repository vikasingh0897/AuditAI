import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

// Interface for tool info -->
export interface IToolInput {
  toolName: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

// Interface for Recommendation -->
export interface IRecommendation {
  toolName: string;
  currentSpend: number;
  suggestedAction: string;
  potentialSavings: number;
  reason: string;
}

// Interface for Audit Model Schema -->
export interface IAudit extends mongoose.Document {
  slug: string;
  isLeadCaptured: boolean;
  teamSize: number;
  email?: string;
  companyName?: string;
  role?: string;
  isHighSavingsCase: boolean; // Required for Credex prominent surfacing
  tools: IToolInput[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: IRecommendation[];
  aiSummary: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema Definition -->
const auditSchema = new mongoose.Schema<IAudit>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10), // Unique URL for sharing
    },
    email: { type: String, trim: true, lowercase: true }, // Lead capture after value shown [cite: 41, 83]
    companyName: { type: String },
    role: { type: String },
    isLeadCaptured: {
      type: Boolean,
      default: false,
    },
    isHighSavingsCase: {
      type: Boolean,
      default: false, // Calculated: true if savings > $500/mo
    },
    teamSize: {
      type: Number,
      required: true,
      min: 1,
    },
    tools: [
      {
        toolName: { type: String, required: true },
        plan: { type: String, required: true },
        monthlySpend: { type: Number, required: true, min: 0 },
        seats: { type: Number, required: true, min: 1 },
      },
    ],
    totalMonthlySavings: { type: Number, default: 0 },
    totalAnnualSavings: { type: Number, default: 0 },
    recommendations: [
      {
        toolName: String,
        currentSpend: Number,
        suggestedAction: String,
        potentialSavings: Number,
        reason: String, // 1-sentence reasoning required [cite: 68]
      },
    ],
    aiSummary: {
      type: String,
      default: 'Summary pending...', // Personalized summary placeholder
    },
  },
  {
    timestamps: true, // Used to measure "Consistency" via dev progress [cite: 22]
  }
);

// Pre hook to automatically set AnnualSavings and isHighSavingsCase
auditSchema.pre<IAudit>('save', async function (this: IAudit) {
  this.totalAnnualSavings = (this.totalMonthlySavings || 0) * 12;
  this.isHighSavingsCase = (this.totalMonthlySavings || 0) > 500;
});

// Model export -->
const Audit = mongoose.model<IAudit>('Audit', auditSchema);
export default Audit;
