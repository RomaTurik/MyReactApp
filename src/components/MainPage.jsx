import ContentLayout from "./ContentLayout/ContentLayout";
import AsideLayout from "./AsideLayout";
import { Flex } from "antd";

export default function MainPage() {
  return (
    <Flex
      style={{
        maxWidth: 1440,
        margin: "0 auto",
        width: "100%",
        columnGap: 40,
      }}
    >
      <ContentLayout />
      <AsideLayout style={{ width: "25%" }} />
    </Flex>
  );
}
