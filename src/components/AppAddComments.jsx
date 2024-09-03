import { Typography, Form, Input, InputNumber, Button } from "antd";
import { useContext, useState, useEffect } from "react";
import DataContext from "../context/DataProvider";
import { Content } from "antd/es/layout/layout";
import { useForm } from "antd/es/form/Form";
import { db } from "../database/database";
const layout = {
  labelCol: {
    span: 8,
  },
};

/* eslint-disable no-template-curly-in-string */
// const validateMessages = {
//   required: "${label} is required!",
// };
/* eslint-enable no-template-curly-in-string */

export default function AppAddCommets() {
  const { assets, AddAssets, AddComment, registeredUser, handleAddItem } =
    useContext(DataContext);
  const [form] = useForm();

  async function addMessageInDB(data) {
    await db.messages.add(data);
  }

  useEffect(() => {
    form.setFieldsValue({ user: { name: registeredUser } });
  }, [registeredUser, form]);

  async function onFinish(values) {
    const user = values.user;
    const userId = await db.users
      .where("name")
      .equals(registeredUser)
      .toArray();

    const assets = {
      name: registeredUser,
      message: {
        user_id: userId[0].id,
        title: user.title,
        content: user.comment,
      },
    };
    addMessageInDB(assets.message);
    AddAssets(assets);
    AddComment([assets.message]);
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
        initialValues={{ user: { name: registeredUser } }}
      >
        <Form.Item name={["user", "name"]} label="Name">
          <Input value={registeredUser} disabled={true} />
        </Form.Item>
        <Form.Item name={["user", "title"]} label="Title">
          <Input
            required={true}
            disabled={registeredUser == "Пользователь не зарегестрирован"}
          />
        </Form.Item>
        <Form.Item required={true} name={["user", "comment"]} label="Comment">
          <Input.TextArea
            required={true}
            style={{ height: 200 }}
            disabled={registeredUser == "Пользователь не зарегестрирован"}
          />
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
