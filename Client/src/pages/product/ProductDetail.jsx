import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams, Link } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useFetch from '../../hooks/useFetch';
import productServices from '../../services/productService';
import cartServices from '../../services/cartService';
import { SpinnerLoading } from '../../components/ui/loaders';
import AppIcons from '../../components/ui/icon/index';
import formatsHelper from '../../utils/helpers/formats';
import { Button } from '../../components/ui/button/index';
import commentServices from '../../services/commentService';
import formCommentSchema from '../../utils/validations/formComment';
import { UserContext } from '../../contexts/UserContext';
import { showToastError, showToastSuccess } from '../../configs/toastConfig';
import TextArea from '../../components/ui/form/Textarea';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext';
import { HandleCartContext } from '../../contexts/HandleCartContext';
import GalleryComponent from '../../components/ui/image/Gallery';
import CardProduct from '../../components/card/CardProduct';
import { sliderConfigProduct } from '../../configs/sliderConfig';
import 'swiper/css';
import useSrcollTop from '../../hooks/useSrcollTop';
import DiaLog from '../../components/dialog/DiaLog';

const ProductDetail = () => {
  const { slug } = useParams();
  useSrcollTop(slug);
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({ resolver: yupResolver(formCommentSchema.comment) });
  const {
    isLoading,
    responsData: product,
    isError
  } = useFetch(() => productServices.getProductWithBySlug(slug), { slug }, [slug]);
  const { responsData: allProduct } = useFetch(() => productServices.getAllDataProducts(), [slug]);
  const commentContent = watch('content');
  const [dataComment, setDataComment] = useState([]);
  const [relatedProduct, setProductRelated] = useState([]);
  const {
    handlePlusQuantity,
    handleMinusQuantity,
    handleAddToCart,
    setCalculateTotalPrice,
    handleQuantityChange,
    calculateTotalPrice,
    quantityProductDetail
  } = useContext(HandleCartContext);

  useEffect(() => {
    if (allProduct && product?.length > 0) {
      const relatedProducts = allProduct?.filter((pro) => pro?.sub_category_id === product?.[0]?.sub_category_id);
      if (relatedProducts?.length < 6) {
        const unrelatedProducts = allProduct?.filter((pro) => pro?.sub_category_id !== product?.[0]?.sub_category_id);
        const randomUnrelatedProducts = unrelatedProducts
          .sort(() => Math.random() - 0.5)
          .slice(0, 6 - relatedProducts?.length);
        setProductRelated([...relatedProducts, ...randomUnrelatedProducts]);
      } else {
        setProductRelated(relatedProducts);
      }
    }
  }, [allProduct, product?.[0]]);

  const getCommentProduct = async () => {
    if (!product || !product[0]) return;
    const comments = await commentServices.getCommentsByProductId(product[0]?._id);
    setDataComment(comments);
  };

  useEffect(() => {
    if (product && product[0]?.price_distcount) {
      setCalculateTotalPrice(product[0].price_distcount * quantityProductDetail);
    }
    getCommentProduct();
  }, [product]);

  useEffect(() => {
    if (product && product[0]?.price_distcount) {
      setCalculateTotalPrice(quantityProductDetail * product[0].price_distcount);
    }
  }, [quantityProductDetail]);

  const handlePostComment = async (formData) => {
    if (!user || user == null) return showToastError('Vui lòng đăng nhập rồi bình luận');
    if (!formData) return showToastError('Chưa có dữ liệu');
    const data = {
      content: formData.content,
      user_id: user?._id
    };
    if (!data.content || !data.user_id) return;
    await commentServices.addComment(product[0]?._id, data);
    reset();
    getCommentProduct();
    setTimeout(() => {
      if (commentBoxRef.current) {
        commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
      }
    }, 100);
  };
  const confirmDialog = useConfirmDialog();
  const handleDeleteComment = async (commentId) => {
    if (!commentId) return showToastError('Không tìm thấy bình luận để xóa');
    const result = await confirmDialog({
      title: 'Xóa bình luận',
      message: `Bạn có muốn xóa bình luận không?`,
      confirmLabel: 'Có, tôi đồng ý',
      cancelLabel: 'Không, giữ lại'
    });
    if (result) {
      await commentServices.deleteComment(commentId);
      getCommentProduct();
    }
  };

  const [showEditComment, setShowEditComment] = useState(false);
  const [EditCommentData, setEditCommentData] = useState(null);

  const handleToggleEditComment = (comment) => {
    setEditCommentData(comment);
    setShowEditComment(!showEditComment);
  };

  if (isError) return <div>Trang hiện tại đang lỗi</div>;

  return (
    <div>
      <div className='w-[80%] m-auto'>
        {product ? (
          <div>
            <div className='flex gap-2 pb-4 items-center'>
              <div>
                <Link to={'/'}>
                  <AppIcons.HomeIcon />
                </Link>
              </div>
              <AppIcons.ArrowRight />
              <h1 className='text-[#6d6d6d] cursor-pointer'>{product[0]?.name}</h1>
            </div>
            <div className='flex pt-4 gap-5 bg-[#FFFFFF] shadow p-10 rounded-[5px] mb-5 max-md:flex-col max-md:p-2 '>
              <div>
                <div className='w-[500px] max-md:w-full'>
                  <img className='w-full' src={product[0]?.images[0]?.url_img} alt='' />
                </div>
                <div className='pt-3'>
                  <GalleryComponent images={product[0]} />
                </div>
              </div>
              <div className='w-full'>
                <h1 className='font-bold text-[30px] max-md:text-[20px]'>{product[0]?.name}</h1>
                <div className='flex gap-3 pb-2'>
                  <span className='block font-semibold'>Danh mục:</span>
                  {product?.[0].sub_category?.length > 0 ? (
                    product[0]?.sub_category.map((subCate) => (
                      <div key={subCate._id}>
                        <span>{subCate?.name}</span>
                      </div>
                    ))
                  ) : (
                    <span>Tạm thời chưa có danh mục</span>
                  )}
                </div>
                <div className='flex gap-3 pb-2'>
                  <span className='block font-semibold'>Công dụng:</span>
                  <span className='max-w-[600px]'>{product?.[0]?.description_short}</span>
                </div>
                <div className='flex gap-3 pb-2'>
                  <span className='block font-semibold'>Thương hiệu:</span>
                  {product[0]?.brand.map((brand) => (
                    <div key={brand._id}>
                      {brand ? <span>{brand?.name}</span> : <span>Tạm thời thuốc chưa có thương hiệu</span>}
                    </div>
                  ))}
                </div>
                <div className='flex gap-3 pb-2'>
                  <span className='block font-semibold'>Ngày nhập thuốc:</span>
                  {product?.[0]?.production_date ? (
                    <span> {formatsHelper.formatDate(product?.[0]?.production_date)}</span>
                  ) : (
                    <span>Tạm thời chưa có ngày nhập</span>
                  )}
                </div>
                <div className='flex justify-between w-[350px] max-md:w-full'>
                  <div className='flex gap-2 items-center'>
                    <button
                      className={`border-2 border-slate-200 w-[35px] text-[20px] font-bold ${
                        quantityProductDetail > 1 && 'text-blue-500'
                      }`}
                      onClick={handleMinusQuantity}
                    >
                      -
                    </button>
                    <input
                      className='border-2 border-slate-200 w-[50px] px-1 text-center py-[3px] outline-none appearance-none'
                      type='number'
                      onChange={handleQuantityChange}
                      value={quantityProductDetail}
                    />
                    <button
                      className={`border-2 border-slate-200  w-[35px] text-[20px]  font-bold ${
                        quantityProductDetail > 0 && 'text-blue-500'
                      }`}
                      onClick={handlePlusQuantity}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <span className='text-[20px] font-bold'>{formatsHelper.currency(calculateTotalPrice)}</span>
                  </div>
                </div>
                <div className='flex gap-4 pt-4 max-md:justify-between max-md:flex-col max-md:m-3'>
                  <Button
                    onClick={() => handleAddToCart(product[0]?._id, user?._id, true)}
                    disabled={quantityProductDetail < 1 ? true : false}
                    addClassNames='text-[16px] uppercase border border-[#C9C9C9] p-2 py-1 px-[30px] rounded-[10px]  font-semibold hover:bg-gray-100 duration-300 max-md:w-[50%] flex justify-center max-md:w-full'
                  >
                    Thêm giỏ hàng
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(product[0]?._id, user?._id, false)}
                    disabled={quantityProductDetail < 1 ? true : false}
                    addClassNames='text-[16px] text-[#fff] bg-[#2563EB] p-2 w-[150px] flex justify-center rounded-[10px] uppercase hover:bg-blue-700 duration-300 max-md:w-[50%] max-md:w-full'
                  >
                    Mua ngay
                  </Button>
                </div>
              </div>
            </div>
            <div className=' pt-4 gap-3 bg-[#FFFFFF] shadow p-10 rounded-[5px] mb-5 max-md:p-2'>
              <h1 className='font-bold text-[25px] pb-4'>Thông tin sản phẩm</h1>
              <span dangerouslySetInnerHTML={{ __html: product[0]?.description }} />
            </div>
            <div className=' pt-4 gap-3 bg-[#FFFFFF] shadow p-10 rounded-[5px]'>
              <div className='flex gap-2 items-center'>
                <h1 className='font-bold text-[25px] items-center text-[#2563EB]'>Bình luận sản phẩm</h1>
                <AppIcons.ChatIcon addClassNames='text-[#2563EB]' />
              </div>
              <div>
                <form onSubmit={handleSubmit(handlePostComment)}>
                  <span className='block text-white'>Nhận xét</span>
                  <TextArea
                    refinput={register('content')}
                    onChange={(e) => setComment(e.target.value)}
                    addClassNames='view-textarea bg-transparent w-full border-white-600 border py-2 px-4 outline-none text-white-default rounded-xl text-15-15 min-h-30 my-3 text-[#333]'
                    placeholder='Hãy cho chúng mình một vài nhận xét và đóng góp ý kiến nhé...!'
                    name='content'
                    id=''
                    cols='20'
                    rows='5'
                  />
                  {errors.content && <p className='text-red-500 text-sm pl-2 pb-4'>{errors.content.message}</p>}
                  <Button
                    onClick={handlePostComment}
                    className={`w-full duration-200  p-3 rounded-[50px] text-[#333] ${
                      commentContent ? 'bg-green-700 duration-200 text-[#fff]' : 'bg-slate-200'
                    }`}
                  >
                    Gửi nhận xét
                  </Button>
                </form>
              </div>

              <div className='mt-[50px] h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
                {dataComment && dataComment?.length > 0 ? (
                  dataComment
                    .slice()
                    .reverse()
                    .map((comment) => (
                      <div className='flex justify-between items-center' key={comment._id}>
                        <div className='mb-6 bg-white p-4 rounded-lg'>
                          <div className='flex items-center mb-2 gap-3'>
                            <img
                              className='w-[50px] h-[50px] rounded-full object-cover'
                              src={
                                comment?.user_id?.avatar ||
                                'https://res.cloudinary.com/dz93cdipw/image/upload/v1713866997/Book-Store/Avatar/kwuemqemetzsp4jw21mt.webp'
                              }
                              alt={comment?.user_id?.fullname || 'User avatar'}
                            />
                            <div className='flex flex-col'>
                              <span className='font-semibold text-gray-800'>{comment?.user_id?.fullname}</span>
                              <span className='text-sm text-gray-500'>
                                {formatsHelper.formatISODate(comment?.date_create)}
                              </span>
                            </div>
                          </div>
                          <div className='pl-[60px]'>
                            <p className='text-gray-700 text-[16px] leading-relaxed'>{comment?.content}</p>
                            <DiaLog isOpen={showEditComment} onClose={() => setShowEditComment(false)}>
                              <UpdateComment
                                commentEditData={EditCommentData}
                                onCloseShowEditCommet={() => setShowEditComment(false)}
                              />
                            </DiaLog>
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          {user?._id === comment?.user_id?._id && (
                            <div className='cursor-pointer' onClick={() => handleToggleEditComment(comment)}>
                              <AppIcons.EditIcon addClassNames='text-teal-300' width='18px' height='18px' />
                            </div>
                          )}
                          {user?._id === comment?.user_id?._id && (
                            <div className='cursor-pointer' onClick={() => handleDeleteComment(comment?._id)}>
                              <AppIcons.TrashBinIcon addClassNames='text-red-300' width='18px' height='18px' />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <span className='text-gray-500'>Nếu bạn đã sử dụng hãy cho chúng tôi đánh giá !</span>
                )}
              </div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className='flex justify-center'>
            <SpinnerLoading />
          </div>
        )}
      </div>
      <div>
        <h1 className='py-4 text-[25px] font-semibold'>Sản phẩm liên quan khác</h1>
        {relatedProduct && relatedProduct?.length > 0 ? (
          <div className='flex'>
            <Swiper {...sliderConfigProduct} className='mySwiper rounded-[5px]'>
              {relatedProduct.map((product) => (
                <SwiperSlide key={product._id}>
                  <CardProduct
                    products={product}
                    handleAddToCart={() => handleAddToCart(product?._id, user?._id, true)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className='flex justify-center'>
            <SpinnerLoading />
          </div>
        )}
      </div>
    </div>
  );
};

const UpdateComment = ({ commentEditData, onCloseShowEditCommet }) => {
  const [valueComment, setValueComent] = useState(commentEditData?.content);

  const handleUpdateComment = async () => {
    if (commentEditData) {
      const { _id, user_id } = commentEditData;
      const newUpdate = await commentServices.updateComment(_id, { content: valueComment, user_id: user_id?._id });
      if (newUpdate) {
        onCloseShowEditCommet();
        window.location.reload();
      }
    }
  };

  return (
    <>
      <h3 className='text-lg font-medium text-gray-700'>Cập nhật bình luận</h3>
      <div className='flex border border-solid border-gray-300 rounded pl-1 overflow-hidden w-full mt-2'>
        <input value={valueComment} onChange={(e) => setValueComent(e.target.value)} className='flex-1 outline-none' />
        <div
          className='bg-gray-500 hover:bg-gray-700 text-white cursor-pointer px-1'
          onClick={(e) => handleUpdateComment()}
        >
          Cập nhật
        </div>
      </div>
    </>
  );
};
export default ProductDetail;