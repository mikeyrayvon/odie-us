import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Page = () => {
  const subdomain = useMemo(() => window.location.host.split(".")[0], []);
  const [contents, setContents] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .post(`/api/get-odie`, {
        subdomain,
        env: process.env.NODE_ENV,
      })
      .then((res) => {
        if (res.data[0].url) {
          return axios.get(res.data[0].url);
        }
      })
      .then((res) => {
        if (res?.data) {
          const doc = new DOMParser().parseFromString(res.data, "text/html");
          if (doc.getElementById("contents")?.innerHTML) {
            setContents(doc.getElementById("contents")?.innerHTML as string);
          }
        }
      })
      .catch((err) => {
        setError("This Odie may not exist");
      });
  }, [subdomain]);

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <span>{error}</span>
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: contents }} />;
};

export default Page;
