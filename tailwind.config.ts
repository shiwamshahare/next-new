import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'on-primary': '#FFFFFF',
        secondary: '#3B82F6',
        accent: '#059669',
        background: '#F8FAFC',
        foreground: '#0F172A',
        muted: '#F1F5FD',
        border: '#E4ECFC',
        destructive: '#DC2626',
        ring: '#2563EB',
        red: '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
      }
    },
  },
  plugins: [],
} satisfies Config;