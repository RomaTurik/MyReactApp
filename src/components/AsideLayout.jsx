import { Typography, Input, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import DataContext from "../context/DataProvider";

export default function AsideLayout() {
  const { sortedUsers, FindUser } = useContext(DataContext);

  function onChange(el) {
    FindUser(el);
  }

  return (
    <aside style={{ width: "25%" }}>
      <Typography.Title>Пользователи</Typography.Title>
      <Input
        placeholder="Найти пользователя"
        onChange={onChange}
        id="find-user-input"
      />
      <List
        style={{ marginTop: 25 }}
        bordered
        dataSource={sortedUsers}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>
              <Avatar
                size={30}
                style={{ marginRight: 7 }}
                icon={<UserOutlined />}
              />
            </Typography.Text>{" "}
            {item}
          </List.Item>
        )}
      />
    </aside>
  );
}
