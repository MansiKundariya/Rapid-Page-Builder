import "./BlogFrom.css";
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import "./HorizontalNavbar.css";
import { IoChevronBack } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BlogFrom() {

    const { id } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const [username, setUsername] = useState();
    const [blogData, setBlogData] = useState();
    const [value, setValue] = useState('');
    const [file, setFile] = useState();
    const [data, setData] = useState(() => {

        const localdata = JSON.parse(localStorage.getItem("currentFormData"));

        if (localdata) {
            return {
                title: localdata.title,
                subtitle: localdata.subtitle,
                body: "",
                attachment: "",
                createdBy: userId,
                createdAt: new Date(),
                modifiedBy: "",
                modifiedAt: "",
                status: "",
                url: localdata.url,
                publishDate: "",
                publishTime: ""
            }
        } else {
            return {
                title: "",
                subtitle: "",
                body: "",
                attachment: "",
                createdBy: userId,
                createdAt: new Date(),
                modifiedBy: "",
                modifiedAt: "",
                status: "",
                url: "",
                publishDate: "",
                publishTime: ""
            }
        }
    })
    const [currentFormData, setCurrentFromData] = useState({
        title: "",
        subtitle: "",
        body: "",
        attachment: ""
    })

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'link', 'image'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],

        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],

        ['clean']];

    const module = {
        toolbar: toolbarOptions,
    }

    useEffect(() => {
        fetchUser();
    }, []);


    const fetchUser = async () => {
        try {

            const userId = localStorage.getItem("userId");
            const response = await axios.get(`http://localhost:8000/api/user/${userId}`);

            setUsername(`${response.data.firstName} ${response.data.lastName}`);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/blog");
            const currentBlog = response.data.find((blog) => {
                return blog._id === id;
            })
            setBlogData(currentBlog);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = ({ currentTarget: input }) => {
        if (input.name === "url") {
            for (let letter of input.value) {
                if (letter === '/') {
                    toast.error("Invalid url!")
                    input.value = "";
                }
            }
        }
        setData({ ...data, [input.name]: input.value });
        setCurrentFromData({ ...currentFormData, [input.name]: input.value });
    }

    function handleClick(e) {
        if (!(data.title && data.subtitle && value && file.name && data.url)) {
            toast.error("Field cannot be empty.")
            return;
        }
        if (id) {
            handleUpdate(e, id);
        }
        else {
            handleSubmit(e);
        }
    }

    async function handleUpdate(e, id) {
        e.preventDefault();
        try {
            // data.createdBy = userId;
            data.modifiedBy = userId;
            data.modifiedAt = new Date();
            data.body = value;
            data.attachment = file.name;
            data.status = "Draft"; /// need to be change...

            const formData = new FormData();

            for (let key in data) {
                formData.append(key, data[key]);
            }

            const { data: res } = await axios.put(`http://localhost:8000/api/blog/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-http-method-override': 'PUT'
                }
            });
            console.log(res.message);

        } catch (err) {
            console.log(err.message);
        }

        localStorage.removeItem("currentFormData");
        navigate("/home");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // data.createdBy = userId;
        // data.createdAt = new Date();
        data.body = value;
        data.attachment = file;
        data.status = "Draft";

        const formData = new FormData()

        for (let key in data) {
            formData.append(key, data[key]);
        }

        try {
            const { data: res } = await axios.post("http://localhost:8000/api/blog", formData);
            toast.success(res.message);
        } catch (err) {
            toast.error(err.message);
        }

        localStorage.removeItem("currentFormData");
        navigate("/home");
    }

    const handlePublishChange = async (e) => {
        console.log(e.target.value);
        if (e.target.name === "date") {
            setData({ ...data, publishDate: e.target.value })
        }
        if (e.target.name === "time") {
            setData({ ...data, publishTime: e.target.value })
        }
    }

    const handlePublishClick = async (e) => {
        if (!(data.publishDate && data.publishTime)) {
            toast.error("Field cannot be empty.publishclick")
            return;
        }
        if (id) {
            handlePublishUpdate(e, id);
        }
        else {
            handlePublish(e);
        }
    }

    const handlePublishUpdate = async (e) => {
        e.preventDefault();
        console.log(data);
        data.modifiedAt = new Date();
        data.modifiedBy = userId;
        // data.createdBy = userId;
        data.body = value;
        data.attachment = file;
        data.status = "Scheduled";

        const formData = new FormData()
        for (let key in data) {
            formData.append(key, data[key]);
        }

        try {
            const { data: res } = await axios.put(`http://localhost:8000/api/blog/${id}`, formData);
            console.log(res.message);
        } catch (err) {
            console.log(err.message);
        }

        localStorage.removeItem("currentFormData");
        navigate("/home");
    }

    const handlePublish = async (e) => {
        e.preventDefault();

        console.log(data);
        // data.createdBy = userId;
        // data.createdAt = new Date();
        data.body = value;
        data.attachment = file;
        data.status = "Scheduled";

        const formData = new FormData()
        for (let key in data) {
            formData.append(key, data[key]);
        }

        try {
            const { data: res } = await axios.post("http://localhost:8000/api/blog", formData);
            console.log(res.message);
        } catch (err) {
            console.log(err.response.data.message);
        }


        localStorage.removeItem("currentFormData");
        navigate("/home");
    }

    const handlePreview = (e) => {
        e.preventDefault();

        if (!(data.title && data.subtitle && value && file)) {

            toast.error("Field cannot be empty");
            return;
        }

        currentFormData.body = value;
        currentFormData.attachment = file.name;

        localStorage.setItem("currentFormData", JSON.stringify(currentFormData));
        navigate("/blogpost");
    }

    const handleCancel = () => {
        localStorage.removeItem("currentFormData");
        navigate("/home");
    }

    return (
        <>
            <ToastContainer />

            {/* navbar */}
            <nav className="navbar d-flex navbar-expand-lg navbar-light">
                <button className="navbar-brand" onClick={() => { window.history.back() }}>
                    <IoChevronBack />
                </button>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active mt-3" aria-current="page" href="/home">
                            Home
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
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    <div className="buttons d-flex justify-content-center align-items-center ms-auto">
                        <div className="row">
                            <div className="dropdown col-md-auto">
                                <button className="menu" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    <SlOptions />
                                </button>

                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><a className="dropdown-item" href="" onClick={handlePreview}>Preview</a></li>
                                    <li><a className="dropdown-item" href="" onClick={handleCancel}>Cancel</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleClick}
                                >
                                    {id ? "Update" : "Save"}
                                </button>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                >
                                    Publish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <hr />


            {/* Dialog Box */}
            <div className="modal fade" id="exampleModal" tabndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Publish</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">* Publish Date</label>
                                    <input type="date" className="form-control" id="date" name="date" onChange={handlePublishChange}>
                                    </input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="time" className="form-label">* Publish Time</label>
                                    <input type="time" className="form-control" id="time" name="time" onChange={handlePublishChange}>
                                    </input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" data-dismiss="modal" style={{ border: "1px solid #D1D1DB" }}>Close</button>
                            <button type="button" className="btn btn-success" onClick={handlePublishClick}>Publish</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* form */}
            <div className="forms">
                <div className="row">
                    <div className="col1 col-lg-9 col-md-9 col-sm-12">
                        <div>
                            <form className="form-left" encType="multipart/form-data">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={data.title} placeholder="Enter title of your blog" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="subtitle" className="form-label">Sub Text</label>
                                    <input type="text" className="form-control" id="subtitle" name="subtitle" value={data.subtitle} placeholder="Enter sub-title of your blog" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Body</label>
                                    <ReactQuill modules={module} theme="snow" id="body" name="body" value={value} onChange={setValue} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="attachment" className="form-label">Attachment</label>
                                    <input type="file" className="form-control" name="attachment" id="attachment" onChange={e => setFile(e.target.files[0])} />
                                </div>
                                <p>Supported files: JPEG, PNG, JPG</p>

                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <div>
                            <form className="form-right">
                                <p>Configuration</p>
                                <hr />
                                <div className="mb-3">
                                    <label htmlFor="url" className="form-label">* URL</label>
                                    <input type="text" className="form-control" id="url" name="url" value={data.url} placeholder="Only write slag name, ex. homepage" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label html="username" className="form-label">Author</label>
                                    <input type="text" className="form-control" id="username" placeholder={username} style={{ backgroundColor: "#ffffff" }} disabled />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Show Author</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogFrom;