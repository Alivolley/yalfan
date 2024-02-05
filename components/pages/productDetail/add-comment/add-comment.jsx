import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Rating, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import OutboxOutlinedIcon from '@mui/icons-material/OutboxOutlined';

// Apis
import useAddComment from '@/apis/comments/useAddComment';

function AddComment({ productDetail, commentsMutate }) {
   const t = useTranslations('productDetail');
   const isLogin = useSelector(state => state?.loginStatusReducer);
   const { locale } = useRouter();

   const { trigger: addCommentTrigger, isMutating: addCommentIsMutating } = useAddComment();

   const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      watch,
      reset,
   } = useForm({
      defaultValues: {
         rate: '5',
         comment: '',
      },
      mode: 'onSubmit',
   });

   const formSubmit = data => {
      if (isLogin) {
         const newComment = {
            message: data?.comment,
            product: productDetail?.id,
            score: Number(data?.rate),
         };

         addCommentTrigger(newComment, {
            onSuccess: () => {
               commentsMutate();
               reset();
            },
         });
      } else {
         toast.info(t('To add comment , you need to login first'), {
            style: {
               direction: locale === 'en' ? 'ltr' : 'rtl',
               fontFamily:
                  locale === 'en' ? 'poppins' : locale === 'fa' ? 'dana' : locale === 'ar' ? 'rubik' : 'poppins',
               lineHeight: '25px',
               fontSize: '14px',
            },
            theme: 'colored',
            autoClose: 5000,
         });
      }
   };

   const rateValue = watch('rate');

   return (
      <form onSubmit={handleSubmit(formSubmit)}>
         <div className="flex flex-col items-center">
            <p className="mb-4 mt-20 text-center text-base customMd:mt-0">
               {t('How do you rate the orders from the yalfan store?')}
            </p>
            <p className="mb-3 rounded bg-[#C1F7EE] px-4 py-1.5 text-sm text-[#139983]">
               {rateValue === '5'
                  ? t('Very good')
                  : rateValue === '4'
                    ? t('Good')
                    : rateValue === '3'
                      ? t('Regular')
                      : rateValue === '2'
                        ? t('Bad')
                        : rateValue === '1'
                          ? t('Very bad')
                          : null}
            </p>

            <div className="mb-9">
               <Controller
                  control={control}
                  name="rate"
                  render={({ field: { onChange, value } }) => <Rating value={Number(value)} onChange={onChange} />}
               />
            </div>
         </div>

         <TextField
            label={t('Write your comment here')}
            multiline
            rows={4}
            color="customPink"
            fullWidth
            {...register('comment', {
               required: {
                  value: true,
               },
            })}
            error={!!errors?.comment}
            helperText={t('Example add comment')}
         />

         <div className="mt-8 customSm:max-w-[300px]">
            <LoadingButton
               variant="contained"
               size="large"
               color="customPink3"
               fullWidth
               loading={addCommentIsMutating}
               className="!rounded-10 !p-2 !text-customPinkHigh"
               type="submit"
            >
               <div className="flex w-full items-center justify-between">
                  <p>{t('Add comment')}</p>

                  <OutboxOutlinedIcon className="rounded-xl bg-white p-2 text-customPinkHigh" />
               </div>
            </LoadingButton>
         </div>
      </form>
   );
}

export default AddComment;
