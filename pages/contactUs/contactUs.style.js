import styled from '@emotion/styled';

const ContactUsStyle = styled.div(() => ({
   '& #inputNumber input[type="number"]': {
      MozAppearance: 'textfield',
      appearance: 'textfield',
      '&::-webkit-inner-spin-button': {
         WebkitAppearance: 'none',
         appearance: 'none',
      },
   },
}));

export default ContactUsStyle;
