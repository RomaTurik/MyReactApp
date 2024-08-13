import { Typography, Form, Input, InputNumber, Button } from "antd";
import { useContext, useState } from "react";
import DataContext from "../context/DataProvider";
import { Content } from "antd/es/layout/layout";
import { useForm } from "antd/es/form/Form";

const layout = {
  labelCol: {
    span: 8,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
};
/* eslint-enable no-template-curly-in-string */

export default function AppAddCommets() {
  const { assets, AddAssets, AddComment, registeredUser } = useContext(DataContext);
  const [form] = useForm();

  function onFinish(values) {
    const user = values.user

    const assets = {
      name: user.name,
      message: {
        title: user.title,
        content: user.comment
      }
    }
    
    console.log(assets.message);
    AddAssets(assets);
    AddComment([assets.message])
    form.resetFields();
  }

  return (
    <>
      <Typography.Title>Добавить коментарий</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          paddingLeft: 25,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={registeredUser == 'Пользователь не зарегестрирован'} />
        </Form.Item>
        <Form.Item name={["user", "title"]} label="Title">
          <Input disabled={registeredUser == 'Пользователь не зарегестрирован'} />
        </Form.Item>
        <Form.Item name={["user", "comment"]} label="Comment">
          <Input.TextArea style={{ height: 200 }} disabled={registeredUser == 'Пользователь не зарегестрирован'} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
