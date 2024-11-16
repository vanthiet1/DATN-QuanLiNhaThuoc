const dotenv = require('dotenv');
dotenv.config();

const webhookController = {
    handleWebhook: (req, res) => {
      const receivedSecretKey = req.headers['x-webhook-secret'];
      const expectedSecretKey = process.env.WEBHOOK_SECRET_KEY;
  
      // Xác thực Secret Key
      if (receivedSecretKey !== expectedSecretKey) {
        return res.status(403).json({ message: 'Forbidden: Invalid Secret Key' });
      }
  
      // Dữ liệu ảo để demo
      const demoData = {
        transactionId: "demo-123456",
        status: "success",
        amount: 500000, // 500,000 VND
        balance: 10000000, // 10,000,000 VND
        description: "Demo payment for order #demo123"
      };
  
      // Nhận dữ liệu (sử dụng demoData thay vì req.body)
      const { transactionId, status, amount, balance, description } = demoData;
  
      // Kiểm tra và log dữ liệu
      console.log("Received Webhook Data (Demo):", { transactionId, status, amount, balance, description });
  
      // Xử lý giao dịch thành công
      if (status === "success") {
        console.log(`Transaction ${transactionId} succeeded.`);
        if (balance !== undefined) {
          console.log(`Current balance: ${balance}`);
        }
        // Thực hiện hành động giả lập (ví dụ: log trạng thái đơn hàng)
        console.log("Đơn hàng đã được cập nhật trạng thái thành công.");
      }
  
      // Phản hồi thành công
      res.status(200).json({ message: "Webhook processed successfully (Demo)." });
    }
  };
  
  module.exports = webhookController;
  