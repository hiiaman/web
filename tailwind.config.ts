import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fdf2f8",
          100: "#fce7f3",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
        },
        flame: {
          50:  "#fff1f2",
          100: "#ffe4e6",
          400: "#fe7c92",
          500: "#fe3c72",
          600: "#d42f5c",
          orange: "#ff6036",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
