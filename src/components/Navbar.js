import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";



const items = [
  {
    key:"home",
    label: <Link to ="/">홈</Link>
  },
  {
    key: "users",
    label: <Link to ="/users">회원관리</Link>
  },
  {
    key: "books",
    label: <Link to ="/book">도서관리</Link>
  },
  {
    key: "orders",
    label: <Link to ="/orders">주문관리</Link>
  },
]

const Navbar = () => {
  return <Menu mode="horizontal" items={items} />;
};

export default Navbar;
