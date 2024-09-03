import { Avatar, Flex, Dropdown, Space, message } from "antd";
import { FundProjectionScreenOutlined, UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import DataContext from "../context/DataProvider";
import { SetIsModalOpen } from "./SignInModal";
import { SetIsExitModalOpen } from "./SignOutModal";
import { SetIsConfirmCodeModalOpen } from "./ChangePasswordModal";
import emailjs from "@emailjs/browser";

export let confirmCode;

export default function HeaderAvatar() {
  const { registeredUser, assets } = useContext(DataContext);

  console.log(assets);

  function getRandomCode(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const sendEmail = (password) => {
    emailjs
      .send(
        "service_2r0hgnh",
        "template_0kifydt",
        { password: password },
        "CkI46vaGckGr5qf_l"
      )
      .then(
        (result) => {
          message.success("Code has been sent");
        },
        (error) => {
          console.log(error);
        }
      );
  };

  function onClick() {
    SetIsModalOpen(true);
  }
  function onExitClick() {
    SetIsExitModalOpen(true);
  }
  function onChangePasswordClick() {
    SetIsConfirmCodeModalOpen(true);
    confirmCode = getRandomCode(100000, 999999);
    console.log(confirmCode);
    // sendEmail(confirmCode);
  }

  const items = [
    {
      key: "1",
      label: (
        <Flex>
          <a href="#" onClick={onChangePasswordClick}>
            Change password
          </a>
        </Flex>
      ),
    },
    {
      key: "2",
      label: (
        <Flex>
          <a href="#" className="log-out" onClick={onExitClick}>
            Log Out
          </a>
        </Flex>
      ),
    },
  ];

  return (
    <>
      {registeredUser == "Пользователь не зарегестрирован" && (
        <button className="modal-btn" onClick={onClick}>
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
            size={50}
          />
        </button>
      )}
      {registeredUser != "Пользователь не зарегестрирован" && (
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <a>
            <Space>
              <button className="modal-btn">
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                  size={50}
                />
              </button>
            </Space>
          </a>
        </Dropdown>
      )}
    </>
  );
}
