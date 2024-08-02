import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./PublishPageList.css";
// import Navbar from './Navbar';
// import HorizontalNavbar from './HorizontalNavbar';

function PublishPageList() {
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/blog/publishblog`);
            setBlogData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <>
            <div className="home-container">
                {/* <Navbar /> */}
                <div className="horizontal-container">
                    {/* <HorizontalNavbar /> */}
                    <div className="m-5">
                        <div className="row">
                            {blogData.map((blog) => (
                                <div key={blog._id} className="col-lg-3 col-md-6 mb-4">
                                    <div className="card p-0 h-100">
                                        <div className="card-header">Created By: {blog.createdBy}</div>
                                        <div className="card-body">
                                            <h5 className="card-title">{blog.title}</h5>
                                            <p className="card-text">{blog.subtitle}</p>
                                        </div>
                                        <div className='m-3'>
                                            <a href={`http://localhost:3001/${blog.url}`} className="btn btn-primary">Show Page</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PublishPageList;
