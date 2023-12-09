/** @type {import('tailwindcss').Config} */
module.exports = {
   corePlugins: {
      preflight: false,
   },
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         '@layer base': {
            button: [],
         },

         screens: {
            customXs: '350px',
            customSm: '600px',
            customMd: '900px',
            customLg: '1200px',
            customXl: '1400px',
         },

         colors: {
            customPink: '#FFA3A1',
            customPinkLow: '#FFEEED',
            borderColor: '#BDCEDE',
            textColor: '#626E94',
         },

         backgroundImage: {
            // lineLinear:
            //    'linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, rgb(224, 225, 226) 49.52%, rgba(224, 225, 226, 0) 100%)',
         },

         fontFamily: {
            dana: 'dana',
            poppins: 'poppins',
         },
         borderRadius: {
            10: '10px',
         },
         fontSize: {
            10: '10px',
         },
      },
   },
   plugins: [],
};
