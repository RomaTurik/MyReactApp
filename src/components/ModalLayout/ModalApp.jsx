import { Flex } from "antd";

import "./ModalStyle.css";
import SignInModal from "../SignInModal";
import SignUpModal from "../SignUpModal";
import SignOutModal from "../SignOutModal";
import HeaderAvatar from "../HeaderAvatar";
import ChangePasswordModal from "../ChangePasswordModal";

export default function ModalApp({ onClickPage }) {
  return (
    <Flex>
      <HeaderAvatar />
      <SignInModal onClickPage={onClickPage}></SignInModal>
      <SignUpModal></SignUpModal>
      <SignOutModal onClickPage={onClickPage}></SignOutModal>
      <ChangePasswordModal></ChangePasswordModal>
    </Flex>
  );
}
