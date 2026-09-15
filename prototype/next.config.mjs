const nextConfig = {
  devIndicators: false,
  // Allow independent local previews to avoid replacing one another's assets.
  distDir: process.env.YSCC_BUILD_DIR || ".next",
};
export default nextConfig;
