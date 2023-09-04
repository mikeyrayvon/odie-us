import axios from "axios";
import { useEffect, useState } from "react";

const Directory = () => {
  const [odies, setOdies] = useState<
    {
      subdomain: string;
      title: string;
      description: string;
    }[]
  >([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/get-all-odies`)
      .then((res) => {
        console.log(res.data);
        setOdies(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Can't get odies");
      });
  }, []);

  return (
    <div className="App w-[90%] mx-auto lg:w-[1000px] my-12">
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
          <ul className="md:columns-2 lg:columns-3 break-all">
            {odies?.map((odie) => {
              const url = `https://${odie.subdomain}.odie.us`;
              return (
                <li key={odie.subdomain} className="flex flex-col mb-3">
                  <a href={url} className="underline">
                    {url}
                  </a>
                  <span>{odie.title}</span>
                  <span>{odie.description}</span>
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
