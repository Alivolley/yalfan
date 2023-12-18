import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Image from 'next/image';

// MUI
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';

// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Assets
import Link from 'next/link';
import faqPic from '@/assets/images/faq.png';

function Faqs() {
   const router = useRouter();
   const t = useTranslations('faqs');

   return (
      <div className="bg-[#fcf7f7] px-8 py-[60px] customMd:px-16">
         <div className="flex items-start gap-5">
            <div
               className={`hidden h-[435px] w-[300px] shrink-0 border-solid border-[#E4EAF0] customMd:block ${
                  router.locale === 'en' ? 'border-e pe-5' : 'scale-x-[-1] border-s ps-5'
               }`}
            >
               <Image src={faqPic} alt="faq" className="h-full w-full" />
            </div>
            <div className="bg-white px-1 py-5 customMd:grow customMd:px-10">
               <Accordion
                  sx={{
                     boxShadow: 'none',
                  }}
               >
                  <AccordionSummary
                     expandIcon={
                        <div className="flex items-center justify-center rounded-md bg-customPinkLow p-1 text-customPinkHigh">
                           <ExpandMoreIcon />
                        </div>
                     }
                     aria-controls="panel1a-content"
                     id="panel1a-header"
                  >
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 shrink-0 rounded-full bg-[#F7C1CA]" />
                        <p className="text-sm font-bold customMd:text-base">چگونه می توانم سفارش خودرا بازگردانم؟</p>
                     </div>
                  </AccordionSummary>
                  <AccordionDetails>
                     <p className="text-sm">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                        مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                        زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                     </p>
                  </AccordionDetails>
               </Accordion>
               <Accordion
                  sx={{
                     boxShadow: 'none',
                     marginTop: '10px',
                  }}
               >
                  <AccordionSummary
                     expandIcon={
                        <div className="flex items-center justify-center rounded-md bg-customPinkLow p-1 text-customPinkHigh">
                           <ExpandMoreIcon />
                        </div>
                     }
                     aria-controls="panel1a-content"
                     id="panel1a-header"
                  >
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 shrink-0 rounded-full bg-[#F7C1CA]" />
                        <p className="text-sm font-bold customMd:text-base">
                           نحوه ارسال به چه صورت است و چه مقدار زمان میبرد به دست ما برسد؟
                        </p>
                     </div>
                  </AccordionSummary>
                  <AccordionDetails>
                     <p className="text-sm">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                        مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                        زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                     </p>
                  </AccordionDetails>
               </Accordion>
               <Accordion
                  sx={{
                     boxShadow: 'none',
                     marginTop: '10px',
                  }}
               >
                  <AccordionSummary
                     expandIcon={
                        <div className="flex items-center justify-center rounded-md bg-customPinkLow p-1 text-customPinkHigh">
                           <ExpandMoreIcon />
                        </div>
                     }
                     aria-controls="panel1a-content"
                     id="panel1a-header"
                  >
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 shrink-0 rounded-full bg-[#F7C1CA]" />
                        <p className="text-sm font-bold customMd:text-base">چگونه می توانم سفارش خودرا بازگردانم؟</p>
                     </div>
                  </AccordionSummary>
                  <AccordionDetails>
                     <p className="text-sm">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                        مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                        زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                     </p>
                  </AccordionDetails>
               </Accordion>
               <Accordion
                  sx={{
                     boxShadow: 'none',
                     marginTop: '10px',
                  }}
               >
                  <AccordionSummary
                     expandIcon={
                        <div className="flex items-center justify-center rounded-md bg-customPinkLow p-1 text-customPinkHigh">
                           <ExpandMoreIcon />
                        </div>
                     }
                     aria-controls="panel1a-content"
                     id="panel1a-header"
                  >
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 shrink-0 rounded-full bg-[#F7C1CA]" />
                        <p className="text-sm font-bold customMd:text-base">
                           نحوه ارسال به چه صورت است و چه مقدار زمان میبرد به دست ما برسد؟
                        </p>
                     </div>
                  </AccordionSummary>
                  <AccordionDetails>
                     <p className="text-sm">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                        مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                        زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                     </p>
                  </AccordionDetails>
               </Accordion>
               <Accordion
                  sx={{
                     boxShadow: 'none',
                     marginTop: '10px',
                  }}
               >
                  <AccordionSummary
                     expandIcon={
                        <div className="flex items-center justify-center rounded-md bg-customPinkLow p-1 text-customPinkHigh">
                           <ExpandMoreIcon />
                        </div>
                     }
                     aria-controls="panel1a-content"
                     id="panel1a-header"
                  >
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 shrink-0 rounded-full bg-[#F7C1CA]" />
                        <p className="text-sm font-bold customMd:text-base">چگونه می توانم سفارش خودرا بازگردانم؟</p>
                     </div>
                  </AccordionSummary>
                  <AccordionDetails>
                     <p className="text-sm">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                        مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                        زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                     </p>
                  </AccordionDetails>
               </Accordion>
               <Accordion
                  sx={{
                     boxShadow: 'none',
                     marginTop: '10px',
                  }}
               >
                  <AccordionSummary
                     expandIcon={
                        <div className="flex items-center justify-center rounded-md bg-customPinkLow p-1 text-customPinkHigh">
                           <ExpandMoreIcon />
                        </div>
                     }
                     aria-controls="panel1a-content"
                     id="panel1a-header"
                  >
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 shrink-0 rounded-full bg-[#F7C1CA]" />
                        <p className="text-sm font-bold customMd:text-base">
                           نحوه ارسال به چه صورت است و چه مقدار زمان میبرد به دست ما برسد؟
                        </p>
                     </div>
                  </AccordionSummary>
                  <AccordionDetails>
                     <p className="text-sm">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                        مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                        زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                     </p>
                  </AccordionDetails>
               </Accordion>
               <Accordion
                  sx={{
                     boxShadow: 'none',
                     marginTop: '10px',
                  }}
               >
                  <AccordionSummary
                     expandIcon={
                        <div className="flex items-center justify-center rounded-md bg-customPinkLow p-1 text-customPinkHigh">
                           <ExpandMoreIcon />
                        </div>
                     }
                     aria-controls="panel1a-content"
                     id="panel1a-header"
                  >
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 shrink-0 rounded-full bg-[#F7C1CA]" />
                        <p className="text-sm font-bold customMd:text-base">چگونه می توانم سفارش خودرا بازگردانم؟</p>
                     </div>
                  </AccordionSummary>
                  <AccordionDetails>
                     <p className="text-sm">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                        مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                        زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                     </p>
                  </AccordionDetails>
               </Accordion>
               <Accordion
                  sx={{
                     boxShadow: 'none',
                     marginTop: '10px',
                  }}
               >
                  <AccordionSummary
                     expandIcon={
                        <div className="flex items-center justify-center rounded-md bg-customPinkLow p-1 text-customPinkHigh">
                           <ExpandMoreIcon />
                        </div>
                     }
                     aria-controls="panel1a-content"
                     id="panel1a-header"
                  >
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 shrink-0 rounded-full bg-[#F7C1CA]" />
                        <p className="text-sm font-bold customMd:text-base">
                           نحوه ارسال به چه صورت است و چه مقدار زمان میبرد به دست ما برسد؟
                        </p>
                     </div>
                  </AccordionSummary>
                  <AccordionDetails>
                     <p className="text-sm">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                        مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                        زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                     </p>
                  </AccordionDetails>
               </Accordion>
            </div>
         </div>

         <div className="mt-16 flex flex-col items-center justify-center gap-3">
            <p className="text-sm font-bold customMd:text-base">{t("Didn't find your answer")}</p>
            <p className="text-xs text-[#626E94]">{t('Contact Our backup team')}</p>
            <Link href="/">
               <Button color="customPink2" variant="contained" className="!px-10 !text-customPinkHigh">
                  {t('Contact us')}
               </Button>
            </Link>
         </div>
      </div>
   );
}

export default Faqs;

export async function getStaticProps(context) {
   return {
      props: {
         messages: (await import(`../../messages/${context.locale}.json`)).default,
      },
   };
}
