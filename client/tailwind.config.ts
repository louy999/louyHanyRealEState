import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary100: "#019b98",
        primary200: "#55ccc9",
        primary300: "#c1ffff",
        accent100: "#dd0025",
        accent200: "#ffbfab",
        text100: "#014e60",
        text200: "#3f7a8d",
        bg100: "#fbfbfb",
        bg200: "#f1f1f1",
        bg300: "#c8c8c8",
      },
      fontFamily: {
        montecarlo: ["MonteCarlo", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
