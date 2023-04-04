const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        // "./app/**/*.{js,ts,jsx,tsx}",
        // "./pages/**/*.{js,ts,jsx,tsx}",
        // "./components/**/*.{js,ts,jsx,tsx}",

        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
