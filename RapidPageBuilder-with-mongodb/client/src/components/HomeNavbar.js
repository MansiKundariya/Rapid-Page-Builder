import "./HomeNavbar.css";
import { IoChevronBack } from "react-icons/io5";
import { HiMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";

function HomeNavbar() {
    return (
        <>
            <nav className="navbar d-flex justify-content-space-between mx-3">
                <div className="d-flex">
                    <button className="navbar-brand">
                        <HiMenuAlt1 />
                    </button>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <p className="nav-link active mt-3" aria-current="page" href="">
                                Pages
                            </p>
                            <p className="subtitle">Create and publish page</p>
                        </li>
                    </ul>
                </div>
                <div className="row">
                    <div className="col">
                        <Link to="/blogform">
                            <button
                                type="button"
                                className="btn btn-primary"
                            >
                                + Add Pages
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
            <hr />
        </>
    );
}

export default HomeNavbar;
