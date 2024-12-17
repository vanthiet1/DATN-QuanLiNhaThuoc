const { format, startOfDay, endOfDay } = require('date-fns');
const OrderModel = require('../../models/ordersModels/order');
const OrderDetailsModel = require('../../models/orderDetailsModel/orderDetails');

const ReportContoller = {
  overallReport: async (req, res) => {
    try {
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      const timeStartOfDate = startOfDay(formattedDate);
      const timeEndOfDate = endOfDay(formattedDate);

      const currentOrderDate = await OrderModel.find({
        order_date: { $gte: timeStartOfDate, $lt: timeEndOfDate }
      });

      const orderObj = {};
      const statusMap = {
        1: 'pending',
        2: 'processing',
        3: 'delivered',
        4: 'success',
        5: 'abort'
      };

      const handleReturnOrder = (order) => {
        const statusKey = statusMap[order.status];
        if (statusKey) {
          orderObj[statusKey] = (orderObj[statusKey] || 0) + 1;
        }
        return orderObj;
      };

      for (let i = 0; i < currentOrderDate.length; i++) {
        handleReturnOrder(currentOrderDate[i]);
      }

      const currentDateOrder = [
        {
          title: 'Đơn hàng hôm nay',
          quantity: currentOrderDate.length || 0,
          iconName: 'OderIcon'
        },
        {
          title: 'Đang xử lý',
          quantity: orderObj.pending || 0,
          iconName: 'TimeIcon'
        },
        {
          title: 'Đã xác nhận',
          quantity: orderObj.processing || 0,
          iconName: 'HeartIcon'
        },
        {
          title: 'Đang giao',
          quantity: orderObj.delivered || 0,
          iconName: 'ProductIcon'
        },
        {
          title: 'Hoàn thành',
          quantity: orderObj.success || 0,
          iconName: 'CkeckIcon'
        },
        {
          title: 'Bị hủy',
          quantity: orderObj.abort || 0,
          iconName: 'TrashBinIcon'
        }
      ];

      if (currentOrderDate.length > 0) {
        const totalPriceCurrentDate = currentOrderDate.reduce((init, currentValue) => {
          return (init += currentValue.total_price);
        }, 0);
        console.log(totalPriceCurrentDate);
        return res.status(200).json({ currentDateOrder, totalPriceCurrentDate });
      }
      return res.status(200).json({ currentDateOrder });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getMonthlyRevenue: async (req, res) => {
    try {
      // Nhóm đơn hàng theo tháng và tính tổng doanh thu
      const monthlyRevenue = await OrderDetailsModel.aggregate([
        {
          $group: {
            _id: { $month: '$createdAt' }, // Nhóm theo tháng từ trường `createdAt`
            totalRevenue: { $sum: { $multiply: ['$price', '$quantity'] } } // Tính tổng giá trị
          }
        },
        { $sort: { _id: 1 } } // Sắp xếp theo tháng
      ]);

      // Tạo nhãn tháng (từ 1 đến 12)
      const labels = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);
      const revenueData = new Array(12).fill(0);

      monthlyRevenue.forEach(({ _id, totalRevenue }) => {
        revenueData[_id - 1] = totalRevenue;
      });

      res.status(200).json({ labels, revenueData });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching monthly revenue', error });
    }
  },
  getTopSellingProducts: async (req, res) => {
    try {
      const topProducts = await OrderDetailsModel.aggregate([
        {
          $group: {
            _id: '$product_id',
            totalQuantity: { $sum: '$quantity' }
          }
        },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'products'
          }
        },
        { $unwind: '$products' },
        {
          $project: {
            productName: '$products.name',
            totalQuantity: 1
          }
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 5 }
      ]);
      return res.status(200).json({ topProducts });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching top products', error });
    }
  }
};

module.exports = ReportContoller;
