import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

function RtlProvider({ children, isRtl = true }) {
   const cacheRtl = createCache({
      key: 'muirtl',
      stylisPlugins: [prefixer, rtlPlugin],
   });
   if (isRtl) {
      return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
   }

   return children;
}

export default RtlProvider;
