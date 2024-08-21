const converStringToSlug = (str) => {
  return String(str)
    .normalize('NFKD')
    .replace(/đ/g, 'd')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

module.exports = {
  converStringToSlug
};
