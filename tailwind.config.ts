import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "slide-right": "slide-right 0.3s ease-in-out",
      },
    },
  },

  daisyui: {
    themes: ["light", "dark"],
  },

  plugins: [require("daisyui")],
} satisfies Config;
