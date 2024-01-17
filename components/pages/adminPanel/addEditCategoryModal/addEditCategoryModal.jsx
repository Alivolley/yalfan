import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

// MUI
import { Button, CircularProgress, Dialog, Grid, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Apis
import useAddCategory from '@/apis/pAdmin/categories/useAddCategory';
import useGetCategoryDetail from '@/apis/pAdmin/categories/useGetCategoryDetail';
import useEditCategory from '@/apis/pAdmin/categories/useEditCategory';

function AddEditCategoryModal({ show, onClose, isEdit = false, detail }) {
   const [coverImage, setCoverImage] = useState();
   const [coverImageURL, setCoverImageURL] = useState();

   const { trigger: addCategoryTrigger, isMutating: addCategoryIsMutating } = useAddCategory();
   const { trigger: editCategoryTrigger, isMutating: editCategoryIsMutating } = useEditCategory(detail);
   const { data: categoryDetail, isLoading: categoryDetailIsLoading } = useGetCategoryDetail(detail);

   const { locale } = useRouter();
   const t = useTranslations('adminPanelProducts');

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
   } = useForm({
      defaultValues: {
         categoryFA: '',
         categoryEN: '',
         categoryAR: '',
      },
      mode: 'onSubmit',
   });

   const closeModalHandler = () => {
      onClose();
      reset();
      setCoverImage();
      setCoverImageURL();
   };

   const formSubmit = data => {
      if (!coverImage) {
         toast.info(t('Please select a cover for your category'), {
            style: {
               direction: locale === 'en' ? 'ltr' : 'rtl',
               fontFamily:
                  locale === 'en' ? 'poppins' : locale === 'fa' ? 'dana' : locale === 'ar' ? 'rubik' : 'poppins',
               lineHeight: '25px',
            },
            theme: 'colored',
            autoClose: 5000,
         });
      } else if (isEdit) {
         const newProduct = new FormData();
         newProduct.append('title_fa', data.categoryFA);
         newProduct.append('title_en', data.categoryEN);
         newProduct.append('title_ar', data.categoryAR);
         if (categoryDetail?.cover !== coverImage) {
            newProduct.append('cover', coverImage);
         }

         editCategoryTrigger(newProduct, {
            onSuccess: () => {
               closeModalHandler();
            },
         });
      } else {
         const newProduct = new FormData();
         newProduct.append('cover', coverImage);
         newProduct.append('title_fa', data.categoryFA);
         newProduct.append('title_en', data.categoryEN);
         newProduct.append('title_ar', data.categoryAR);
         addCategoryTrigger(newProduct, {
            onSuccess: () => {
               closeModalHandler();
            },
         });
      }
   };

   useEffect(() => {
      if (isEdit && categoryDetail) {
         setCoverImage(categoryDetail?.cover);
         setCoverImageURL(categoryDetail?.cover);
         setValue('categoryFA', categoryDetail?.title_fa);
         setValue('categoryEN', categoryDetail?.title_en);
         setValue('categoryAR', categoryDetail?.title_ar);
      }
   }, [detail, categoryDetail]);

   const inputCoverChangeHandler = e => {
      if (e?.target?.files[0]) {
         const file = e?.target?.files[0];
         setCoverImage(file);
         const fileURL = URL.createObjectURL(file);
         setCoverImageURL(fileURL);
      }
   };

   const removeCoverHandler = () => {
      setCoverImage();
      setCoverImageURL();
   };

   return (
      <Dialog open={show} onClose={closeModalHandler} dir={locale === 'en' ? 'ltr' : 'rtl'} fullWidth maxWidth="md">
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] border-b border-solid border-[#E4EAF0] bg-white">
               <div className="flex items-center justify-between pt-3">
                  <p className="text-lg font-bold">{t('Add category')}</p>
                  <IconButton onClick={closeModalHandler}>
                     <CloseIcon />
                  </IconButton>
               </div>
            </div>

            {isEdit && categoryDetailIsLoading ? (
               <div className="my-16 flex w-full items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            ) : (
               <>
                  <div className="mt-8 border-b border-solid border-[#E4EAF0] pb-6">
                     <p className="mb-3 text-sm font-bold text-[#626E94]">{t('Cover picture')}</p>

                     <div className="flex flex-wrap items-end gap-4">
                        <div className="flex flex-wrap items-center gap-5">
                           {coverImageURL ? (
                              <div className="relative flex aspect-square w-28 shrink-0 items-center justify-center rounded-2xl border border-solid border-[#9da8ba48]">
                                 <img
                                    src={coverImageURL}
                                    alt="pic"
                                    className="h-full w-full rounded-2xl object-cover"
                                 />
                                 <div className="absolute end-0 top-0">
                                    <IconButton
                                       onClick={() => removeCoverHandler()}
                                       sx={{
                                          backgroundColor: '#FB7185',
                                          transition: 'all 0.2s',
                                          ':hover': { backgroundColor: '#FB7185', color: 'white !important' },
                                       }}
                                       size="small"
                                    >
                                       <CloseIcon fontSize="small" color="inherit" />
                                    </IconButton>
                                 </div>
                              </div>
                           ) : (
                              <div className="relative aspect-square w-28 rounded-2xl border border-dashed border-[#9DA8BA] bg-[#F5F8FC]">
                                 <input
                                    type="file"
                                    className="absolute inset-0 cursor-pointer opacity-0"
                                    accept="image/*"
                                    onChange={inputCoverChangeHandler}
                                    multiple
                                 />
                              </div>
                           )}
                        </div>
                        <Button
                           variant="contained"
                           color="customGold"
                           className="!relative !cursor-pointer !rounded-10 !text-white"
                           size="small"
                        >
                           {t('Add new picture')}
                           <input
                              type="file"
                              className="absolute inset-0 cursor-pointer opacity-0"
                              accept="image/*"
                              onChange={inputCoverChangeHandler}
                           />
                        </Button>
                     </div>
                  </div>

                  <form onSubmit={handleSubmit(formSubmit)} className="mt-8">
                     <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">{t('Category name in fa')}</p>
                              <TextField
                                 fullWidth
                                 {...register('categoryFA', {
                                    required: {
                                       value: true,
                                       message: t('This filed is required'),
                                    },
                                 })}
                                 error={!!errors?.categoryFA}
                                 helperText={errors?.categoryFA?.message}
                              />
                           </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">{t('Category name in en')}</p>
                              <TextField
                                 fullWidth
                                 {...register('categoryEN', {
                                    required: {
                                       value: true,
                                       message: t('This filed is required'),
                                    },
                                 })}
                                 error={!!errors?.categoryEN}
                                 helperText={errors?.categoryEN?.message}
                              />
                           </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">{t('Category name in ar')}</p>
                              <TextField
                                 fullWidth
                                 {...register('categoryAR', {
                                    required: {
                                       value: true,
                                       message: t('This filed is required'),
                                    },
                                 })}
                                 error={!!errors?.categoryAR}
                                 helperText={errors?.categoryAR?.message}
                              />
                           </div>
                        </Grid>
                     </Grid>

                     <div className="mt-10">
                        <LoadingButton
                           variant="contained"
                           color="customPinkHigh"
                           fullWidth
                           className="!rounded-10 !py-3 !text-white"
                           size="large"
                           type="submit"
                           loading={addCategoryIsMutating || editCategoryIsMutating}
                        >
                           {t('Add category')}
                        </LoadingButton>
                     </div>
                  </form>
               </>
            )}
         </div>
      </Dialog>
   );
}

export default AddEditCategoryModal;
