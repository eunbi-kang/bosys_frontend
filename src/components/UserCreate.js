import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCreateThunk } from "../slice/userSlice";
import { addUser } from "../service/userCreateService";
import { Form, Input, Button, Space, Alert } from "antd";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "ag-grid-community";
import { provideGlobalGridOptions } from 'ag-grid-community';

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy" });

// ✅ 모듈 등록
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function UserCreate() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const users = useMemo(() => (userState?.users ? [...userState.users] : []), [userState]);
  const { loading, error } = useSelector((state) => state.userList || { loading: false, error: null });

  const [form] = Form.useForm();
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    if (gridApi && users.length > 0) {
      gridApi.setRowData(users);
    }
  }, [users, gridApi]);

  const handleSubmit = (values) => {
    const userData = {
      name: values.name,
      email: values.email,
      age: Number(values.age), // ✅ 숫자로 변환
    };

    console.log("📩 서버로 보낼 데이터:", userData);

    dispatch(fetchUserCreateThunk(userData))
      .unwrap()
      .then((response) => {
        console.log("✅ 서버 응답:", response);
        dispatch(addUser(response)); // 서버가 반환한 데이터를 Redux 상태에 반영
        form.resetFields();
      })
      .catch((error) => {
        console.error("🚨 서버 오류 발생:", error);
        alert("사용자 추가 중 오류가 발생했습니다.");
      });
  };

  const columnDefs = [
    { headerName: "이름", field: "name", flex: 1 },
    { headerName: "이메일", field: "email", flex: 1 },
    { headerName: "나이", field: "age", flex: 1 },
  ];
  

  return (
    <>
      <h2>😊👏🎯 사용자 추가 😊👏🎯</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="name" label="이름" rules={[{ required: true, message: "이름을 입력하세요!" }]}> 
          <Input placeholder="이름을 입력하시오" />
        </Form.Item>
        <Form.Item name="email" label="이메일" rules={[{ required: true, message: "이메일을 입력하세요!" }]}> 
          <Input type="email" placeholder="이메일을 입력하시오" />
        </Form.Item>
        <Form.Item name="age" label="나이" rules={[{ required: true, message: "나이를 입력하세요!" }]}> 
          <Input type="number" placeholder="나이를 입력하시오" />
        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" disabled={loading}>
            {loading ? "💬 추가 중..." : "✅ 추가"}
          </Button>
        </Space>
      </Form>

      {error && <Alert message={error} type="error" showIcon />} 
      
      <div className="ag-theme-alpine" style={{ height: 300, width: "100%", marginTop: 20 }}>
        <AgGridReact 
          columnDefs={columnDefs} 
          rowData={users} 
          onGridReady={(params) => setGridApi(params.api)}
        />
      </div>
    </>
  );
}

export default UserCreate;