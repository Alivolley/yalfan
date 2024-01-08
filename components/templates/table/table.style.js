import styled from '@emotion/styled';

const TableStyle = styled.div(() => ({
   maxWidth: '100%',
   width: '100%',
   overflow: 'auto',

   table: {
      width: '100%',
      maxWidth: '100%',
      borderCollapse: 'separate',

      tr: {
         whiteSpace: 'nowrap',
      },

      '& td, th': {
         padding: '20px',
         borderBottom: '1px solid #E4EAF0',
      },

      'tr td:nth-of-type(odd)': {
         color: '#7E8AAB',
         fontWeight: 'bold',
      },
   },
}));

export default TableStyle;
