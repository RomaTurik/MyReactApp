import img from "../../assets/react.svg";
import { Layout, Flex, Breadcrumb } from "antd";
import "./HeaderLayout.css";
import ModalApp from "../ModalApp";

const { Header } = Layout;

const headerStyle = {
  textAlign: "center",
  width: "100%",
  maxWidth: 1440,
  margin: "0 auto 40px auto ",
  padding: 0,
  height: 70,
  background: "#F5F5F5",
};

export default function HeaderLayout({ onClick }) {
  return (
    <Header style={headerStyle}>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <img style={{ height: 50 }} src={img} />
          <h2>React</h2>
        </Flex>
        <Flex align="center">
          <Breadcrumb
            style={{ marginRight: 50 }}
            items={[
              {
                title: (
                  <button className="nav-btn" onClick={() => onClick("main")}>
                    Home
                  </button>
                ),
              },
              {
                title: (
                  <button
                    className="nav-btn"
                    onClick={() => onClick("account")}
                  >
                    Account
                  </button>
                ),
              },
            ]}
          />
          <ModalApp onClickPage={onClick} />
        </Flex>
      </Flex>
    </Header>
  );
}
