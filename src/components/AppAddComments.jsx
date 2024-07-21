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
  const { assets, AddAssets } = useContext(DataContext);
  const [form] = useForm();

  function onFinish(values) {
    const data = values.user;
    const assets = {
      name: data.name,
      description: data.title,
      content: data.comment,
    };
    AddAssets(assets);
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
          <Input />
        </Form.Item>
        <Form.Item name={["user", "title"]} label="Title">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "comment"]} label="Comment">
          <Input.TextArea style={{ height: 200 }} />
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
