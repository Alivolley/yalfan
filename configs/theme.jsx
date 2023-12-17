const getDesignTokens = (mode, direction, language) => ({
   direction,

   typography: {
      fontFamily: language === 'en' ? 'poppins' : language === 'fa' ? 'dana' : 'rubik',
   },

   palette: {
      mode,

      customPink: {
         main: '#FFA3A1',
      },
      customPink2: {
         main: '#FFD7D6',
      },
      customPinkLow: {
         main: '#FFEEED',
      },
      customPinkHigh: {
         main: '#D14F4D',
      },
      white: {
         main: '#ffffff',
      },
      black: {
         main: '#000000',
      },
      borderColor: {
         main: '#BDCEDE',
      },
      textColor: {
         main: '#626E94',
      },
      customBlue: {
         main: '#385E8A',
      },
      customGold: {
         main: '#FF9F1C',
      },
   },

   components: {
      MuiFab: {
         styleOverrides: {
            root: {
               boxShadow: 'none',
               zIndex: 1,
            },
         },
      },

      MuiButton: {
         styleOverrides: {
            root: () => ({
               boxShadow: 'none',
               '&:hover': {
                  boxShadow: '0px 4px 7px 0px #C2C2C236',
               },
               textTransform: 'none',
            }),
         },
      },

      MuiTab: {
         styleOverrides: {
            root: props => ({
               ...(props['aria-selected'] &&
                  props.custompinkhigh && {
                     color: '#B1302E !important',
                  }),
            }),
         },
      },

      MuiOutlinedInput: {
         styleOverrides: {
            root: {
               borderRadius: '10px',
            },
         },
      },
   },
});

export default getDesignTokens;
