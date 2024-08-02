import "./HorizontalNavbar.css";
import { IoChevronBack } from "react-icons/io5";

function HorizontalNavbar() {

    return (
        <>
            <nav className="navbar d-flex navbar-expand-lg navbar-light">
                <button className="navbar-brand" onClick={() => { window.history.back() }}>
                    <IoChevronBack />
                </button>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active mt-3" aria-current="page" href="/home">
                            Published Page
                        </a>
                    </li>
                </ul>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
            <hr />
        </>
    );
}

export default HorizontalNavbar;
