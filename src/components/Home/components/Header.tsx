const Header = () => {
  return (
    <header id="header" className="mb-8">
      <h1 className="text-4xl font-bold">
        <a href="http://<?php echo $home; ?>" className="underline">
          Odie
        </a>
      </h1>
    </header>
  );
};

export default Header;
