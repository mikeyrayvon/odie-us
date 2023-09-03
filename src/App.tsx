import React from "react";
import Home from "./components/Home/Home";
import Page from "./components/Page/Page";

const rootHostLength = process.env.NODE_ENV === "development" ? 1 : 2;

function App() {
  return (
    <div className="App">
      {window.location.host.split(".").length > rootHostLength ? (
        <Page />
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;
