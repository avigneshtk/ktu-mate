import { createHash, randomBytes } from "crypto";

export function generateVerificationCode(): string {
  return `KTU-MATE-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export function hashVerificationCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}
