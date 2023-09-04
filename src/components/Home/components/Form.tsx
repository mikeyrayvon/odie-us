import { useState, type FormEvent } from "react";
import axios from "axios";

export const SUBDOMAIN_REGEXP = /^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/;

const Form = () => {
  const [subdomain, setSubdomain] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setSuccess(false);
    setError("");

    if (!subdomain || !SUBDOMAIN_REGEXP.exec(subdomain)) {
      setError("Invalid subdomain");
      return;
    }

    if (
      !url.startsWith("https://docs.google.com/document/d/") ||
      !url.endsWith("/pub")
    ) {
      setError("Invalid url");
      return;
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
        if (res.data.error) {
          throw new Error(res.data.error);
        }

        setSuccess(true);
        setUrl("");
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.log(error);
        setError(err.message);
      });
  };

  return (
    <section className="border" style={{ borderStyle: "inset" }}>
      <h2>Make a new Odie</h2>
      <form
        className="flex flex-col gap-2 mt-2"
        onSubmit={(e) => handleSubmit(e)}
      >
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
        <div>
          <p className="mb-4 text-xs">
            Open your google doc and go <strong>File</strong> {">"}
            <strong>Share</strong> {">"} <strong>Publish to web</strong>. <br />
            Click <strong>Publish</strong> and copy the <strong>Link</strong>.
            <br />
            This is your <em>published doc url</em>.<br />
            (Hint: it ends with "/pub")
          </p>
          <input
            type="text"
            name="url"
            id="url"
            placeholder="published doc url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Odie!</button>
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
        {error && (
          <span className="text-red-500 block mt-2 font-bold">{error}</span>
        )}
      </div>
    </section>
  );
};

export default Form;
