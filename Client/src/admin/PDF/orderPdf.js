import { BeVietnamPro } from '../../assets/fonts/BeVietNamPro';
import { getResultStatus } from '../../utils/constant/common';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (orderData, orderDetailsData) => {
  const doc = new jsPDF();

  doc.addFileToVFS('BeVietnamPro-normal.ttf', BeVietnamPro);
  doc.addFont('BeVietnamPro-normal.ttf', 'BeVietnamPro', 'normal');
  doc.setFont('BeVietnamPro');

  // Tiêu đề hóa đơn
  doc.setFontSize(12);
  doc.text('Hóa Đơn', 15, 20);

  // Thông tin công ty
  doc.setFontSize(12);
  doc.text('Bình An Dược', 180, 20, { align: 'right' });
  doc.text('390 Nguyễn Lương Bằng, Quận Liên Chiểu, TP Đà Nẵng', 180, 26, { align: 'right' });

  // Trạng thái đơn hàng
  doc.setFontSize(10);
  doc.text(`Trạng thái: ${getResultStatus(orderData.status)}`, 15, 35);

  // Ngày đặt đơn và số hóa đơn
  doc.text(`Ngày đặt đơn: ${orderData.order_date}`, 15, 45);
  doc.text(`Số hóa đơn: ${orderData._id}`, 15, 50);

  // Thông tin người nhận
  doc.text('Người nhận:', 15, 60);
  doc.text(`Tên: ${orderData.address.receiver}`, 15, 65);
  doc.text(`Địa chỉ: ${orderData.address.address}`, 15, 70);
  doc.text(`SĐT: ${orderData.address.phone}`, 15, 75);
  if (orderData.address.note) {
    doc.text(`Ghi chú: ${orderData.address.note}`, 15, 80);
  }

  // Tạo bảng sản phẩm
  const tableColumns = ['#', 'Sản phẩm', 'Số lượng', 'Giá', 'Tổng'];
  const tableRows = orderDetailsData.map((item, index) => [
    index + 1,
    item.product.name,
    item.quantity,
    `${item.product.price_distcount} VND`,
    `${item.price} VND`
  ]);

  doc.autoTable({
    startY: 90,
    head: [tableColumns],
    body: tableRows,
    theme: 'grid',
    styles: {
      font: 'BeVietnamPro',
      cellPadding: 2, // Khoảng cách trong ô
      fontSize: 10,
      overflow: 'linebreak', // Để tự động xuống dòng
      columnWidth: 'auto' // Tự động điều chỉnh chiều rộng cột
    },
    columnStyles: {
      0: { cellWidth: 10 }, // Cột số thứ tự, rộng 10
      1: { cellWidth: 60 }, // Cột sản phẩm, rộng 60
      2: { cellWidth: 20 }, // Cột số lượng, rộng 20
      3: { cellWidth: 30 }, // Cột giá, rộng 30
      4: { cellWidth: 30 } // Cột tổng
    }
  });

  // Thông tin thanh toán
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.text('Phương thức thanh toán:', 15, finalY);
  doc.text(`${orderData.payment.name}`, 60, finalY);

  doc.text('Tổng số lượng:', 15, finalY + 10);
  doc.text(`${orderData.total_quantity}`, 60, finalY + 10);

  doc.text('Tổng giá:', 15, finalY + 20);
  doc.text(`${orderData.total_price} VND`, 60, finalY + 20);

  // Tải hoặc in file PDF
  doc.save(`hoa_don_${orderData._id}.pdf`);
};
