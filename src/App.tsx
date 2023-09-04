import React, { useMemo } from "react";
import Home from "./components/Home/Home";
import Page from "./components/Page/Page";
import Random from "./components/Random";

let rootHostLength = process.env.NODE_ENV === "development" ? 1 : 2;

function App() {
  console.log("render App");
  const host = useMemo(() => window.location.host, []);
  return (
    <div className="App w-[90%] mx-auto lg:w-[1000px]">
      {host.split(".").length > rootHostLength ? <Page /> : <Home />}
      <Random />
    </div>
  );
}

export default App;
