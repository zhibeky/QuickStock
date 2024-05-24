import { Menu } from "antd";
import { useState } from "react";
import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e: { key: React.Key }) => {
    setCurrent(e.key.toString());
  };

  return (
    <nav>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{ position: "fixed", width: "100%", zIndex: 1000 }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to="/read-excel" style={{ textDecoration: "none" }}>
            All Data
          </Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/products" style={{ textDecoration: "none" }}>
            Cart
          </Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
};

export default Navbar;
