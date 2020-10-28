import React from "react";

import { ThemeProvider } from "@material-ui/core";

import Home from "./components/Home";
import theme from "./theme";
function App() {

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
