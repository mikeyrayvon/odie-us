import Moment from "./Moment";

const About = () => {
  return (
    <section>
      <div className="mb-4">
        <h2>What is Odie?</h2>
        <p>
          Odie makes a webpage with the content of a published google doc and
          gives it an Odie subdomain
        </p>
        <p>
          When you change the google doc, Odie waits for google to update, and
          your Odie page gets updated too!
        </p>
        <p className="mt-4">
          <a href="/directory" className="underline">
            Directory
          </a>
        </p>
      </div>
      <Moment />
    </section>
  );
};

export default About;
