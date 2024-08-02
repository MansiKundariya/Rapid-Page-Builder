import "./Home.css";
import Navbar from "../Navbar";
import axios from "axios";
import HomeNavbar from "../HomeNavbar";
import { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';

function Home() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [userList, setUserList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noOfRows, setNoOfRows] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/blog");
            setNoOfRows(response.data.length)
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/users");
            setUserList(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:8000/api/blog/${id}`);
        fetchData();
    };

    const handleEdit = async (item) => {
        localStorage.setItem("currentFormData", JSON.stringify(item));
        navigate(`/blogform/${item._id}`);
        fetchData();
    }

    const handleAll = async (event) => {
        event.preventDefault();
        document.getElementById("createdBy").innerText = "All";
        document.getElementById("status").innerText = "All";
        try {
            const response = await axios.get("http://localhost:8000/api/blog");
            setNoOfRows(response.data.length);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDraft = async (event) => {
        event.preventDefault();
        document.getElementById("status").innerText = "Draft";

        const response = await axios.get("http://localhost:8000/api/blog");
        const draft = response.data.filter((blog) => blog.status === "Draft");

        setNoOfRows(draft.length);
        setData(draft);
    };

    const handlePublish = async (event) => {
        event.preventDefault();
        document.getElementById("status").innerText = "Published";

        const response = await axios.get("http://localhost:8000/api/blog");
        const publish = response.data.filter((blog) => blog.status === "Published");

        setNoOfRows(publish.length);
        setData(publish);
    };

    const handleSchedule = async (event) => {
        event.preventDefault();
        document.getElementById("status").innerText = "Scheduled";

        const response = await axios.get("http://localhost:8000/api/blog");
        const scheduled = response.data.filter((blog) => blog.status === "Scheduled");

        setNoOfRows(scheduled.length);
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

    const handleUser = async (e) => {
        e.preventDefault();
        const selectedUser = e.target.innerText;
        document.getElementById("createdBy").innerText = selectedUser;
        const response = await axios.get("http://localhost:8000/api/blog");
        const selectedUserData = response.data.filter((blog) => blog.createdBy === selectedUser);
        setNoOfRows(selectedUserData.length);
        setData(selectedUserData);
    }

    return (
        <>
            <div className="home-container">
                <Navbar />
                <div className="horizontal-container">
                    <HomeNavbar />

                    <div className="side-by-side-container">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="search-input"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                            <AiOutlineSearch className="search-icon" />
                        </div>

                        <div className="noOfRecords">
                            {noOfRows} recordes
                        </div>

                        <div className="dropdown createdByClass">
                            createdBy
                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <span id="createdBy">All</span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="" onClick={handleAll}>All</a></li>
                                {
                                    userList.map((user) => (
                                        <li><a className="dropdown-item" href="" onClick={handleUser}>{`${user.firstName} ${user.lastName}`}</a></li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="dropdown">
                            Status
                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <span id="status">All</span>
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
                                                    <li><a className="dropdown-item" onClick={() => handleEdit(item)}>Edit</a></li>
                                                    <li><a className="dropdown-item" href="#" onClick={() => handleDelete(item._id)}>Delete</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td>{item.url}</td>
                                        <td>{item.createdBy}</td>
                                        <td>{`${new Date(item.createdAt).getDate()}/${new Date(item.createdAt).getMonth() + 1}/${new Date(item.createdAt).getFullYear()}  ${new Date(item.createdAt).getHours()}:${new Date(item.createdAt).getMinutes()}`}</td>
                                        <td>{item.modifiedBy ? item.modifiedBy : "Not Modified"}</td>
                                        <td>{item.modifiedAt ? `${new Date(item.modifiedAt).getDate()}/${new Date(item.modifiedAt).getMonth()}/${new Date(item.modifiedAt).getFullYear()}  ${new Date(item.modifiedAt).getHours()}:${new Date(item.modifiedAt).getMinutes()}` : "Not Modified"}</td>
                                        <td><span className={getStatusColor(item.status)}>{item.status}</span></td>
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

