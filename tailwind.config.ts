import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: "#0d1821",
        primary: "#052035",
        "text-primary": "#ffffff",
        accent: "#28AFB0",
      },
    },
  },
  plugins: [],
};
export default config;
