// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }; 

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode based on a class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust the paths as necessary for your project structure
  ],
  theme: {
    extend: {
      // You can extend the default theme here if needed
      colors: {
        // Example of adding custom colors
        primary: {
          light: '#3B82F6', // Light blue
          DEFAULT: '#2563EB', // Default blue
          dark: '#1E40AF', // Dark blue
        },
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
