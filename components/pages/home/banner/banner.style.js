import styled from '@emotion/styled';
import homeBannerMobile from '../../../../assets/images/home-banner-mobile.png';
import homeBannerMobileLtr from '../../../../assets/images/home-banner-mobile-ltr.png';
import homeBannerDesktop from '../../../../assets/images/home-banner-desktop.png';
import homeBannerDesktopLtr from '../../../../assets/images/home-banner-desktop-ltr.png';

const BannerStyle = styled.section(({ locale }) => ({
   backgroundImage: locale === 'en' ? `url(${homeBannerMobileLtr?.src})` : `url(${homeBannerMobile?.src})`,
   backgroundPosition: 'center center',
   backgroundRepeat: 'no-repeat',
   backgroundSize: 'cover',

   '@media (min-width: 600px)': {
      backgroundImage: locale === 'en' ? `url(${homeBannerDesktopLtr?.src})` : `url(${homeBannerDesktop?.src})`,
   },
}));

export default BannerStyle;
