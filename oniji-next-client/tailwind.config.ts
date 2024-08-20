import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // background: Used for the main background of the application or sections.
        background: "hsl(var(--background))",
        // foreground: Used for primary text or elements.
        foreground: "hsl(var(--foreground))",
        // card: Applied to cards or panels for grouped content.
        card: "hsl(var(--card))",
        // cardForeground: Used for text or icons within cards.
        cardForeground: "hsl(var(--card-foreground))",
        // popover: Used for popovers, dropdowns, tooltips, or modals.
        popover: "hsl(var(--popover))",
        // popoverForeground: Applied to text or elements within popovers.
        popoverForeground: "hsl(var(--popover-foreground))",
        // primary: Used for elements that require attention, such as buttons or links.
        primary: "hsl(var(--primary))",
        // primaryForeground: Applied to text or icons on primary-colored elements.
        primaryForeground: "hsl(var(--primary-foreground))",
        // secondary: Used for less prominent buttons, links, or background elements.
        secondary: "hsl(var(--secondary))",
        // secondaryForeground: Applied to text or icons on secondary-colored elements.
        secondaryForeground: "hsl(var(--secondary-foreground))",
        // muted: Used for subdued or less prominent elements.
        muted: "hsl(var(--muted))",
        // mutedForeground: Applied to text or icons on muted-colored elements.
        mutedForeground: "hsl(var(--muted-foreground))",
        // accent: Used for elements that require a subtle emphasis.
        accent: "hsl(var(--accent))",
        // accentForeground: Applied to text or icons on accent-colored elements.
        accentForeground: "hsl(var(--accent-foreground))",
        // destructive: Used for elements that signify danger or important actions.
        destructive: "hsl(var(--destructive))",
        // destructiveForeground: Applied to text or icons on destructive-colored elements.
        destructiveForeground: "hsl(var(--destructive-foreground))",
        // border: Used for borders around elements.
        border: "hsl(var(--border))",
        // input: Used for input fields and related elements.
        input: "hsl(var(--input))",
        // ring: Used for focus rings or outlines around elements.
        ring: "hsl(var(--ring))",
        // radius: Used for border-radius values.
        radius: "var(--radius)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
