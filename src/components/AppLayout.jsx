import { Layout, Spin } from "antd";
import HeaderLayout from "./HeaderLayout/HeaderLayout";
import "./AppStyle.css";
import { useContext, useState } from "react";
import DataContext from "../context/DataProvider";
import MainPage from "./MainPage";
import AccountApp from "./AccountApp/AccountApp";

const layoutStyle = {
  overflow: "hidden",
};

export default function AppLayout() {
  const { loading, registeredUser } = useContext(DataContext);
  const [page, setPage] = useState("main");

  if (loading) {
    return <Spin fullscreen="true" size="large"></Spin>;
  }
  if (registeredUser);
  return (
    <Layout className="app-content" style={layoutStyle}>
      <HeaderLayout onClick={(current) => setPage(current)} />
      {page == "main" && <MainPage />}
      {page == "account" && <AccountApp user={registeredUser} />}
    </Layout>
  );
}
