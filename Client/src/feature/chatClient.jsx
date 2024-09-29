import formatsHelper from '../utils/helpers/formats';
import Button from '../components/ui/button';
const chatClient = ({ staff, userLogin, messages }) => {
  console.log(messages);

  return (
    <div>
      <div className='w-[100%] h-[500px]  bg-[#272729] relative  flex flex-col max-md:w-[100%]'>
        <div className='border-b-[1px] pb-3 mb-5 flex items-center gap-2 p-3'>
          <div className='max-md:w-[100px]'>
            <img
              className='max-md:w-[100%]  w-[70px] rounded-[50px]'
              src='https://res.cloudinary.com/dddz1buyw/image/upload/v1724658353/nhathuoc/products/img0698-1.jpg'
              alt=''
            />
          </div>
          <div>
            <span className='text-[#fff] font-bold block pt-3'>
              {staff?.fullname ? staff?.fullname : 'Bạn cần chọn 1 nhân viên để tư vấn'}
            </span>
            <p className='text-[#fff] max-md:text-[14px]'>Hãy tạo cuộc trò chuyện cùng với những người bạn của bạn</p>
            <div className='flex gap-2 max-sm:flex-col'>
              <button className='mt-2 bg-[#4a4a4a] p-1 w-[200px] rounded-[5px] text-[#fff] hover:bg-[#616161] duration-300 max-md:w-full'>
                Quay lại
              </button>
            </div>
          </div>
        </div>
        <div className='overflow-y-auto overflow-x-hidden scrollbar-thin h-[60%] scroll-hidden p-2 max-md:h'>
          <div className='flex flex-col'>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col mb-2 ${msg.fromUserId === userLogin?._id ? 'items-end' : 'items-start'}`}
              >
                <span className='text-[#fff] pb-1'>{formatsHelper.FormatDateAndTime(msg.timestamp)}</span>
                <div className={`p-3 rounded-lg w-max flex items-center gap-3 text-white max-w-xs break-words`}>
                  <div>
                    <span>{msg?.message}</span>
                    {msg?.productId && msg.productId.images && msg.productId.images.length > 0 && (
                      <>
                        <span>{msg.productId.name}</span>
                        <img src={msg.productId.images[0].url_img} alt={msg.productId.name} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='absolute bottom-0 w-full left-0 p-2'>
          <div className='relative'>
            <input type='text' className='w-full border-2 p-3 bg-[#494949] text-[#fff] rounded-[5px]' />
            <div className='absolute right-[5px] top-[6px]'>
              <Button
                // disabled={true}
                // onClick={}
                // className={`${inputMessage ? 'bg-blue-500 text-[#fff] font-bold' : 'bg-[#dcdcdc]'} w-[100px] p-2 block rounded-[5px]`}
                addClassNames={`bg-blue-500 text-[#fff] font-bold w-[100px] p-2 block rounded-[5px]`}
              >
                Gửi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chatClient;
