/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Design System Palette
        "ds-white": "#FFFFFF",
        "ds-light-gray": "#FDFDFD",
        "ds-gray": "#E0E0E0",
        "ds-medium-gray": "#C4C4C4",
        "ds-dark-gray": "#1E1E1E",
        "ds-primary-blue": "#5B73FF",
        "ds-blue-hover": "#445CE0",
        "ds-blue-pressed": "#3346B3",
        "ds-success-green": "#00B074",
        "ds-warning-orange": "#FF9F43",
        "ds-danger-red": "#FF4D4F",
        "ds-badge-pink": "#FDEBEE",
        "ds-text-body": "#707070",
        "ds-text-label": "#8A8A8A",
        "ds-text-timestamp": "#B0B0B0",
        "ds-text-placeholder": "#B0B0B0",
        "ds-bg-highlight": "#EEF0FF",
        "ds-bg-badge-approved": "#E6FFF3",
        "ds-bg-badge-pending": "#FFF5E6",
      },
      borderRadius: {
        "ds-card": "16px",
        "ds-button": "12px",
        "ds-input": "12px",
        xl: "20px",
        "2xl": "24px",
      },
      boxShadow: {
        "ds-card": "0 4px 12px rgba(0, 0, 0, 0.08)",
        "ds-card-hover": "0 6px 16px rgba(0, 0, 0, 0.1)",
        "ds-button": "0 2px 4px rgba(0, 0, 0, 0.1)",
        "ds-input-focus": "0 0 0 2px rgba(91, 115, 255, 0.2)",
        modern:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "modern-hover":
          "0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 8px 10px -4px rgba(0, 0, 0, 0.1)",
        "inner-glow": "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
      },
      backgroundImage: {
        "ds-hero": "linear-gradient(180deg, #F7F9FF 0%, #FFFFFF 100%)",
        "ds-button-hover": "linear-gradient(90deg, #5B73FF 0%, #3346B3 100%)",
        "card-gradient": "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
        "feature-gradient": "linear-gradient(135deg, #EEF0FF 0%, #F7F9FF 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
