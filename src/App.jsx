import React from "react";
import AppLayout from "./components/AppLayout";
import { DataProviderContext } from "./context/DataProvider";

export default function App() {
  return (
    <DataProviderContext>
      <AppLayout></AppLayout>
    </DataProviderContext>
  );
}
