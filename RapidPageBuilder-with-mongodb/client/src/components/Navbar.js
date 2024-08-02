import "../components/Navbar.css";
import logo from "../images/logo.svg";
import dashboard from "../images/dashboard.svg";
import { FaWpforms } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

function Navbar() {

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate("/login");
    }

    return (
        <>
            <nav className="nav flex-column">
                <a className="nav-link active" aria-current="page" href="#"><img src={logo} /></a>
                <a className="nav-link active" aria-current="page" href="/home"><img src={dashboard} /></a>
                <hr />
                <a className="nav-link active" aria-current="page" href="/blogform" style={{ marginLeft: 5, marginTop: 3}}><FaWpforms /></a>
                <a className="nav-link active" aria-current="page" href="http://localhost:3001/publishblog" style={{ marginLeft: 5, marginTop: 3}}><MdOutlinePublishedWithChanges /></a>
                <div className="endLink">
                    <a className="nav-link active" aria-current="page" href=""><RiLogoutBoxRLine size={30} color="#6C6B80" onClick={handleLogout} /></a>
                    <a className="nav-link active avtar" aria-current="page" href="#">{ localStorage.getItem("userId")[0].toUpperCase()}</a>
                    {/* <a className="nav-link active" aria-current="page" href="#"><img src={avtar} /></a> */}
                </div>
            </nav>
        </>
    )
}

export default Navbar;