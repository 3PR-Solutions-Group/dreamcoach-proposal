import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0C10",
        card: "#141820",
        card2: "#1A2030",
        border: "#2A2F3D",
        emerald: "#34D98A",
        teal: "#4ECDC4",
        text: "#F0F2F8",
        muted: "#8B90A0",
        gold: "#C9A84C",
        amber: "#F5A623",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
