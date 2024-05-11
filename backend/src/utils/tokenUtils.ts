import { randomBytes } from 'crypto';

// Helper function to generate a verification token using crypto
export function generateVerificationToken(): string {
  // Generate a 32-character hexadecimal token
  const verificationToken = randomBytes(16).toString('hex');
  return verificationToken;
}

export function generateResetPasswordToken(): string {
    return randomBytes(32).toString('hex');
  }
