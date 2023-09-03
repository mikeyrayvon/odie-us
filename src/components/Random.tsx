import { useEffect, useState } from "react";
import axios from "axios";

const Random = () => {
  const [subdomain, setSubdomain] = useState("");

  useEffect(() => {
    axios
      .get("/.netlify/functions/get-random-odie")
      .then((res) => {
        setSubdomain(res.data.subdomain);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!subdomain) {
    return null;
  }

  const rootUrl =
    process.env.NODE_ENV === "development" ? "localhost:8888" : "odie.us";

  return (
    <div className="absolute top-[10px] right-[20px] z-1">
      <a href={`${subdomain}.${rootUrl}`} className="block p-1">
        .
      </a>
    </div>
  );
};

export default Random;
