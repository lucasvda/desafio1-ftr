export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',       // Roxo principal
        primaryDark: '#4F46E5',   // Hover do botão
        secondary: '#F9FAFB',     // Fundo da página
        accent: '#4F46E5',
        danger: '#DC2626',        // Botão deletar
        text: '#111827',          // Títulos
        muted: '#6B7280',         // Textos secundários
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
};
