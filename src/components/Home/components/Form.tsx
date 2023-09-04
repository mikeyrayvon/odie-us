import { useState, type FormEvent } from "react";
import axios from "axios";

export const SUBDOMAIN_REGEXP = /^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/;

const Form = () => {
  const [subdomain, setSubdomain] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setSuccess(false);
    setError(false);

    const invalid =
      !subdomain ||
      !url ||
      !title ||
      !url.includes("https://docs.google.com/document/d/") ||
      !SUBDOMAIN_REGEXP.exec(subdomain);

    if (process.env.NODE_ENV !== "development") {
      if (invalid) {
        return;
      }
    }

    axios
      .post(`/api/create-odie`, {
        subdomain,
        url,
        title,
        description,
        views: 0,
        timestamp: Date.now(),
      })
      .then((res) => {
        setSuccess(true);
        setUrl("");
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        setError(true);
        console.error(err);
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
              onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
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
      <div id="response">
        {success && (
          <span>
            Your odie was created at
            <a
              href={`https://${subdomain}.odie.us`}
              className="underline"
            >{`https://${subdomain}.odie.us`}</a>
          </span>
        )}
        {error && <span>There was an error creating your odie</span>}
      </div>
    </section>
  );
};

export default Form;
