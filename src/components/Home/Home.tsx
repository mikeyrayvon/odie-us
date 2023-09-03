import About from "./components/About";
import Ascii from "./components/Ascii";
import Form from "./components/Form";
import Header from "./components/Header";

const Home = () => {
  return (
    <div className="w-[1000px] mx-auto my-12">
      <Header />
      <div className="text-sm flex flex-no-wrap gap-4">
        <Ascii />
        <Form />
        <About />
      </div>
    </div>
  );
};

export default Home;
