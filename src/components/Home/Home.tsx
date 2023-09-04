import About from "./components/About";
import Ascii from "./components/Ascii";
import Form from "./components/Form";
import Header from "./components/Header";

const Home = () => {
  return (
    <div className="mx-auto max-w-[400px] lg:max-w-[1000px] my-12">
      <Header />
      <div className="text-sm flex flex-col lg:flex-row lg:flex-no-wrap gap-4">
        <Ascii />
        <Form />
        <About />
      </div>
    </div>
  );
};

export default Home;
