import React from "react";
import { Layout, Typography, List, Avatar, Divider } from "antd";

import "./AntdListPagination.css";
import AppComments from "../AppComments";
import AppAddCommets from "../AppAddComments";

const { Content } = Layout;

const contentStyle = {
  height: "100%",
  margin: "0 auto",
};

export default function ContentLayout() {
  return (
    <Content style={contentStyle}>
      <AppComments></AppComments>
      <AppAddCommets></AppAddCommets>
    </Content>
  );
}
