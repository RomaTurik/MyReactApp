import { useForm } from "antd/es/form/Form";
import { useContext, useState } from "react";
import { Button, Form, Input, Modal, Typography, Flex } from "antd";
import DataContext from "../context/DataProvider";
import { SetIsRegModalOpen } from "./SignUpModal";

export let SetIsModalOpen;

export default function SignInModal({ onClickPage }) {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { assets, SignIn } = useContext(DataContext);

  SetIsModalOpen = setIsModalOpen;

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log(values);
    const user = assets.find((user) => user.name == values.username);
    if (user && user.password == values.password) {
      SignIn(user.name);
      setIsModalOpen(false);
      onClickPage("account");
    }
    form.resetFields();
  };
  function onRegClick() {
    SetIsModalOpen(false);
    SetIsRegModalOpen(true);
  }

  return (
    <Modal
      title={<Typography.Title>Авторизация</Typography.Title>}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
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
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 16,
          }}
        >
          <Flex gap={30} style={{ width: 400 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <p>
              Не зарегестрирован?{" "}
              <a href="#" onClick={onRegClick}>
                Зарегестрируйся!
              </a>
            </p>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
}
