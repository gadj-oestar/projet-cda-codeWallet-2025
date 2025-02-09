import { Link } from "react-router-dom";
import info from "../assets/info.png";  // Assure-toi que le chemin de l'image est correct

const Header = () => {
  return (
    <header className="head">
      <nav>
        <ul>
          <li><Link to="/">Code Wallet</Link></li>
          <li><Link to="/fragment">Fragment</Link></li>
          <li><Link to="/tag">Tag</Link></li>
          <li><img src={info} alt="description" /></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
