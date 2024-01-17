import { useSWRConfig } from 'swr';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

// MUI
import {
   Backdrop,
   Box,
   Button,
   Checkbox,
   CircularProgress,
   Dialog,
   FormControl,
   FormControlLabel,
   FormHelperText,
   Grid,
   IconButton,
   LinearProgress,
   MenuItem,
   Select,
   TextField,
} from '@mui/material';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Data
import { toast } from 'react-toastify';
import colorPallet from '@/data/color-pallet';

// Components
import ColorComponent from '../colorComponent/colorComponent';

// Apis
import useGetAllCategories from '@/apis/pAdmin/products/useGetAllCategories';
import useAddProduct from '@/apis/pAdmin/products/useAddProduct';
import useGetProductDetail from '@/apis/pAdmin/products/useGetProductDetail';
import useEditProduct from '@/apis/pAdmin/products/useEditProduct';

function AddEditProductModal({ show, onClose, isEdit = false, detail, pageStatus, countValue, categoryTitle }) {
   const [coverImage, setCoverImage] = useState();
   const [coverImageURL, setCoverImageURL] = useState();
   const [pictures, setPictures] = useState([]);
   const [picturesURL, setPicturesURL] = useState([]);
   const [colorsAndCount, setColorsAndCount] = useState([]);
   const [uploadPercent, setUploadPercent] = useState(0);
   const { locale } = useRouter();
   const { mutate } = useSWRConfig();
   const t = useTranslations('addresses');

   const { data: productDetail, isLoading: productDetailIsLoading } = useGetProductDetail(detail?.title);
   const { data: categoryList } = useGetAllCategories();
   const { trigger: addProductTrigger, isMutating: addProductIsMutating } = useAddProduct(
      pictures,
      colorsAndCount,
      setUploadPercent
   );
   const { trigger: editProductTrigger, isMutating: editProductIsMutating } = useEditProduct(
      pictures,
      colorsAndCount,
      setUploadPercent,
      productDetail?.title,
      productDetail?.id
   );

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
      control,
   } = useForm({
      defaultValues: {
         productNameFA: '',
         productNameEN: '',
         productNameAR: '',
         priceRial: '',
         priceDollar: '',
         categoryId: '',
         dimensions: '',
         descriptionFA: '',
         descriptionEN: '',
         descriptionAR: '',
         discountType: 'percent',
         discount: '',
         showProduct: true,
      },
      mode: 'onSubmit',
   });

   useEffect(() => {
      console.log(productDetail);

      if (isEdit && productDetail) {
         setValue('productNameFA', productDetail?.title_fa);
         setValue('productNameEN', productDetail?.title_en);
         setValue('productNameAR', productDetail?.title_ar);
         setValue('priceRial', productDetail?.rial_price);
         setValue('priceDollar', productDetail?.dollar_price);
         setValue('dimensions', productDetail?.dimensions);
         setValue('descriptionFA', productDetail?.description_fa);
         setValue('descriptionEN', productDetail?.description_en);
         setValue('descriptionAR', productDetail?.description_ar);
         setValue('showProduct', productDetail?.public);
         if (productDetail?.discount_amount > 0) {
            setValue('discountType', 'amount');
            setValue('discount', productDetail?.discount_amount);
         } else if (productDetail?.discount_percent > 0) {
            setValue('discountType', 'percent');
            setValue('discount', productDetail?.discount_percent);
         }
         const foundedCategory = categoryList?.find(
            item =>
               item?.title_fa === productDetail?.category ||
               item?.title_en === productDetail?.category ||
               item?.title_ar === productDetail?.category
         );
         setValue('categoryId', foundedCategory?.id);
         setColorsAndCount(productDetail?.colors?.map(item => ({ color: item?.color, stock: item?.stock })));
         setCoverImage(productDetail?.cover);
         setCoverImageURL(productDetail?.cover);
         setPictures(productDetail?.images);
         setPicturesURL(productDetail?.images);
      }
   }, [detail, productDetail]);

   const closeModalHandler = () => {
      onClose();
      setPictures([]);
      setPicturesURL([]);
      setCoverImage();
      setCoverImageURL();
      setColorsAndCount([]);
      if (!isEdit) {
         reset();
      }
   };
   const formSubmit = data => {
      if (!coverImage) {
         toast.info('لطفا کاور محصول خود را انتخاب کنید', {
            style: {
               direction: locale === 'en' ? 'ltr' : 'rtl',
               fontFamily:
                  locale === 'en' ? 'poppins' : locale === 'fa' ? 'dana' : locale === 'ar' ? 'rubik' : 'poppins',
               lineHeight: '25px',
            },
            theme: 'colored',
            autoClose: 5000,
         });
      } else if (!pictures?.length) {
         toast.info('لطفا عکس برای محصول خود انتخاب کنید', {
            style: {
               direction: locale === 'en' ? 'ltr' : 'rtl',
               fontFamily:
                  locale === 'en' ? 'poppins' : locale === 'fa' ? 'dana' : locale === 'ar' ? 'rubik' : 'poppins',
               lineHeight: '25px',
            },
            theme: 'colored',
            autoClose: 5000,
         });
      } else if (!colorsAndCount?.length) {
         toast.info('لطفا رنگ های مد نظر خود را انتخاب کنید', {
            style: {
               direction: locale === 'en' ? 'ltr' : 'rtl',
               fontFamily:
                  locale === 'en' ? 'poppins' : locale === 'fa' ? 'dana' : locale === 'ar' ? 'rubik' : 'poppins',
               lineHeight: '25px',
            },
            theme: 'colored',
            autoClose: 5000,
         });
      } else {
         setUploadPercent(0);

         const newProduct = new FormData();
         newProduct.append('category', data.categoryId);
         newProduct.append('cover', coverImage);
         newProduct.append('title_fa', data.productNameFA);
         newProduct.append('title_en', data.productNameEN);
         newProduct.append('title_ar', data.productNameAR);
         newProduct.append('description_fa', data.descriptionFA);
         newProduct.append('description_en', data.descriptionEN);
         newProduct.append('description_ar', data.descriptionAR);
         newProduct.append('description_ar', data.descriptionAR);
         newProduct.append('dimensions', data.dimensions);
         newProduct.append('rial_price', data.priceRial);
         newProduct.append('dollar_price', data.priceDollar);
         newProduct.append('public', data.showProduct);
         if (data.discountType === 'percent') {
            newProduct.append('discount_percent', data.discount);
         } else if (data.discountType === 'amount') {
            newProduct.append('discount_amount', data.discount);
         }

         if (isEdit) {
            editProductTrigger(newProduct, {
               onSuccess: () => {
                  mutate(
                     `store/products/list_create/?page=${pageStatus}&page_size=${countValue}&category=${categoryTitle}`
                  );
                  closeModalHandler();
                  toast.success('محصول ویرایش شد', {
                     style: {
                        direction: locale === 'en' ? 'ltr' : 'rtl',
                        fontFamily:
                           locale === 'en'
                              ? 'poppins'
                              : locale === 'fa'
                                ? 'dana'
                                : locale === 'ar'
                                  ? 'rubik'
                                  : 'poppins',
                        lineHeight: '25px',
                     },
                     theme: 'colored',
                     autoClose: 5000,
                  });
               },
            });
         } else {
            addProductTrigger(newProduct, {
               onSuccess: () => {
                  mutate(
                     `store/products/list_create/?page=${pageStatus}&page_size=${countValue}&category=${categoryTitle}`
                  );
                  closeModalHandler();
                  toast.success('محصول جدید ایجاد شد', {
                     style: {
                        direction: locale === 'en' ? 'ltr' : 'rtl',
                        fontFamily:
                           locale === 'en'
                              ? 'poppins'
                              : locale === 'fa'
                                ? 'dana'
                                : locale === 'ar'
                                  ? 'rubik'
                                  : 'poppins',
                        lineHeight: '25px',
                     },
                     theme: 'colored',
                     autoClose: 5000,
                  });
               },
            });
         }
      }
   };

   const inputPicturesChangeHandler = e => {
      if (e?.target?.files[0]) {
         const files = Array.from(e?.target?.files);
         files?.forEach(item => {
            setPictures(prev => [...prev, item]);
            const itemURL = URL.createObjectURL(item);
            setPicturesURL(prev => [...prev, { source: itemURL, wholeItem: item }]);
         });
      }
   };

   const removePictureHandler = pic => {
      setPictures(prev => {
         const newPictures = prev?.filter(item => item !== pic?.wholeItem);
         return newPictures;
      });

      setPicturesURL(prev => {
         const newPicturesURL = prev.filter(item => item !== pic);
         return newPicturesURL;
      });
   };

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
      <Dialog open={show} onClose={closeModalHandler} fullWidth dir={locale === 'en' ? 'ltr' : 'rtl'} maxWidth="xl">
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">افزودن محصول</p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>

            {isEdit && productDetailIsLoading ? (
               <div className="my-16 flex w-full items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            ) : (
               <>
                  <div className="mt-5 border-b border-solid border-[#E4EAF0] pb-6">
                     <p className="mb-3 text-sm font-bold text-[#626E94]">عکس کاور</p>

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
                           افزودن عکس جدید
                           <input
                              type="file"
                              className="absolute inset-0 cursor-pointer opacity-0"
                              accept="image/*"
                              onChange={inputCoverChangeHandler}
                           />
                        </Button>
                     </div>
                  </div>

                  <div className="my-8 mt-5">
                     <p className="mb-3 text-sm font-bold text-[#626E94]">عکس محصول</p>
                     <div className="flex flex-wrap items-end gap-4">
                        <div className="flex flex-wrap items-center gap-5">
                           {picturesURL?.map(item => (
                              <div
                                 key={item?.source || item}
                                 className="relative flex aspect-square w-28 shrink-0 items-center justify-center rounded-2xl border border-solid border-[#9da8ba48]"
                              >
                                 <img
                                    src={item?.source || item}
                                    alt="pic"
                                    className="h-full w-full rounded-2xl object-cover"
                                 />
                                 <div className="absolute end-0 top-0">
                                    <IconButton
                                       onClick={() => removePictureHandler(item)}
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
                           ))}

                           <div className="relative aspect-square w-28 rounded-2xl border border-dashed border-[#9DA8BA] bg-[#F5F8FC]">
                              <input
                                 type="file"
                                 className="absolute inset-0 cursor-pointer opacity-0"
                                 accept="image/*"
                                 onChange={inputPicturesChangeHandler}
                                 multiple
                              />
                           </div>
                        </div>
                        <Button
                           variant="contained"
                           color="customGold"
                           className="!relative !cursor-pointer !rounded-10 !text-white"
                           size="small"
                        >
                           افزودن عکس جدید
                           <input
                              type="file"
                              className="absolute inset-0 cursor-pointer opacity-0"
                              accept="image/*"
                              onChange={inputPicturesChangeHandler}
                              multiple
                           />
                        </Button>
                     </div>
                  </div>

                  <div className="my-5 border-y border-solid border-[#E4EAF0] pb-5 pt-8">
                     <p className="mb-8 text-sm font-bold text-[#626E94]">رنگ و تعداد هر محصول را انتخاب کنید</p>

                     <div className="flex flex-wrap items-start gap-3">
                        {colorPallet?.map(item => (
                           <ColorComponent
                              key={item?.id}
                              colorsAndCount={colorsAndCount}
                              setColorsAndCount={setColorsAndCount}
                              detail={item}
                           />
                        ))}
                     </div>
                  </div>

                  <form onSubmit={handleSubmit(formSubmit)}>
                     <Grid container spacing={4}>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">نام محصول به فارسی</p>
                              <TextField
                                 fullWidth
                                 {...register('productNameFA', {
                                    required: {
                                       value: true,
                                       message: t('This filed is required'),
                                    },
                                 })}
                                 error={!!errors?.productNameFA}
                                 helperText={errors?.productNameFA?.message}
                              />
                           </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">نام محصول به انگلیسی</p>
                              <TextField
                                 fullWidth
                                 {...register('productNameEN', {
                                    required: {
                                       value: true,
                                       message: t('This filed is required'),
                                    },
                                 })}
                                 error={!!errors?.productNameEN}
                                 helperText={errors?.productNameEN?.message}
                              />
                           </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">نام محصول به عربی</p>
                              <TextField
                                 fullWidth
                                 {...register('productNameAR', {
                                    required: {
                                       value: true,
                                       message: t('This filed is required'),
                                    },
                                 })}
                                 error={!!errors?.productNameAR}
                                 helperText={errors?.productNameAR?.message}
                              />
                           </div>
                        </Grid>
                     </Grid>
                     <br />
                     <br />
                     <Grid container spacing={4}>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">دسته بندی به فارسی</p>

                              <Controller
                                 control={control}
                                 name="categoryId"
                                 rules={{ required: t('This filed is required') }}
                                 render={({ field: { onChange, value }, fieldState }) => (
                                    <FormControl error={!!errors?.categoryId}>
                                       <Select value={value} onChange={onChange}>
                                          {categoryList?.map(item => (
                                             <MenuItem
                                                className="!text-sm"
                                                value={item?.id}
                                                dir={locale === 'en' ? 'ltr' : 'rtl'}
                                                key={item?.id}
                                             >
                                                {item?.title_fa}
                                             </MenuItem>
                                          ))}
                                       </Select>
                                       {fieldState.invalid
                                          ? errors?.categoryId?.message && (
                                               <FormHelperText error>{errors?.categoryId?.message}</FormHelperText>
                                            )
                                          : null}
                                    </FormControl>
                                 )}
                              />
                           </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">دسته بندی به انگلیسی</p>

                              <Controller
                                 control={control}
                                 name="categoryId"
                                 rules={{ required: t('This filed is required') }}
                                 render={({ field: { onChange, value }, fieldState }) => (
                                    <FormControl error={!!errors?.categoryId}>
                                       <Select value={value} onChange={onChange}>
                                          {categoryList?.map(item => (
                                             <MenuItem
                                                className="!text-sm"
                                                value={item?.id}
                                                dir={locale === 'en' ? 'ltr' : 'rtl'}
                                                key={item?.id}
                                             >
                                                {item?.title_en}
                                             </MenuItem>
                                          ))}
                                       </Select>
                                       {fieldState.invalid
                                          ? errors?.categoryId?.message && (
                                               <FormHelperText error>{errors?.categoryId?.message}</FormHelperText>
                                            )
                                          : null}
                                    </FormControl>
                                 )}
                              />
                           </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">دسته بندی به عربی</p>

                              <Controller
                                 control={control}
                                 name="categoryId"
                                 rules={{ required: t('This filed is required') }}
                                 render={({ field: { onChange, value }, fieldState }) => (
                                    <FormControl error={!!errors?.categoryId}>
                                       <Select value={value} onChange={onChange}>
                                          {categoryList?.map(item => (
                                             <MenuItem
                                                className="!text-sm"
                                                value={item?.id}
                                                dir={locale === 'en' ? 'ltr' : 'rtl'}
                                                key={item?.id}
                                             >
                                                {item?.title_ar}
                                             </MenuItem>
                                          ))}
                                       </Select>
                                       {fieldState.invalid
                                          ? errors?.categoryId?.message && (
                                               <FormHelperText error>{errors?.categoryId?.message}</FormHelperText>
                                            )
                                          : null}
                                    </FormControl>
                                 )}
                              />
                           </div>
                        </Grid>
                     </Grid>
                     <br />
                     <br />
                     <Grid container spacing={4}>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">قیمت ( تومان )</p>
                              <TextField
                                 fullWidth
                                 type="number"
                                 sx={{
                                    input: {
                                       MozAppearance: 'textfield',
                                       appearance: 'textfield',
                                       '&::-webkit-inner-spin-button': {
                                          WebkitAppearance: 'none',
                                          appearance: 'none',
                                       },
                                    },
                                 }}
                                 {...register('priceRial', {
                                    required: {
                                       value: true,
                                       message: t('This filed is required'),
                                    },
                                 })}
                                 error={!!errors?.priceRial}
                                 helperText={errors?.priceRial?.message}
                              />
                           </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">قیمت ( دلار )</p>
                              <TextField
                                 fullWidth
                                 type="number"
                                 sx={{
                                    input: {
                                       MozAppearance: 'textfield',
                                       appearance: 'textfield',
                                       '&::-webkit-inner-spin-button': {
                                          WebkitAppearance: 'none',
                                          appearance: 'none',
                                       },
                                    },
                                 }}
                                 {...register('priceDollar', {
                                    required: {
                                       value: true,
                                       message: t('This filed is required'),
                                    },
                                 })}
                                 error={!!errors?.priceDollar}
                                 helperText={errors?.priceDollar?.message}
                              />
                           </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">ابعاد</p>
                              <TextField
                                 fullWidth
                                 {...register('dimensions', {
                                    required: {
                                       value: true,
                                       message: t('This filed is required'),
                                    },
                                 })}
                                 error={!!errors?.dimensions}
                                 helperText={errors?.dimensions?.message}
                              />
                           </div>
                        </Grid>
                     </Grid>
                     <br />
                     <br />
                     <Grid container spacing={4}>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">توضیح محصول به فارسی</p>
                              <TextField
                                 fullWidth
                                 multiline
                                 rows={6}
                                 {...register('descriptionFA', {
                                    required: {
                                       value: true,
                                       message: t('This filed is required'),
                                    },
                                 })}
                                 error={!!errors?.descriptionFA}
                                 helperText={errors?.descriptionFA?.message}
                              />
                           </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">توضیح محصول به انگلیسی</p>
                              <TextField
                                 fullWidth
                                 multiline
                                 rows={6}
                                 {...register('descriptionEN', {
                                    required: {
                                       value: true,
                                       message: t('This filed is required'),
                                    },
                                 })}
                                 error={!!errors?.descriptionEN}
                                 helperText={errors?.descriptionEN?.message}
                              />
                           </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">توضیح محصول به عربی</p>
                              <TextField
                                 fullWidth
                                 multiline
                                 rows={6}
                                 {...register('descriptionAR', {
                                    required: {
                                       value: true,
                                       message: t('This filed is required'),
                                    },
                                 })}
                                 error={!!errors?.descriptionAR}
                                 helperText={errors?.descriptionAR?.message}
                              />
                           </div>
                        </Grid>
                     </Grid>
                     <br />
                     <br />
                     <Grid container spacing={4}>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-[#626E94]">تخفیف</p>
                              <div className="flex">
                                 <div className="shrink-0">
                                    <Controller
                                       control={control}
                                       name="discountType"
                                       rules={{ required: t('This filed is required') }}
                                       render={({ field: { onChange, value } }) => (
                                          <FormControl>
                                             <Select value={value} onChange={onChange} className="!text-sm">
                                                <MenuItem
                                                   className="!text-sm"
                                                   value="percent"
                                                   dir={locale === 'en' ? 'ltr' : 'rtl'}
                                                >
                                                   درصدی
                                                </MenuItem>
                                                <MenuItem
                                                   className="!text-sm"
                                                   value="amount"
                                                   dir={locale === 'en' ? 'ltr' : 'rtl'}
                                                >
                                                   مقداری
                                                </MenuItem>
                                             </Select>
                                          </FormControl>
                                       )}
                                    />
                                 </div>
                                 <div className="grow">
                                    <TextField
                                       fullWidth
                                       type="number"
                                       sx={{
                                          input: {
                                             MozAppearance: 'textfield',
                                             appearance: 'textfield',
                                             '&::-webkit-inner-spin-button': {
                                                WebkitAppearance: 'none',
                                                appearance: 'none',
                                             },
                                          },
                                       }}
                                       {...register('discount')}
                                       error={!!errors?.discount}
                                       helperText={errors?.discount?.message}
                                    />
                                 </div>
                              </div>
                           </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex h-full items-end">
                              <Controller
                                 control={control}
                                 name="showProduct"
                                 render={({ field: { onChange, value } }) => (
                                    <FormControlLabel
                                       control={<Checkbox checked={value} />}
                                       label="نمایش محصول به کاربر"
                                       value={value}
                                       onChange={onChange}
                                    />
                                 )}
                              />
                           </div>
                        </Grid>
                     </Grid>

                     <div className="mt-16">
                        <Button
                           variant="contained"
                           color="customPinkHigh"
                           fullWidth
                           className="!rounded-10 !py-3 !text-white"
                           size="large"
                           type="submit"
                        >
                           ایجاد محصول
                        </Button>
                     </div>
                  </form>
               </>
            )}
         </div>

         <Backdrop sx={{ zIndex: 2 }} open={addProductIsMutating || editProductIsMutating}>
            <div className="flex w-full max-w-[200px] flex-col items-center justify-center gap-7 customMd:max-w-[300px]">
               <p className="text-lg font-bold">درحال ارسال اطلاعات ...</p>
               <div className="flex w-full items-center justify-between gap-3">
                  <p className="font-bold">{uploadPercent}%</p>
                  <Box sx={{ width: '100%' }}>
                     <LinearProgress
                        variant={uploadPercent > 0 ? 'determinate' : 'indeterminate'}
                        value={uploadPercent}
                        color="customPink"
                     />
                  </Box>
               </div>
            </div>
         </Backdrop>
      </Dialog>
   );
}

export default AddEditProductModal;
