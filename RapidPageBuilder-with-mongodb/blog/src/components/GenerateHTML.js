import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoChevronBack } from 'react-icons/io5';


const downloadFile = async (fileUrl) => {

    try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};

function handleClick(fileUrl) {
    downloadFile(fileUrl);
}

const GenerateHTML = () => {

    const [blogData, setBlogData] = useState({});
    const { url } = useParams();

    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/blog/${url}`);
            setBlogData(response.data);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <div className="container mt-5">
            {
                Object.keys(blogData).length === 0 && blogData.constructor === Object ? <div className="card">
                    <div className="card-body text-center">
                        <h1>Page not found!</h1>
                    </div>
                </div> : (
                    blogData.status === "Published" ?

                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <div className="card">
                                    <div className="card-body">
                                        <IoChevronBack style={{ cursor: 'pointer' }} size={30} onClick={() => window.history.back()} />
                                        <h2 className="card-title">{blogData.title}</h2>
                                        <h5 className="card-subtitle mb-4 text-muted">{blogData.subtitle}</h5>
                                        <div className="card-text" dangerouslySetInnerHTML={{ __html: blogData.body }}></div>
                                        <div className="mt-4">
                                            <h5>Attachments:</h5>
                                            <img src={blogData.attachment} alt="Attachment" width={750} height="auto" /><br/>
                                            <button style={{ backgroundColor: "#4F46E5", padding: "7px" }}>
                                                <a href={blogData.attachment} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "black" }} onClick={() => handleClick(blogData.attachment)}>
                                                    Download Image
                                                </a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :

                        <div className="card">
                            <div className="card-body text-center">
                                <h1>{`This page is published at ${new Date(blogData.publishDateAndTime).getDate()}/${new Date(blogData.publishDateAndTime).getMonth()}/${new Date(blogData.publishDateAndTime).getFullYear()}  ${new Date(blogData.publishDateAndTime).getHours()}:${new Date(blogData.publishDateAndTime).getMinutes()}`}
                                </h1>
                            </div>
                        </div>

                )
            }
        </div>
    );
};

export default GenerateHTML;
