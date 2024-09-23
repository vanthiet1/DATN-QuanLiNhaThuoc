import React, { useState } from 'react';
import { Select } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { CheckBox } from '../../components/ui/checkbox';
import { Dates } from '../../components/ui/date';
import { Table } from '../../components/ui/table';
import { Editor } from '../../components/ui/editor';

const Test = () => {
  const data = [
    {
      id: 1,
      item: "văn thiết1"
    },
    {
      id: 2,
      item: "văn thiết2"
    }
  ]
  const dataOrders = [
    {
      image: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Photos.png",
      client: "John Doe",
      orderId: 12345,
      amount: 150,
      status: "Un-paid",
      dateCreated: "01/01/2024",
    },
    {
      image: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Photos.png",
      client: "Jane Doe",
      orderId: 12346,
      amount: 200,
      status: "Paid",
      dateCreated: "02/01/2024",
    },
    {
      image: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Photos.png",
      client: "Jane Doe",
      orderId: 12346,
      amount: 200,
      status: "Completed",
      dateCreated: "02/01/2024",
    },
  ]
  const titleOrder = [
    "CLIENT",
    "ID",
    "PRICE",
    "STATUS",
    "DATE",
    "ACTION"
  ]
  const titleProduct = [
    "PRODUCT NAME",
    "ID",
    "PRICE",
    "STATUS",
    "DATE",
    "ACTION"
  ]
  //  ngày truyền vào 
  let dateDemo = "2004-11-13"
  const [content, setContent] = useState('')
  const handleGetData = (event, editor) => {
    const data = editor.getData();
    setContent(data)
  }
  console.log(content);
  return (
    <div>

      {/* SELECT */}
      <Select addClassNames={'dark:text-white w-[200px] dark:bg-gray-700'} nameSelected={"Chọn user"} optionData={data} />
      {/*INPUT */}
      <Input />
      {/* CHECKBOX */}
      <CheckBox />
      {/* DATE */}
      <Dates date={dateDemo} />
      {/* TABLE */}
      <Table data={dataOrders} addClassNames={'w-[80%]'} styleRows={"dark:bg-gray-700"} titleRow={titleOrder} />
      {/* EDITOR */}
      <Editor onChange={handleGetData} titleStart={"Bắt đầu với chi tiết sp"} addClassName={"w-[500px] h-max"} />
      <Editor titleStart={"Bắt đầu với soan blog"} addClassName={"w-[500px] h-max"} />
      <p>Text content: {content}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <br />
      <Table data={dataOrders} addClassNames={'w-[50%]'} styleRows={"dark:bg-gray-700"} titleRow={titleProduct} />


    </div>
  );
};

export default Test;