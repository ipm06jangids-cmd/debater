import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#050505",
          900: "#0A0A0A",
          800: "#101010",
          700: "#141414",
          600: "#1A1A1A",
          500: "#222222",
        },
        neon: {
          cyan: "#7DF9FF",
          gold: "#D4AF37",
          violet: "#8B6BFF",
        },
        silver: {
          DEFAULT: "#E8E8E8",
          muted: "#A3A3A3",
          dim: "#6B6B6B",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-geist)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backdropBlur: {
        "4xl": "72px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 3s ease-in-out infinite",
        "float": "float 8s ease-in-out infinite",
        "shimmer": "shimmer 6s linear infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(125, 249, 255, 0.3), 0 0 40px rgba(125, 249, 255, 0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(125, 249, 255, 0.6), 0 0 80px rgba(125, 249, 255, 0.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
