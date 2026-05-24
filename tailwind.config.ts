import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        card: "#0c0c0c",
        border: "#161616",
        border2: "#1e1e1e",
        t1: "#f0f0f0",
        t2: "#999999",
        t3: "#555555",
        t4: "#333333",
        acc: "#00d4aa",
        acc2: "#00b894",
      },
      fontFamily: {
        display: ["var(--font-display)", "Bebas Neue", "sans-serif"],
        sans: ["var(--font-sans)", "Space Grotesk", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "14px",
        xl2: "20px",
      },
      animation: {
        "fade-up": "fadeUp .6s ease both",
        "fade-in": "fadeIn .5s ease both",
        spin: "spin .8s linear infinite",
        "gradient-x": "gradientX 6s ease infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
