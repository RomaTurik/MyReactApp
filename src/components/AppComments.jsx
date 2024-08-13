import { UserOutlined } from "@ant-design/icons";
import { data } from "../data";
import { Typography, List, Avatar } from "antd";
import { useContext } from "react";
import DataContext from "../context/DataProvider";

export default function AppComments() {
  const { assets } = useContext(DataContext);
  
  const data = assets.reduce((acc,val)=>{
    const messages = val.message.map((message)=>{
      return {
        name: val.name,
        userMessage: message,
      }
    })
    return acc.concat(messages)
  },[])


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
        dataSource={data}
        renderItem={(item) =>{
          return (
            <List.Item key={item}>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={item.name}
                description={item.userMessage.title}
              />
              {item.userMessage.content}
            </List.Item>
          );
        }
        }
      />
    </>
  );
}
