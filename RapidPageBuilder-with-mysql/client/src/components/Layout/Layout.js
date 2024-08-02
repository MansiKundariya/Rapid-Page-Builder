import { useState } from "react";
import BlogFrom from "../BlogFrom";
import HorizontalNavbar from "../HorizontalNavbar";
import Navbar from "../Navbar";
import "./Layout.css";

function Layout() {

    const [data, setData] = useState();

    function getData(val) {
        setData(val);
    }

    return (
        <>
            <div className="home-container">
                <Navbar />
                <div className="horizontal-container">
                    {/* <HorizontalNavbar formData={data}/>
                    <div> */}
                    <BlogFrom onData={getData} />
                    {/* </div> */}
                </div>
            </div>
        </>
    );
}

export default Layout;