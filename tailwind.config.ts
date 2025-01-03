import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // custom colors palette
        custom: {
          black: {
            100: "#d2cdd6",
            200: "#a69bad",
            300: "#796984",
            400: "#4d375b",
            500: "#200532",
            600: "#1a0428",
            700: "#13031e",
            800: "#0d0214",
            900: "#06010a",
          },
          tomato: {
            100: "#f5d1d6",
            200: "#eba3ac",
            300: "#e17683",
            400: "#d74859",
            500: "#cd1a30",
            600: "#a41526",
            700: "#7b101d",
            800: "#520a13",
            900: "#29050a",
          },
          orange: {
            100: "#ffe7d6",
            200: "#ffd0ad",
            300: "#ffb884",
            400: "#ffa15b",
            500: "#ff8932",
            600: "#cc6e28",
            700: "#99521e",
            800: "#663714",
            900: "#331b0a",
          },
          white: {
            100: "#fffaf0",
            200: "#fff5e1",
            300: "#fef1d3",
            400: "#feecc4",
            500: "#fee7b5",
            600: "#cbb991",
            700: "#988b6d",
            800: "#665c48",
            900: "#332e24",
          },
          purple: {
            100: "#dbcdd6",
            200: "#b79cac",
            300: "#926a83",
            400: "#6e3959",
            500: "#4a0730",
            600: "#3b0626",
            700: "#2c041d",
            800: "#1e0313",
            900: "#0f010a",
          },
          maroon: {
            100: "#e4ced6",
            200: "#ca9ead",
            300: "#af6d83",
            400: "#953d5a",
            500: "#7a0c31",
            600: "#620a27",
            700: "#49071d",
            800: "#310514",
            900: "#18020a",
          },
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      textShadow: {
        "glow-sm":
          "0 0 5px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1)",

        "glow-md":
          "0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3), 0 0 45px rgba(255, 255, 255, 0.1), 0 0 60px rgba(255, 255, 255, 0.05)",

        glow: "0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)",

        "glow-lg":
          "0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.45), 0 0 90px rgba(255, 255, 255, 0.3), 0 0 120px rgba(255, 255, 255, 0.15)",

        "glow-xl":
          "0 0 40px rgba(255, 255, 255, 0.7), 0 0 80px rgba(255, 255, 255, 0.5), 0 0 120px rgba(255, 255, 255, 0.3), 0 0 160px rgba(255, 255, 255, 0.2), 0 0 200px rgba(255, 255, 255, 0.1)",

        "glow-2xl":
          "0 0 50px rgba(255, 255, 255, 0.8), 0 0 100px rgba(255, 255, 255, 0.6), 0 0 150px rgba(255, 255, 255, 0.4), 0 0 200px rgba(255, 255, 255, 0.2), 0 0 250px rgba(255, 255, 255, 0.1)",
      },
      transitionTimingFunction: {
        "custom-ease": "cubic-bezier(0, 0.48, 0, 0.99)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate"), require("tailwindcss-textshadow")],
} satisfies Config;
