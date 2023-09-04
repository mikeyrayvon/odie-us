import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ReactGA from "react-ga4";

const setBackgroundColor = (doc: Document) => {
  const contentsElement = doc.getElementById("contents");
  const docContentElement = doc.querySelector(".doc-content");
  if (docContentElement) {
    const cssRules =
      contentsElement?.getElementsByTagName("style")[0].sheet?.cssRules;
    const docContentClass = docContentElement.classList[0];
    if (cssRules?.length) {
      for (let i = 0; i < cssRules?.length; i++) {
        const rule = cssRules[i] as CSSStyleRule;
        if (rule.selectorText === `.${docContentClass}`) {
          if (rule.style.backgroundColor) {
            document.body.style.backgroundColor = rule.style.backgroundColor;
          }
          break;
        }
      }
    }
  }
};

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
          if (res.data.title) {
            document.title = res.data.title;
            ReactGA.send({
              hitType: "pageview",
              page: subdomain,
              title: res.data.title,
            });
          }
          return axios.get(res.data.url);
        }
        throw new Error();
      })
      .then((res) => {
        if (res?.data) {
          const doc = new DOMParser().parseFromString(res.data, "text/html");
          const contentsElement = doc.getElementById("contents");
          if (contentsElement?.innerHTML) {
            setContents(contentsElement?.innerHTML as string);
          }
          setBackgroundColor(doc);
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        setError(true);
      });
  }, [subdomain]);

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
          {exists ? (
            <div>
              <h1>This Odie is dead.</h1>
              <button onClick={deleteDeadOdie}>Delete it</button>
            </div>
          ) : (
            <div>
              <h1>This Odie doesn't exist.</h1>
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

  return (
    <div className="mx-auto w-[96%]">
      <div dangerouslySetInnerHTML={{ __html: contents }} />
    </div>
  );
};

export default Page;
