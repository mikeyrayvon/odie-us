import { useEffect, useState } from "react";
import axios from "axios";

const Moment = () => {
  const [subdomain, setSubdomain] = useState("");

  useEffect(() => {
    if (subdomain) {
      return;
    }
    axios
      .get("/api/get-random-odie")
      .then((res) => {
        setSubdomain(res.data.subdomain);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [subdomain]);

  const rootUrl =
    process.env.NODE_ENV === "development" ? "localhost:3000" : "odie.us";

  return (
    <div>
      <h2>Odie of the moment:</h2>
      {subdomain && (
        <a href={`http://${subdomain}.${rootUrl}`} className="underline">
          {`http://${subdomain}.${rootUrl}`}
        </a>
      )}
    </div>
  );
};

export default Moment;
