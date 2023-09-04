import React, { useMemo } from "react";
import Home from "./components/Home/Home";
import Page from "./components/Page/Page";
import Random from "./components/Random";
import ReactGA from "react-ga4";

ReactGA.initialize(process.env.REACT_APP_GA_ID as string);

let rootHostLength = process.env.NODE_ENV === "development" ? 1 : 2;

function App() {
  const host = useMemo(() => window.location.host, []);

  return (
    <div className="App">
      {host.split(".").length > rootHostLength ? <Page /> : <Home />}
      <Random />
    </div>
  );
}

export default App;
