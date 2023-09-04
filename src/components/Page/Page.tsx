import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Page = () => {
  const subdomain = useMemo(() => window.location.host.split(".")[0], []);
  const [contents, setContents] = useState("");
  const [exists, setExists] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post(`/api/get-odie`, {
        subdomain,
        env: process.env.NODE_ENV,
      })
      .then((res) => {
        if (res.data.url) {
          setExists(true);
          return axios.get(res.data.url);
        }
        throw new Error();
      })
      .then((res) => {
        if (res?.data) {
          const doc = new DOMParser().parseFromString(res.data, "text/html");
          if (doc.getElementById("contents")?.innerHTML) {
            setContents(doc.getElementById("contents")?.innerHTML as string);
          }
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        setError(true);
      });
  }, [exists, subdomain]);

  const deleteDeadOdie = () => {
    axios
      .post(`/api/delete-odie`, {
        subdomain,
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <h1>Something went wrong.</h1>
          {exists ? (
            <div>
              <p>This odie is dead.</p>
              <button onClick={deleteDeadOdie}>Delete it</button>
            </div>
          ) : (
            <div>
              <p>This odie doesn't exist.</p>
              <p>
                <a href="https://odie.us/" className="underline">
                  But you can make it.
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: contents }} />;
};

export default Page;
