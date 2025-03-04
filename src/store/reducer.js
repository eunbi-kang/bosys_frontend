// Redux Store Configuration (store.js)
import { configureStore } from "@reduxjs/toolkit";
import userList from "../service/userCreateService";
import orderReducer from "../slice/orderSlice";  // ✅ 파일명과 변수명을 일관되게 수정



const reducer = configureStore({
  reducer: {
    userList,
    orders: orderReducer,  // ✅ state.orders로 접근 가능
  },
});

export default reducer;
