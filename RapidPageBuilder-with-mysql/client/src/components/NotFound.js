import "../components/NotFound.css";
import image from "../images/image.svg";
import { FaPlus } from "react-icons/fa6";
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="card mt-5">
                    <div className="row g-0">
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">No Pages Found.</h5>
                                <p className="card-text">Looks like you don’t have any pages yet. Let’s add a new page.</p>
                                <Link to="/blogform">
                                    <button type="button" className="btn btn-primary"><FaPlus className="addIcon" />Add Page</button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <img src={image} className="card-img-top" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound;
