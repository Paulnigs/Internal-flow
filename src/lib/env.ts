/** Public app URL — uses NEXTAUTH_URL, or https://VERCEL_URL on Vercel. */
export function resolveNextAuthUrl(): string {
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/** Auth secret — defaults on Vercel preview so no env is required for UI demo. */
export function getAuthSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret && secret.length >= 16) return secret;
  if (process.env.VERCEL) {
    return "studio-pro-vercel-preview-secret-key";
  }
  return "studio-pro-dev-secret-not-for-production";
}
