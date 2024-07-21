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
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={assets}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={item.name}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </>
  );
}
