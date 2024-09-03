import { Button, Form, Input, Modal, Typography } from "antd";
import { useContext, useState } from "react";
import { useForm } from "antd/es/form/Form";
import DataContext from "../context/DataProvider";
import { db } from "../database/database";

export let SetIsRegModalOpen;

export default function SignUpModal() {
  const { assets, SignUp } = useContext(DataContext);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [regForm] = useForm();

  SetIsRegModalOpen = setIsRegModalOpen;

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const regHandleOk = () => {
    setIsRegModalOpen(false);
  };

  const regHandleCancel = () => {
    setIsRegModalOpen(false);
  };
  async function addUserToBD(data) {
    await db.users.add({ name: data.username, password: data.password });
  }
  function regOnFinish(values) {
    console.log(values);
    addUserToBD(values);
    SignUp(values);
    setIsRegModalOpen(false);
    regForm.resetFields();
  }

  return (
    <Modal
      title={<Typography.Title>Регистрация</Typography.Title>}
      open={isRegModalOpen}
      onOk={regHandleOk}
      onCancel={regHandleCancel}
      footer={null}
    >
      <Form
        form={regForm}
        wrapperCol={{
          span: 20,
        }}
        onFinish={regOnFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            () => ({
              validator(_, value) {
                const confimation = assets.find((user) => user.name == value);
                if (!confimation) return Promise.resolve();
                return Promise.reject(new Error("Username taken"));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password id="passwordInput" />
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
          <Input.Password id="repeatPassword" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submitt">
            Зарегестрироваться
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
