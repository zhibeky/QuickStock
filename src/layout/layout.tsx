// import { Navbar } from "../components/molecules/Navbar.tsx";
import { NavLink, Outlet } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";

export const RootLayout = () => {
  return (
    // <Flex vertical>
    <div className="root-layout">
      <header>
        <nav>
          <h1>QuickStock</h1>
          <NavLink to="/">Корзина</NavLink>
          <NavLink to="/read-excel">Все продукты</NavLink>
        </nav>
      </header>
      <main className="outlet">
        <Outlet />
      </main>
      <Footer style={{ textAlign: "center" }}>
        Quick Stock ©{new Date().getFullYear()}
      </Footer>
    </div>
    // </Flex>
  );
};
