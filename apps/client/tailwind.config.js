const { join } = require('path');

const {
  createGlobPatternsForDependencies,
} = require('@nx/react/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        badoit: '#2f4f4f',
        'badoit-hover': '#2a4747',
      }
    },
  },
  plugins: [],
};
