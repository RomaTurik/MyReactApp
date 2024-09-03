import { Modal, Flex } from "antd";

import { useContext, useState } from "react";
import DataContext from "../context/DataProvider";

export let SetIsExitModalOpen;

export default function SignOutModal({ onClickPage }) {
  const { LogOut } = useContext(DataContext);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  SetIsExitModalOpen = setIsExitModalOpen;

  const exitHandleOk = () => {
    LogOut();
    onClickPage("main");
    setIsExitModalOpen(false);
  };

  const exitHandleCancel = () => {
    setIsExitModalOpen(false);
  };

  return (
    <Modal
      title="Вы точно хотите выйти из аккаунта?"
      open={isExitModalOpen}
      onOk={exitHandleOk}
      onCancel={exitHandleCancel}
    ></Modal>
  );
}
