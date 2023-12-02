const getDesignTokens = mode => ({
   direction: 'rtl',
   colors: {
      // customOrange: '#FB9B40',
   },

   palette: {
      mode,

      // customOrange: {
      //    main: '#FB9B40',
      // },
   },

   components: {
      MuiTooltip: {
         styleOverrides: {
            tooltip: {
               // fontFamily: 'vazir',
            },
         },
      },

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
            root: props => ({
               fontFamily: 'rokhRegular',
               boxShadow: 'none',
               '&:hover': {
                  boxShadow: '0px 4px 7px 0px #C2C2C236',
               },
               // ...((props.ownerState.color === 'customOrange' || props.ownerState.color === 'customOrange2') && {
               //    color: 'white',
               // }),
            }),
         },
      },

      MuiInputLabel: {
         styleOverrides: {
            root: {
               fontFamily: 'rokhRegular',
            },
         },
      },
      MuiInputBase: {
         styleOverrides: {
            root: {
               fontFamily: 'rokhRegular',
            },
         },
      },
      MuiFormHelperText: {
         styleOverrides: {
            root: {
               fontFamily: 'rokhRegular',
            },
         },
      },

      MuiTab: {
         styleOverrides: {
            root: props => ({
               fontFamily: 'rokhRegular',
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
               // borderRadius: '10px',
            },
         },
      },

      MuiPaginationItem: {
         styleOverrides: {
            root: {
               fontFamily: 'rokhFaNum',
            },
         },
      },
   },
});

export default getDesignTokens;
