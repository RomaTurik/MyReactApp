import React, { useContext, useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, List, message, Skeleton, Typography } from "antd";
import "./AccountAppStyle.css";
import DataContext from "../../context/DataProvider";




export default function AccountApp({ user }) {
  const { registeredUserMessages, assets } = useContext(DataContext);

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
            renderItem={(item) => (
              <List.Item>
                <h2 style={{marginBottom: 10}}>{item.title}</h2>
                {item.content}
              </List.Item>
            )}
          />
        </main>
      )}
    </div>
  );
}
