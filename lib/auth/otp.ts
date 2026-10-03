import { createHash, randomInt } from "crypto";

export function generateOtp(): string {
  return randomInt(100000, 1000000).toString();
}

export function hashOtp(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

export function verifyOtp(code: string, codeHash: string): boolean {
  return hashOtp(code) === codeHash;
}