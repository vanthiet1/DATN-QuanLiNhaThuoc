import React from 'react';
import Warning from './components/Warning';
import { Button } from '../../../../components/ui/button';
import { useConfirmDialog } from '../../../../components/dialog/ConfirmDialogContext';
import { useNavigate } from 'react-router-dom';

function AccountRemoval() {
  const confirmDialog = useConfirmDialog();
  const navigate = useNavigate(); 

  const handleDelete = async () => {
    const result = await confirmDialog({
      title: 'Xóa tài khoản',
      message: 'Bạn có chắc chắn muốn xóa tài khoản của mình không?',
      confirmLabel: 'Có, tôi đồng ý',
      cancelLabel: 'Không, giữ lại',
    });

    if (result) {
      console.log('Tài khoản đã được xóa');
    }
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <div>
      <h1 className='text-xl my-4 font-bold'>Khi thực hiện lựa chọn xóa tài khoản</h1>
      <Warning
        title='Tài khoản của bạn sẽ bị xóa vĩnh viễn'
        describe='Tài khoản của bạn sẽ bị xóa sau 30 ngày kể từ thời điểm bạn xác nhận xóa tài khoản nếu không có bất kỳ thao tác đăng nhập lại để sử dụng tài khoản. Xoá tài khoản tại đây đồng nghĩa với việc bạn sẽ không thể truy cập, sử dụng các dịch vụ chung của VegaID gồm Waka, ClipTV, Nhac.vn ..'
      />
      <Warning
        title='Tài khoản xóa sẽ mất vĩnh viễn các nội dung sở hữu'
        describe='Trang cá nhân, tài khoản, ảnh, bình luận, đánh giá sách, tủ sách cá nhân, sách mua lẻ, thời hạn hội viên của bạn sẽ bị mất vĩnh viễn khi tài khoản của bạn được xóa'
      />

      <Warning
        title='Đảm bảo rằng trước khi xóa tài khoản các gói gia hạn Waka đã được hủy'
        describe='Hãy chắc chắn rằng bạn đã hủy các gói đăng ký tự động gia hạn trước thời điểm xóa tài khoản để tránh gói cước được tiếp tục gia hạn. Xem mục “Quản lý đăng ký” trên CHplay và AppStore để kiểm tra thông tin gia hạn của bạn. Bằng việc thực hiện xóa tài khoản là bạn đồng ý với Thỏa thuận sử dụng dịch vụ và hoàn toàn chịu trách nhiệm với hành vi của mình'
      />
      <div className='flex gap-2'>
        <Button
          size="m"
          rounded="l"
          addClassNames="text-[#fff] px-5 py-2 bg-gray-500 opacity-50"
          outline
          onClick={handleCancel} // Gọi hàm quay lại trang trước khi nhấn "Hủy"
        >
          Hủy
        </Button>
        <Button
          size="m"
          rounded="l"
          addClassNames="bg-[#2563EB] text-[#fff] px-5 py-2"
          outline
          onClick={handleDelete}
        >
          Xác nhận xóa
        </Button>
      </div>
    </div>
  );
}

export default AccountRemoval;
