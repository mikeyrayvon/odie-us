import Donate from './Donate';

const Header = () => {
  return (
    <header id="header" className="mb-8 flex justify-between items-center">
      <h1 className='mb-0'>
        <a href="/" className="underline">
          Odie
        </a>
      </h1>
      <Donate />
    </header>
  );
};

export default Header;
