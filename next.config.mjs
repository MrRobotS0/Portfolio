import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // O pacote @splinetool/react-spline v4 tem um campo "exports" só com a
  // condição "import" (sem "default"/"require"), o que faz o webpack do Next
  // falhar com "Package path . is not exported". Apontamos direto pro arquivo
  // do dist, ignorando a resolução via exports.
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@splinetool/react-spline$": path.resolve(
        __dirname,
        "node_modules/@splinetool/react-spline/dist/react-spline.js"
      ),
    };
    return config;
  },
};

export default nextConfig;
