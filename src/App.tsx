import React, { useState } from "react";
import { Layout } from "antd";
import "./App.css";
import { Container } from "./App.styles";
import { MenuComponent } from "./components/common/Menu";
import { ContentComponent } from "./components/common/Content";

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Container>
      <Layout style={{}}>
        <MenuComponent isOpen={collapsed} />
        <ContentComponent collapsed={collapsed} setCollapsed={setCollapsed} />
      </Layout>
    </Container>
  );
};

export default App;
