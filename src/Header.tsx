import logo from './97738d470fe34a5aab085fe998dc7d85.png';
function Header() {
  return (
    <header className="row header navbar-dark bg-dark">
      <div className="col-4">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <div className="col subtitle">
        <h1 className="text-white"> Major League Bowling List </h1>
        <p className="text-white">This is working</p>
      </div>
    </header>
  );
}

export default Header;
