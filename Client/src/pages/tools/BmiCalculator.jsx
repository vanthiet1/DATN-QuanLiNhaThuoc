import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import useScrollTop from '../../hooks/useSrcollTop';
import BmiImage from '../../assets/images/bmi/bmi-img.png';
import WomanImage from '../../assets/images/bmi/woman.png';
import MenImage from '../../assets/images/bmi/men.png';
import { Button } from '../../components/ui/button/index';
import bmiPercentiles from "./BmiPercentiles";
import infoImage from '../../assets/images/bmi/info.png';
import formBMISchema from "../../utils/validations/formBMI";
import calculationBmiImage from '../../assets/images/bmi/cong_thuc_tinh_bmi.png'
import bmiGirl from '../../assets/images/bmi/bmifa_girls.png'
import bmiBoy from '../../assets/images/bmi/bmi_boy.png'
import useSrcollTop from "../../hooks/useSrcollTop";
const BmiCalculator = () => {
  useSrcollTop()
  const [gender, setGender] = useState('male');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(formBMISchema.BMI),
  });

  const onSubmit = (data) => {
    const { weight, height, date, month, year } = data;
    const heightInMeters = height / 100;
    const calculatedBMI = weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBMI.toFixed(2));

    const birthDate = new Date(year, month - 1, date);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthDate.getFullYear();

    setMessage(age >= 19 ? getAdultBmiMessage(calculatedBMI) : getChildBmiMessage(calculatedBMI, gender, age));
  };

  const getAdultBmiMessage = (calculatedBMI) => {
    if (calculatedBMI < 18.5) return 'Thiếu cân';
    if (calculatedBMI < 23) return 'Bình thường';
    if (calculatedBMI < 25) return 'Thừa cân';
    if (calculatedBMI < 30) return 'Béo phì độ 1';
    return 'Béo phì độ 2';
  };

  const getChildBmiMessage = (calculatedBMI, gender, age) => {
    const percentiles = bmiPercentiles[gender][age];
    if (!percentiles) return 'Không có dữ liệu phù hợp cho độ tuổi này.';
    if (calculatedBMI < percentiles.underweight) return 'Thiếu cân so với tuổi.';
    if (calculatedBMI < percentiles.normal) return 'Cân nặng bình thường so với tuổi.';
    if (calculatedBMI < percentiles.overweight) return 'Thừa cân so với tuổi.';
    return 'Béo phì so với tuổi.';
  };

  return (
    <div>
      <div className="flex">
        <div className="bg-[#DEF6FB] p-5">
          <h1 className="block font-bold text-[#2563eb] text-[24px]">Tính chỉ số BMI của cơ thể</h1>
          <p className="text-[16px] block">Sử dụng công cụ này để kiểm tra chỉ số khối cơ thể (BMI) để biết bạn có đang ở mức cân nặng hợp lý hay không</p>
          <p>Thông tin được kiểm chứng bởi <span className="text-blue-400">Bác sĩ Trương Vĩnh Thái</span></p>
          <img className="w-full" src={BmiImage} alt="BMI Calculator" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 w-full">
          <h2 className="text-center font-bold text-[24px]">Tính chỉ số BMI</h2>
          <p className="text-[#888080] text-center">Sử dụng cho trẻ em từ 0-18 tuổi và người lớn</p>

          <div className="pt-4">
            <label className="block font-bold text-[20px]">Chọn giới tính *</label>
            <p className="text-[#888080]">Giới tính của bạn sẽ giúp chúng tôi tính toán được chính xác về chỉ số</p>
            <div className="flex gap-5 items-center justify-center pt-4">
              <button type="button" onClick={() => setGender('male')} className={`flex rounded-[7px] items-center gap-3 border p-2 w-full justify-center ${gender === 'male' ? 'border border-[#2563eb]' : ''}`}>
                <img className="w-[30px]" src={MenImage} alt="Nam" />
                Nam
              </button>
              <button type="button" onClick={() => setGender('female')} className={`flex rounded-[7px] items-center gap-3 border p-2 w-full justify-center ${gender === 'female' ? 'border border-[#2563eb]' : ''}`}>
                <img className="w-[30px]" src={WomanImage} alt="Nữ" />
                Nữ
              </button>
            </div>
          </div>

          <div className="pt-4">
            <label className="block font-bold text-[17px]">Chiều cao của bạn (cm) *</label>
            <input {...register('height')} type="number" className="border border-slate-300 rounded-[5px] p-2 w-full outline-none" />
            {errors.height && <p className="text-red-500">{errors.height.message}</p>}
          </div>

          <div className="pb-5 pt-4">
            <label className="block font-bold text-[17px]">Cân nặng của bạn (kg) *</label>
            <input {...register('weight')} type="number" className="border border-slate-300 rounded-[5px] p-2 w-full outline-none" />
            {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}
          </div>

          <div>
            <h3 className="font-bold text-[17px]">Kết quả nâng cao cho bạn dưới 19 tuổi</h3>
            <p className="text-[#7c7c86]">Vui lòng nhập ngày sinh của bạn nhé bởi vì chỉ sai lệnh 1 hoặc 2 tháng tuổi cũng có thể ảnh hưởng lớn đến kết quả tính toán</p>
            <div className="flex gap-3 pt-3">
              <input   {...register('date')} type="number" placeholder="Ngày" className="border border-slate-300 p-2 rounded-[5px]" />
              <input  {...register('month')} type="number" placeholder="Tháng" className="border border-slate-300 p-2 rounded-[5px]" />
              <input    {...register('year')} type="number" placeholder="Năm" className="border border-slate-300 p-2 rounded-[5px]" />
            </div>

            <div className="flex justify-center pt-5">
              <Button addClassNames="text-[16px] bg-[#2563EB] p-3 text-[#fff] rounded-[5px] w-[300px] flex justify-center font-semibold">
                Tính chỉ số ngay
              </Button>
            </div>

            <div className="flex gap-2 items-center pt-5">
              <img src={infoImage} alt="Thông tin" />
              <span>Công cụ này chỉ mang tính chất tham khảo. Nếu bạn có các vấn đề về sức khỏe cần tư vấn hãy liên hệ kết nối với các bác sĩ của chúng tôi qua ứng dụng Medigo.</span>
            </div>
          </div>

          {bmi && (
            <div className=" p-4 mt-5 rounded-md ">
              <h3 className="font-bold text-[24px]">Kết quả:</h3>
              <p className="text-lg">{`Chỉ số BMI của bạn là: ${bmi}`}</p>
              <p className="text-lg">{message}</p>
            </div>
          )}
        </form>
      </div>
      <div>
        <div>
          <h1 className="text-[20px] font-semibold text-center">Thông tin về chỉ số BMI</h1>
          <div className="w-[70%] m-auto">
            <p className="max-w-[900px]"> <b>BMI </b>là một thuật ngữ không còn quá xa lạ hiện nay, đặc biệt với những người luôn quan tâm đến sức khỏe. Trong thời đại lối sống sinh hoạt không qua học khiến cho nhiều người dần trở nên béo phì, mất dần kiểm soát cân nặng dẫn đến nguy cơ gặp nhiều căn bệnh khác nhau. Vậy BMI là gì, nó đóng vai trò quan trọng như thế nào trong vấn đề này?</p>
            <p className="text-[17px] font-semibold pt-2">
              BMI là gì?
            </p>
            <p className="pt-2">
              BMI là tên viết tắt của khái niệm Body Mass Index - Chỉ số cơ thể, một thước đo dựa vào chiều cao và cân nặng cơ thể để xác định độ gầy hoặc béo, giúp định lượng được khối lượng mô của cơ thể. BMI đang dần trở nên rộng rãi hơn như một chỉ số để đánh giá trọng lượng cơ thể khỏe mạnh so với chiều cao.
            </p>
            <p>
              Phụ thuộc vào kết quả thu được từ phép tính BMI, người ta có thể phân loại được người có cân nặng bình thường, thiếu cân, thừa cân. Việc thừa cân, béo phì hay thiếu cân có thể làm ảnh hưởng đến sức khỏe, do vậy việc biết BMI của mình giúp cho bạn biết được tình trạng của bản thân và có được các xử trí cho phù hợp.
            </p>
            <span className="block font-semibold pt-3 text-[17px]">Cách tính chỉ số BMI theo WHO</span>
            <span className="block">Công thức tính BMI được WHO thống nhất sử dụng ở nhiều quốc gia:</span>
            <div className="w-[50%] m-auto">
              <img src={calculationBmiImage} alt="" />
            </div>
            <div>
              <p className="pb-3">Dựa vào kết quả tính được so với bảng phân loại gầy, trung bình, thừa cân ở người lớn để biết được bản thân đang thuộc trạng thái nào:</p>
              <figure class="table ">
                <table class="min-w-full border-collapse border border-gray-800">
                  <thead>
                    <tr>
                      <th class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">
                            <strong>Phân loại</strong>
                          </span>
                        </p>
                      </th>
                      <th class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">
                            <strong>Khoảng BMI (kg/m2)</strong>
                          </span>
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">Gầy nghiêm trọng</span>
                        </p>
                      </td>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">&lt; 16</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">Gầy trung bình</span>
                        </p>
                      </td>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">16 - 17</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">Gầy nhẹ</span>
                        </p>
                      </td>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">17 - 18,5</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black"><strong>Bình thường</strong></span>
                        </p>
                      </td>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black"><strong>18,5 - 25</strong></span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">Thừa cân</span>
                        </p>
                      </td>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">25 - 30</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">Béo phì loại I</span>
                        </p>
                      </td>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">30 - 35</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">Béo phì loại II</span>
                        </p>
                      </td>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">35 - 40</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">Béo phì loại III</span>
                        </p>
                      </td>
                      <td class="border border-gray-800 p-2">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">&gt; 40</span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </figure>
              <p className="pt-2"><i>Bảng phân loại BMI ở người lớn của WHO phù hợp cho dân số châu Âu hơn là người Việt Nam, châu Á</i></p>
              <span className="font-semibold text-[20px]">Công thức tính chỉ số BMI cho người Việt Nam</span>
              <p className="py-2">
                Công thức tính chỉ số cân nặng cho người Việt Nam nói riêng và người châu Á nói chung cũng được tính bằng công thức chung của WHO. Tuy nhiên với đặc điểm người châu Á nhỏ con, nên bảng đánh giá tiêu chuẩn tình trạng thiếu cân, thừa cân, béo phì có khác biệt một chút so với bản quốc tế. Cụ thể như sau:
              </p>
              <figure>
                <table class="border border-black">
                  <thead>
                    <tr>
                      <th class="border border-black p-2 align-top">
                        <p class="text-justify">
                          <span class="bg-transparent text-black font-bold">Phân loại</span>
                        </p>
                      </th>
                      <th class="border border-black p-2 align-top">
                        <p class="text-justify">
                          <span class="bg-transparent text-black font-bold">Khoảng BMI (kg/m2)</span>
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-black p-2 align-top">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">Thiếu cân</span>
                        </p>
                      </td>
                      <td class="border border-black p-2 align-top">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">&lt; 18,5</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-black p-2 align-top">
                        <p class="text-justify">
                          <span class="bg-transparent text-black font-bold">Bình thường</span>
                        </p>
                      </td>
                      <td class="border border-black p-2 align-top">
                        <p class="text-justify">
                          <span class="bg-transparent text-black font-bold">18,5 - 22,9</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-black p-2 align-top">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">Thừa cân</span>
                        </p>
                      </td>
                      <td class="border border-black p-2 align-top">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">23,0 - 24,9</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-black p-2 align-top">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">Béo phì độ I</span>
                        </p>
                      </td>
                      <td class="border border-black p-2 align-top">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">25,0 - 29,9</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-black p-2 align-top">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">Béo phì độ II</span>
                        </p>
                      </td>
                      <td class="border border-black p-2 align-top">
                        <p class="text-justify">
                          <span class="bg-transparent text-black">&gt; 30,0</span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </figure>
              <p className="pt-4"><i>Người châu Á và người Việt Nam nên sử dụng bảng trên để đánh giá tình trạng cân nặng phù hợp hơn với thực tế</i></p>
              <p className="py-2">
                Công thức tính BMI nói trên được áp dụng cho cả nam và nữ trên 19 tuổi, không phân biệt chủng tộc hay vùng miền. Chỉ số này không nên dùng để đánh giá tình trạng cân nặng ở phụ nữ có thai, vận động viên tập thể hình. <b> Công cụ tính BMI online</b> sử dụng hệ thống phân loại BMI phù hợp với người Việt để đưa ra kết luận.
              </p>
              <div className="flex items-center py-2">
                <span>Tìm hiểu thêm: <a href="">Chỉ số BMI bao nhiêu là bình thường?</a> </span>
              </div>
              <span className="text-[20px]"><b>Chỉ số BMI cho trẻ</b></span>
              <p className="pt-2">Tuy sử dụng chung công thức, chỉ số BMI ở trẻ và người lớn là khác nhau. Bởi vì tùy thuộc vào độ tuổi và giới tính thì lượng chất béo giữa các trẻ là khác nhau.</p>
              <p className="pt-2">Theo Tổ chức Y tế Thế giới (World Health Organization - WHO), phân loại tình trạng cân nặng của trẻ dựa vào biểu đồ liên quan giữa tuổi và chỉ số BMI:</p>
              <div className=" w-[50%] m-auto ">
                <img className="w-full" src={bmiGirl} alt="" />
                <span><i>Biểu đồ phân loại BMI theo tuổi từ 5 - 19 tuổi cho bé gái theo z-scores (Nguồn: WHO)</i></span>
              </div>
              <div className=" w-[50%] m-auto ">
                <img className="w-full" src={bmiBoy} alt="" />
                <span><i>Biểu đồ phân loại BMI theo tuổi từ 5 - 19 tuổi cho bé trai theo z-scores (Nguồn: WHO)</i></span>
              </div>
              <p className="py-3">
                Theo đó, khoảng BMI tính theo z-scores dùng để phân loại dựa vào các khoảng chênh lệch độ lệch chuẩn (Standard Deviation - SD) so với BMI trung bình như sau:
              </p>
              <figure>
                <table class="border border-black">
                  <thead>
                    <tr>
                      <th class="border border-black p-2 align-top">
                        <p class="text-justify font-bold text-black">Phân loại</p>
                      </th>
                      <th class="border border-black p-2 align-top">
                        <p class="text-justify font-bold text-black">BMI theo z-scores</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-black p-2 align-top text-justify text-black">Suy dinh dưỡng</td>
                      <td class="border border-black p-2 align-top text-justify text-black">&lt; -3 SD</td>
                    </tr>
                    <tr>
                      <td class="border border-black p-2 align-top text-justify text-black">Thiếu cân</td>
                      <td class="border border-black p-2 align-top text-justify text-black">&lt; -2 SD</td>
                    </tr>
                    <tr>
                      <td class="border border-black p-2 align-top text-justify font-bold text-black">Bình thường</td>
                      <td class="border border-black p-2 align-top text-justify font-bold text-black">-2 SD – 1 SD</td>
                    </tr>
                    <tr>
                      <td class="border border-black p-2 align-top text-justify text-black">Thừa cân</td>
                      <td class="border border-black p-2 align-top text-justify text-black">&gt; 1 SD</td>
                    </tr>
                    <tr>
                      <td class="border border-black p-2 align-top text-justify text-black">Béo phì</td>
                      <td class="border border-black p-2 align-top text-justify text-black">&gt; 2 SD</td>
                    </tr>
                  </tbody>
                </table>
              </figure>
              <p className="py-3">
                Để tính chính xác BMI cho trẻ, ba mẹ cần xác định đúng tuổi của bé để tra cứu kết quả phù hợp. Ngoài ra, đối với trẻ dưới 2 tuổi, ba mẹ nên biết những lưu ý trong hướng dẫn cách đo chiều cao và cân nặng cho trẻ chính xác nhất tại nhà do WHO công bố. <b> Công cụ tính BMI online trẻ em</b> dựa vào ngày sinh để đưa ra kết luận về BMI theo đúng độ tuổi của bé.
              </p>
              <div>
                <span><b>Nguồn tham khảo:</b></span>
                 <div className="pl-5">
                   <div className="flex items-center py-2">
                      <a className="text-[#007BFF]" href="https://www.who.int/tools/growth-reference-data-for-5to19-years/indicators/bmi-for-age">BMI-for-age (5-19 year old)</a>
                      <span>- Tổ chức Y tế Thế giới (WHO)</span>
                   </div>
                   <div className="flex items-center py-2">
                      <a className="text-[#007BFF]" href="https://syt.quangngai.gov.vn/documents/317390/1015083/0_20221024104100.pdf/d93be08b-7cf6-45ed-8663-ad503754f613">Hướng dẫn chẩn đoán và điều trị bệnh béo phì</a>
                      <span>- Sở Y tế tỉnh Quảng Ngãi</span>
                   </div>
                   <div className="flex items-center py-2">
                      <a className="text-[#007BFF]" href="https://www.health.harvard.edu/blog/how-useful-is-the-body-mass-index-bmi-201603309339">How useful is the body mass index (BMI)</a>
                      <span>- Harvard Health Publishing</span>
                   </div>
                   <div className="flex items-center py-2">
                      <a className="text-[#007BFF]" href="https://www.ncbi.nlm.nih.gov/books/NBK541070/"> BMI Classification Percentile And Cut Off Points</a>
                      <span>- BMI Classification Percentile And Cut Off Points</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator;
