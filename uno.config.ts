import { defineConfig, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  theme: {
    breakpoints: {
      zero: '0px',
      xs: '576px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
    },
    colors: {
      brianBlue: '#79c2d0',
      brianBlueDark: '#0495b1',
      brianBlueLight: '#d4f3f9',
      grayLight: '#282c34',
      black: '#202020',
    },
  },
  presets: [presetIcons({ prefix: 'i-' }), presetUno()],
});
