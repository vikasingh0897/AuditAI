// hCaptcha Response Interface -->
interface HCaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

// VerifyHCaptcha Utility -->
export const verifyHCaptcha = async (token: string): Promise<boolean> => {
  const secret = process.env.HCAPTCHA_SECRET_KEY;
  if (!secret) throw new Error('Missing HCAPTCHA_SECRET_KEY');

  const response = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });

  const data = (await response.json()) as HCaptchaResponse;
  return data.success;
};
