import React, { useContext, useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Skeleton, Typography } from "antd";
import "./AccountAppStyle.css";
import DataContext from "../../context/DataProvider";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

export default function AccountApp({ user }) {
  const { assets, users } = useContext(DataContext);
  console.log(assets);

  console.log({ user });
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
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <h2>Title</h2>
                {item}
              </List.Item>
            )}
          />
        </main>
      )}
    </div>
  );
}
