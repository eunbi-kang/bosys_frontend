import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ 주문 목록 가져오기 Thunk
export const fetchOrdersThunk = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8080/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "서버 요청 실패");
    }
  }
);

// ✅ 주문 추가 Thunk
export const createOrderThunk = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8080/orders", orderData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "서버 요청 실패");
    }
  }
);

// ✅ 주문 삭제 Thunk
export const deleteOrderThunk = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8080/orders/${orderId}`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "서버 요청 실패");
    }
  }
);

// ✅ 주문 Slice 생성
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ 리듀서 내보내기
export default orderSlice.reducer;
