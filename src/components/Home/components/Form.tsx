import { useState, type FormEvent } from "react";
import axios from "axios";

const REGEXP = /^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/;

const Form = () => {
  const [subdomain, setSubdomain] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const invalid =
      !subdomain ||
      !url ||
      !title ||
      !subdomain.includes("https://docs.google.com/document/d/") ||
      !REGEXP.exec(subdomain);

    if (process.env.NODE_ENV !== "development") {
      if (invalid) {
        return;
      }
    }

    axios
      .post(`/.netlify/functions/create-odie`, {
        subdomain,
        url,
        title,
        description,
        views: 0,
        timestamp: Date.now(),
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <section className="border" style={{ borderStyle: "inset" }}>
      <h2>Make a new Odie</h2>
      <p className="mb-4">
        Open your google doc and File {">"} Publish to the web. Click 'Publish'.
        The link it gives you is your published doc url
      </p>
      <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div className="flex flex-no-wrap">
            <input
              type="text"
              name="username"
              id="subdomain"
              placeholder="subdomain"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              required
            />{" "}
            <span className="inline-block ml-1 mt-1">.odie.us</span>
          </div>
          <p className="text-xs">
            only lowercase letters (no accents), numbers and hyphens
          </p>
        </div>
        <input
          type="text"
          name="url"
          id="url"
          placeholder="published doc url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          type="text"
          name="title"
          id="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="border border-black bg-gray-100 rounded py-2"
          type="submit"
        >
          Odie!
        </button>
      </form>
      <div id="response"></div>
    </section>
  );
};

export default Form;
