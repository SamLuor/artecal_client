/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "section-page-r-desk": "11px",
        "section-page-r-mobi": "16px",
        "title-page-r-desk": "13px",
        "title-page-r-mobile": "18px",
        xxs: "10px",
        xxxs: "6px",
      },
      borderWidth: {
        1: "1px",
      },
      width: {
        "90%": "90%",
      },
    },
  },
  plugins: [],
};
