const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.js'],
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                
            },
            colors: {   
                'primary': '#FF0000',
                'secondary': '#FCFCFD',
                'background': '#F7F7F7',
                'input': '#F2F2F2',
                'pagination' : '#f2f7ff',
            }
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
