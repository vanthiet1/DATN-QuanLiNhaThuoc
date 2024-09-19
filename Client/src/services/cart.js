// import http from "../utils/http";
// import { showToastError,showToastSuccess } from "../configs/toastConfig";
// const cartServices = {
//      addToCart: async (requestBody)=>{
//         try {
//             const {data} =  await http.get('/cart/',requestBody)
//             console.log(data);
//             return data
//         } catch (error) {
//             console.log(error.message);     
//         }
//      },
//      getCartByUserId: async ()=>{
//         try {
//              const {data} =  await http.get(`/cart/66e01288685b2acb7f3d1a79`)
//              console.log(data);
//              return data
//         } catch (error) {
//             console.log(error.message);     
//         }
//      },
//       deleteCartByUserId: async (requestParams)=>{
//         try {
//             const {data} =  await http.delete(`/cart/${requestParams}`)
//             console.log(data);
//             return data
//         } catch (error) {
//          console.log(error.message);
//         }
//      },
//      deleteProductCartByUserId: async (requestParams)=>{
//         try {
//             const {data} =  await http.delete(`/cart/product/${requestParams}`)
//             console.log(data);
//             return data
//         } catch (error) {
//             console.log(error.message);     
//         }
//      }
// }
// export default cartServices