import axios from "axios";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";

const Directory = () => {
  const [odies, setOdies] = useState<
    {
      subdomain: string;
      title: string;
      description: string;
      views: number;
    }[]
  >([]);
  const [error, setError] = useState("");

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/directory",
      title: "Directory",
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/get-all-odies`)
      .then((res) => {
        setOdies(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Can't get odies");
      });
  }, []);

  return (
    <div className="App w-[90%] mx-auto my-12">
      {error ? (
        <div className="fixed inset-0 flex justify-center items-center">
          <span>{error}</span>
        </div>
      ) : (
        <div>
          <h1>
            <a href="/" className="underline">
              Odie
            </a>{" "}
            directory
          </h1>
          <ul className="md:columns-2 lg:columns-3 xl:columns-4">
            {odies?.map((odie) => {
              const url = `https://${odie.subdomain}.odie.us`;
              return (
                <li
                  key={odie.subdomain}
                  className="flex flex-col mb-3 block break-inside-avoid break-words"
                >
                  <a href={url} className="underline text-blue-500">
                    {url}
                  </a>
                  <span className="font-bold">{odie.title}</span>
                  <span>{odie.description}</span>
                  <span className="text-xs">visits: {odie.views}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Directory;
