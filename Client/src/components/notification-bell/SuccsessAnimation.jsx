import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SuccessAnimation = ({ onAnimationComplete }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={onAnimationComplete} 
      className="fixed inset-0 flex items-center justify-center bg-[#fff] z-50"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-full bg-green-500 p-4 mb-4 flex items-center justify-center"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-12 h-12"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </motion.svg>
        </motion.div>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-green-600"
        >
          Giao dịch thành công!
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mt-2 text-center"
        >
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. <br />
          Giao dịch đã được xác nhận.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SuccessAnimation;
