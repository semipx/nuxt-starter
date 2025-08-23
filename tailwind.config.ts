import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import { addDynamicIconSelectors } from '@iconify/tailwind'

export default {
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter var', 'Inter', 'ui-sans-serif', 'sans-serif', 'system-ui', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
    },
    extend: {
      colors: {
        primary: colors.sky,
        gray: colors.zinc
      }
    }
  },
  plugins: [addDynamicIconSelectors()]
}
