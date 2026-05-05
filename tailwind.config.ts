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
        cream: "#F5E6D3",
        "cream-dark": "#E8D5BC",
        paper: "#FAF1E0",
        navy: "#1B3A5C",
        "navy-dark": "#0F2540",
        red: "#C8443D",
        "red-dark": "#A33530",
        brown: "#6B4E32",
        mustard: "#D4A93C",
        beige: "#C9B596",
        olive: "#7A8450",
      },
      fontFamily: {
        pixel: ["var(--font-press-start)", "monospace"],
        mono: ["var(--font-vt323)", "monospace"],
        typewriter: ["var(--font-special-elite)", "monospace"],
      },
      keyframes: {
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "bob-centered": {
          "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
          "50%": { transform: "translateX(-50%) translateY(-3px)" },
        },
        blink: {
          "0%, 95%, 100%": { opacity: "1" },
          "97%": { opacity: "0" },
        },
        wobble: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        "float-up": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-30px)" },
        },
        "scale-bump": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { transform: "translateY(0)", opacity: "1" },
          "90%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.25" },
        },
      },
      animation: {
        bob: "bob 2s steps(2) infinite",
        "bob-centered": "bob-centered 2s steps(2) infinite",
        blink: "blink 4s infinite",
        wobble: "wobble 1s ease-in-out infinite",
        "float-up": "float-up 1s ease-out forwards",
        "scale-bump": "scale-bump 0.3s ease-out",
        "slide-down": "slide-down 3s ease-in-out forwards",
        flicker: "flicker 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
