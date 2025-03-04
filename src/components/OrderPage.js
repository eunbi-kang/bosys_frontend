import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersThunk, createOrderThunk } from "../slice/orderSlice";
import { Table, Button, Modal, Form, Input, message, DatePicker } from "antd";
import moment from "moment";

const OrderPage = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.orders) || { orders: [], loading: false, error: null };

  const orders = orderState.orders;
  const loading = orderState.loading;
  const error = orderState.error;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // 주문 목록 불러오기
  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  // 주문 추가 함수
  const handleAddOrder = async () => {
    try {
      const values = await form.validateFields();
      console.log("전송할 데이터:", values);

      // 날짜 포맷 변환 (YYYY-MM-DD)
      values.order_date = values.order_date.format("YYYY-MM-DD");

      await dispatch(createOrderThunk(values)).unwrap();

      message.success("주문이 성공적으로 추가되었습니다.");
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("주문 추가 실패:", error);
      message.error(error.message || "주문 추가에 실패했습니다.");
    }
  };

  // 테이블 컬럼 설정
  const columns = [
    {
      title: "주문 ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "주문자",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "도서명",
      dataIndex: "book",
      key: "book",
    },
    {
      title: "수량",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "가격",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()}원`,
    },
    {
      title: "주문 날짜",
      dataIndex: "order_date",
      key: "order_date",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 주문 관리</h1>
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }}>
        주문 추가
      </Button>
      <Table columns={columns} dataSource={orders} loading={loading} rowKey="id" />

      {/* 주문 추가 모달 */}
      <Modal title="새 주문 추가" open={isModalOpen} onOk={handleAddOrder} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="user" label="주문자" rules={[{ required: true, message: "주문자를 입력하세요." }]}>
            <Input placeholder="예: 강은비" />
          </Form.Item>
          <Form.Item name="book" label="도서명" rules={[{ required: true, message: "도서명을 입력하세요." }]}>
            <Input placeholder="예: 클린 코드" />
          </Form.Item>
          <Form.Item name="quantity" label="수량" rules={[{ required: true, message: "수량을 입력하세요." }]}>
            <Input type="number" placeholder="예: 2" />
          </Form.Item>
          <Form.Item name="price" label="가격" rules={[{ required: true, message: "가격을 입력하세요." }]}>
            <Input type="number" placeholder="예: 20000" />
          </Form.Item>
          <Form.Item name="order_date" label="주문 날짜" rules={[{ required: true, message: "주문 날짜를 선택하세요." }]}>
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderPage;
