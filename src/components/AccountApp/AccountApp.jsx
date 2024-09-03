import React, { useContext, useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Flex,
  List,
  Typography,
  Modal,
  Form,
  Input,
  Button,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./AccountAppStyle.css";
import DataContext from "../../context/DataProvider";
import { db } from "../../database/database";
import { useForm } from "antd/es/form/Form";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
let messageId;

export default function AccountApp({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {
    registeredUserMessages,
    ChangeMessagesAssets,
    DeleteMessagesAssets,
    registeredUser,
  } = useContext(DataContext);
  const [changeForm] = useForm();

  useEffect(() => {
    changeForm.setFieldsValue({ user: { title: title } });
    changeForm.setFieldsValue({ user: { comment: content } });
  }, [title, changeForm]);

  const showModal = async (el) => {
    setIsModalOpen(true);
    messageId = el.target.closest(".ant-list-item").id;
    console.log(messageId);
    const userId = await db.users
      .where("name")
      .equals(registeredUser)
      .toArray();
    const messages = await db.messages
      .where("user_id")
      .equals(userId[0].id)
      .toArray();
    setTitle(messages[messageId].title);
    setContent(messages[messageId].content);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function changeComment(values) {
    console.log(messageId);

    const userId = await db.users
      .where("name")
      .equals(registeredUser)
      .toArray();
    const messages = await db.messages
      .where("user_id")
      .equals(userId[0].id)
      .toArray();

    await db.messages.put({
      user_id: userId[0].id,
      title: values.user.title,
      content: values.user.comment,
      id: messages[messageId].id,
    });
    ChangeMessagesAssets(messageId, values.user.title, values.user.comment);
  }

  async function deleteComment(el) {
    let messageId = el.target.closest(".ant-list-item").id;
    messageId = Number(messageId);
    const userId = await db.users
      .where("name")
      .equals(registeredUser)
      .toArray();
    const messages = await db.messages
      .where("user_id")
      .equals(userId[0].id)
      .toArray();
    await db.messages.where("id").equals(messages[messageId].id).delete();
    DeleteMessagesAssets(messageId);
  }

  return (
    <div className="account-container">
      {user == "Пользователь не зарегестрирован" && (
        <h1>Пользователь не зарегестрирован</h1>
      )}
      {user != "Пользователь не зарегестрирован" && (
        <div className="account-header">
          <Avatar
            size={40}
            style={{
              backgroundColor: "#87d068",
            }}
            icon={<UserOutlined />}
          />

          <h1>{user}</h1>
        </div>
      )}

      {user != "Пользователь не зарегестрирован" && (
        <main className="account-main" style={{ marginTop: 30 }}>
          <Typography.Title>Ваши комментарии</Typography.Title>
          <List
            size="large"
            bordered
            dataSource={registeredUserMessages}
            renderItem={(item) => {
              return (
                <List.Item id={registeredUserMessages.indexOf(item)}>
                  <Flex justify="space-between" align="flex-start">
                    <h2 style={{ marginBottom: 10 }}>{item.title}</h2>
                    <Flex className="edit-comments-container" gap={12}>
                      <button onClick={showModal}>
                        <EditOutlined style={{ fontSize: 20 }} />
                      </button>
                      <button onClick={deleteComment}>
                        <DeleteOutlined style={{ fontSize: 20 }} />
                      </button>
                    </Flex>
                  </Flex>

                  {item.content}
                </List.Item>
              );
            }}
          />
          <Modal
            title="Change message"
            footer={null}
            open={isModalOpen}
            onCancel={handleCancel}
          >
            <Form
              form={changeForm}
              layout="vertical"
              onFinish={changeComment}
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item
                style={{ marginTop: 25 }}
                name={["user", "title"]}
                label="Title"
              >
                <Input id="change-title" required={true} />
              </Form.Item>
              <Form.Item
                required={true}
                name={["user", "comment"]}
                label="Comment"
              >
                <Input.TextArea
                  id="change-content"
                  required={true}
                  style={{ height: 200 }}
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  ...layout.wrapperCol,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Изменить
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </main>
      )}
    </div>
  );
}
