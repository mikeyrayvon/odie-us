import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const subdomain = window.location.host.split(".")[0];
  const [contents, setContents] = useState("");
  const [randomSubdomain, setRandomSubdomain] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .post(`/.netlify/functions/get-odie`, {
        subdomain,
      })
      .then((res) => {
        if (res.data[0].url) {
          return axios.get(res.data[0].url);
        }
      })
      .then((res) => {
        console.log(res);
        if (res?.data) {
          const doc = new DOMParser().parseFromString(res.data, "text/html");
          if (doc.getElementById("contents")?.innerHTML) {
            setContents(doc.getElementById("contents")?.innerHTML as string);
          }
        }
      })
      .then(() => {
        return axios.get("/.netlify/functions/get-random-odie");
      })
      .then((res) => {
        setRandomSubdomain(res.data.subdomain);
      })
      .catch((err) => {
        setError("Something went wrong...");
      });
  }, [subdomain]);

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <span>This Odie may not exist</span>
      </div>
    );
  }

  return (
    <div>
      <div className="absolute top-[10px] right-[20px]">
        <a
          href={`http://${randomSubdomain}.localhost:8888`}
          className="block p-1"
        >
          .
        </a>
      </div>
      <div
        className="w-[90%] mx-auto lg:w-[1000px]"
        dangerouslySetInnerHTML={{ __html: contents }}
      />
    </div>
  );
};

export default Page;
