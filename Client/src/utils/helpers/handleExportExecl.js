import { utils, writeFileXLSX } from 'xlsx';

export const handleExportExecl = (data, nameFile, tableElement) => {
  if (tableElement) {
    const wb = utils.table_to_book(tableElement, { sheet: 'Table Data' });
    writeFileXLSX(wb, `${nameFile ? nameFile : `binh-an-duoc-${Date.now()}`}.xlsx`);
  } else {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();

    utils.book_append_sheet(wb, ws, `data`);

    writeFileXLSX(wb, `${nameFile ? nameFile : `binh-an-duoc-${Date.now()}`}.xlsx`);
  }
};

export const handleExportExeclWithTableAdmin = (tableElement, nameFile) => {
  const headers = Array.from(tableElement.querySelectorAll('thead th'))
    .slice(0, -1)
    .map((th) => th.innerText);

  const rows = Array.from(tableElement.querySelectorAll('tbody tr')).map((row) =>
    Array.from(row.querySelectorAll('td'))
      .slice(0, -1) // Loại bỏ cột cuối
      .map((cell) => {
        // Kiểm tra và lấy text từ `select` nếu có
        const selectElement = cell.querySelector('select');
        if (selectElement) {
          // Lấy text của option đang chọn trong `select`
          return selectElement.options[selectElement.selectedIndex].innerText;
        } else {
          // Lấy text của ô nếu không có `select`
          return cell.innerText;
        }
      })
  );

  const formattedData = [headers, ...rows];

  const ws = utils.aoa_to_sheet(formattedData);
  const wb = utils.book_new();

  utils.book_append_sheet(wb, ws, 'Table Data');

  writeFileXLSX(wb, `${nameFile || `binh-an-duoc-${Date.now()}`}.xlsx`);
};
