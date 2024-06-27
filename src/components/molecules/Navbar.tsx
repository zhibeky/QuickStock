import { Menu } from "antd";
import { useState, Key } from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e: { key: Key }) => {
    setCurrent(e.key.toString());
  };

  return (
    <nav>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{ width: "100%", zIndex: 1000 }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/" style={{ textDecoration: "none" }}>
            Главная
          </Link>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to="/read-excel" style={{ textDecoration: "none" }}>
            Все товары
          </Link>
        </Menu.Item>
        {/*<Menu.Item key="settings" icon={<SettingOutlined />}>*/}
        {/*  <Link to="/products" style={{ textDecoration: "none" }}>*/}
        {/*    Корзина*/}
        {/*  </Link>*/}
        {/*</Menu.Item>*/}
      </Menu>
    </nav>
  );
};
