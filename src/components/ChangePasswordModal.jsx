import { Modal, Flex, Form, Input, Button, InputNumber, message } from "antd";

import { useContext, useState } from "react";
import DataContext from "../context/DataProvider";
import { useForm } from "antd/es/form/Form";
import { confirmCode } from "./HeaderAvatar";
import { db } from "../database/database";

export let SetIsConfirmCodeModalOpen;

export default function ChangePasswordModal() {
  const { ChangePasswordAssets, registeredUser } = useContext(DataContext);
  const [isChangePassowrdModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isConfirmCodeModalOpen, setIsConfirmCodeModalOpen] = useState(false);
  const [confirmForm] = useForm();
  const [changeForm] = useForm();

  SetIsConfirmCodeModalOpen = setIsConfirmCodeModalOpen;

  // change password modal

  function ChangePasswordHandleCancel() {
    setIsChangePasswordModalOpen(false);
    confirmForm.resetFields();
    changeForm.resetFields();
  }

  function onClick() {
    setIsChangePasswordModalOpen(true);
  }

  async function onChangePasswordFinish(values) {
    ChangePasswordAssets(values.password);
    const user = await db.users.where("name").equals(registeredUser).toArray();
    await db.users.update(user[0].id, { password: values.password });
    console.log(user);
    setIsChangePasswordModalOpen(false);
    changeForm.resetFields();
    confirmForm.resetFields();
  }
  // change password modal

  // Confrim code modal

  const ConfirmCodeHandleCancel = () => {
    setIsConfirmCodeModalOpen(false);
    confirmForm.resetFields();
  };
  function onConfrimFinish() {
    setIsConfirmCodeModalOpen(false);
    confirmForm.resetFields();
  }
  function handleSubmit() {
    confirmForm
      .validateFields()
      .then((values) => {
        console.log(confirmCode);
        if (values.code == confirmCode) {
          onConfrimFinish();
          onClick();
        } else {
          message.error("Validation failed. Please try again.");
        }
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  }

  // Confrim code modal

  return (
    <>
      <Modal
        title="Введите код для изменения пароля. Код выслан на почту"
        open={isConfirmCodeModalOpen}
        footer={null}
        onCancel={ConfirmCodeHandleCancel}
      >
        <Form
          form={confirmForm}
          wrapperCol={{
            span: 8,
          }}
          autoComplete="off"
          style={{ marginTop: 25 }}
        >
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "Please enter code",
              },
            ]}
          >
            <Input maxLength={6} onChange={() => console.log(confirmCode)} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submitt" onClick={handleSubmit}>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Введите код для изменения пароля. Код выслан на почту"
        open={isChangePassowrdModalOpen}
        footer={null}
        onCancel={ChangePasswordHandleCancel}
      >
        <Form
          form={changeForm}
          wrapperCol={{
            span: 20,
          }}
          onFinish={onChangePasswordFinish}
          autoComplete="off"
        >
          <Form.Item
            style={{ marginTop: 30 }}
            label="New password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submitt">
              Изменить пороль
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
