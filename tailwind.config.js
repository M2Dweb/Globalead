/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // NOTA: o `sans` fica com o default do Tailwind (fonte antiga do site).
        // A serif nova é usada APENAS nos cabeçalhos das secções novas da homepage
        // (classe .section-heading__title), via `font-serif`.
        serif: ['"Cormorant Garamond"', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};
