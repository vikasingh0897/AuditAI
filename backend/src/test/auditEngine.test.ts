import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import Pricing from '../models/pricing.model.js';
import { calculateSavings } from '../controllers/audit.controller.js';

// Helper to mock Mongoose Queries which can be awaited directly OR have .sort() chained
const mockMongooseQuery = (data: any) => {
  const query = Promise.resolve(data);
  (query as any).sort = () => Promise.resolve(data);
  return query;
};

describe('Audit Engine - Mandatory Logic Tests', () => {
  let findOneSpy: any;

  beforeEach(() => {
    findOneSpy = jest.spyOn(Pricing, 'findOne');
  });

  afterEach(() => {
    findOneSpy.mockRestore();
  });

  // TEST 1: PLAN OPTIMIZATION (Right-Sizing)
  it('should recommend a downgrade if a small team is on an overkill plan', async () => {
    const mockPricing = {
      toolName: 'Cursor',
      category: 'AI Code Assistant',
      credexAvailable: false,
      tiers: [
        { planName: 'Pro', pricePerSeat: 20, isFlatFee: false, maxSeats: 50 },
        { planName: 'Business', pricePerSeat: 40, isFlatFee: false, maxSeats: 100 },
      ],
    };

    // Use mockReturnValue with our helper instead of mockResolvedValue
    findOneSpy.mockReturnValue(mockMongooseQuery(mockPricing));

    const toolsInput = [{ toolName: 'Cursor', plan: 'Business', seats: 2, monthlySpend: 80 }];
    const result = await calculateSavings(toolsInput, 2);

    expect(result.totalMonthlySavings).toBe(40);
    expect(result.recommendations[0]?.suggestedAction).toBe('Downgrade to Pro');
  });

  // TEST 2: FLAT FEE VS PER-SEAT ACCURACY
  it('should correctly calculate savings when comparing flat fees to per-seat costs', async () => {
    const mockPricing = {
      toolName: 'Claude',
      category: 'AI Chat & LLM',
      credexAvailable: false,
      tiers: [
        { planName: 'Team', pricePerSeat: 30, isFlatFee: false },
        { planName: 'Enterprise', pricePerSeat: 500, isFlatFee: true },
      ],
    };

    findOneSpy.mockReturnValue(mockMongooseQuery(mockPricing));

    const toolsInput = [{ toolName: 'Claude', plan: 'Team', seats: 20, monthlySpend: 600 }];
    const result = await calculateSavings(toolsInput, 20);

    expect(result.totalMonthlySavings).toBe(100);
    expect(result.recommendations[0]?.suggestedAction).toContain('Enterprise');
  });

  // TEST 3: TEAM SIZE LIMITS (Defensible Reasoning)
  it('should ignore tiers that cannot support the current team size', async () => {
    const mockPricing = {
      toolName: 'GitHub Copilot',
      category: 'AI Code Assistant',
      credexAvailable: true,
      tiers: [
        { planName: 'Individual', pricePerSeat: 10, isFlatFee: false, maxSeats: 1 },
        { planName: 'Business', pricePerSeat: 19, isFlatFee: false, maxSeats: 100 },
      ],
    };

    findOneSpy.mockReturnValue(mockMongooseQuery(mockPricing));

    const toolsInput = [
      { toolName: 'GitHub Copilot', plan: 'Individual', seats: 5, monthlySpend: 150 },
    ];
    const result = await calculateSavings(toolsInput, 5);

    expect(result.totalMonthlySavings).toBe(55);
    expect(result.recommendations[0]?.suggestedAction).toBe('Downgrade to Business');
  });

  // TEST 4: HONESTY (Zero Savings Case)
  it('should return zero savings if the user is already on the most optimal plan', async () => {
    const mockPricing = {
      toolName: 'OpenAI API',
      category: 'Infrastructure & API',
      credexAvailable: false,
      tiers: [{ planName: 'Direct', pricePerSeat: 50, isFlatFee: false }],
    };

    findOneSpy.mockReturnValue(mockMongooseQuery(mockPricing));

    const toolsInput = [{ toolName: 'OpenAI API', plan: 'Direct', seats: 1, monthlySpend: 50 }];
    const result = await calculateSavings(toolsInput, 1);

    expect(result.totalMonthlySavings).toBe(0);
  });

  // TEST 5: CROSS-TOOL RECOMMENDATION (Credex Upsell)
  it('should suggest a competitor if they offer Credex credits, even if current pricing is optimal', async () => {
    findOneSpy.mockImplementation((query: any) => {
      if (query.toolName?.['$regex']) {
        return mockMongooseQuery({
          toolName: 'ToolA',
          category: 'LLM',
          tiers: [{ planName: 'Premium', pricePerSeat: 10, isFlatFee: false }],
        });
      }
      if (query.credexAvailable) {
        return mockMongooseQuery({
          toolName: 'ToolB',
          category: 'LLM',
          credexAvailable: true,
        });
      }
      return mockMongooseQuery(null);
    });

    const toolsInput = [{ toolName: 'ToolA', plan: 'Premium', seats: 10, monthlySpend: 100 }];
    const result = await calculateSavings(toolsInput, 10);

    expect(result.recommendations[0]?.suggestedAction).toBe('Switch to ToolB');
    expect(result.recommendations[0]?.reason).toContain('Credex');
  });
});
