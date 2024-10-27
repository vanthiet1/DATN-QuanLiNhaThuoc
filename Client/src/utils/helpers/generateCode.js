const generateCode = (length = 6, options = { numeric: true, alphabetic: true, uppercase: true }) => {
  const { numeric, alphabetic, uppercase } = options;
  let characters = '';
  let code = '';

  // Chọn ký tự theo các tùy chọn
  if (numeric) {
    characters += '0123456789';
  }

  if (alphabetic) {
    characters += uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'abcdefghijklmnopqrstuvwxyz';
  }

  // Nếu không có ký tự nào được chọn
  if (!characters.length) return null;

  // Tạo mã với chiều dài mong muốn
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return code;
};

export default generateCode;
