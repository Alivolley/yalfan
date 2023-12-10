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
      customPinkLow: {
         main: '#FFEEED',
      },
      customPinkHigh: {
         main: '#D14F4D',
      },
      white: {
         main: '#ffffff',
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
               // ...((props.ownerState.color === 'customOrange' || props.ownerState.color === 'customOrange2') && {
               //    color: 'white',
               // }),
            }),
         },
      },

      MuiTab: {
         styleOverrides: {
            root: props => ({
               ...(props['aria-selected'] &&
                  props.customOrange &&
                  {
                     // color: '#FB9B40 !important',
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
