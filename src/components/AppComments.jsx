import { UserOutlined } from "@ant-design/icons";
import { data } from "../data";
import { Typography, List, Avatar } from "antd";
import { useContext } from "react";
import DataContext from "../context/DataProvider";

export default function AppComments() {
  const { assets } = useContext(DataContext);

  return (
    <>
      <Typography.Title>Комментарии</Typography.Title>
      <List
        style={{ height: 527, marginBottom: 50 }}
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
        dataSource={assets}
        renderItem={(item) =>
          item.message.map((message, i) => {
            return (
              <List.Item key={message.title + i}>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={item.name}
                  description={message.content}
                />
                {item.content}
              </List.Item>
            );
          })
        }
      />
    </>
  );
}
