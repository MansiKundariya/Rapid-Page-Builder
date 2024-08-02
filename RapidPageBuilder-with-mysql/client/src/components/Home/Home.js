import "./Home.css";
import Navbar from "../Navbar";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import HomeNavbar from "../HomeNavbar";
import { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchData();
    }, [data]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/blog");
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        console.log(id);
        const response = await axios.delete(`http://localhost:8000/api/blog/${id}`);
        toast.success(response.data.message);
        fetchData();
    };

    const handleEdit = async (id) => {
        navigate(`/blogform/${id}`);
        fetchData();
    }

    const handleAll = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get("http://localhost:8000/api/blog");
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDraft = async (event) => {
        event.preventDefault();
        const response = await axios.get("http://localhost:8000/api/blog");
        const draft = response.data.filter((blog) => blog.status === "Draft");
        console.log(draft);
        setData(draft);
    };

    const handlePublish = async (event) => {
        event.preventDefault();
        const response = await axios.get("http://localhost:8000/api/blog");
        const publish = response.data.filter((blog) => blog.status === "Published");
        setData(publish);
    };

    const handleSchedule = async (event) => {
        event.preventDefault();
        const response = await axios.get("http://localhost:8000/api/blog");
        const scheduled = response.data.filter((blog) => blog.status === "Scheduled");
        setData(scheduled);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter((item) => {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Draft':
                return 'draft-color';
            case 'Published':
                return 'publish-color';
            case 'Scheduled':
                return 'schedule-color';
            default:
                return '';
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="home-container">
                <Navbar />
                <div className="horizontal-container">
                    <HomeNavbar />

                    <div className="side-by-side-container">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                        </div>

                        <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Status
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="" onClick={handleAll}>All</a></li>
                                <li><a className="dropdown-item" href="" onClick={handleDraft}>Draft</a></li>
                                <li><a className="dropdown-item" href="" onClick={handleSchedule}>Schedual</a></li>
                                <li><a className="dropdown-item" href="" onClick={handlePublish}>Published</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="blogTable m-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">URL</th>
                                    <th scope="col">CreatedBy</th>
                                    <th scope="col">CreatedAt</th>
                                    <th scope="col">ModifiedBy</th>
                                    <th scope="col">ModifiedAt</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="d-flex" style={{ color: "#4F46E5" }}>{item.title}
                                            <div className="dropdown">
                                                <button className="dropdownbtn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <SlOptions />
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><a className="dropdown-item" onClick={() => handleEdit(item.id)}>Edit</a></li>
                                                    <li><a className="dropdown-item" onClick={() => handleDelete(item.id)}>Delete</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td>{item.url}</td>
                                        <td>{item.createdBy}</td>
                                        <td>{`${new Date(item.createdAt).getDate()}/${new Date(item.createdAt).getMonth() + 1}/${new Date(item.createdAt).getFullYear()}  ${new Date(item.createdAt).getHours()}:${new Date(item.createdAt).getMinutes()}`}</td>
                                        <td>{item.modifiedBy ? item.modifiedBy : "Not Modified"}</td>
                                        <td>{item.modifiedAt ? `${new Date(item.modifiedAt).getDate()}/${new Date(item.modifiedAt).getMonth()}/${new Date(item.modifiedAt).getFullYear()}  ${new Date(item.modifiedAt).getHours()}:${new Date(item.modifiedAt).getMinutes()}` : "Not Modified"}</td>
                                        <td className={getStatusColor(item.status)}>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;

