import { IoChevronBack } from "react-icons/io5";
import 'react-quill/dist/quill.snow.css';
import "../HorizontalNavbar.css";
import axios from "axios";
import { SlOptions } from "react-icons/sl";
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const BlogPost = () => {

  const _data = JSON.parse(localStorage.getItem("currentFormData"));
  console.log(_data);

  const { id } = useParams();
  const navigate = useNavigate();

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

  const [username, setusername] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");

      const user = response.data.find((user) => {
        return user.email === localStorage.getItem("userId");
      })
      setusername(`${user.firstName} ${user.lastName}`);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [blogData, setBlogData] = useState();

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

  const localdata = JSON.parse(localStorage.getItem("currentFormData"));

  const [value, setValue] = useState('');
  const [file, setFile] = useState();
  const [data, setData] = useState({
    title: localdata.title || "",
    subtitle: localdata.subtitle || "",
    body: "",
    attachment: "",
    createdBy: "",
    createdAt: new Date(),
    modifiedBy: "",
    modifiedAt: "",
    status: "",
    url: localdata.url || "",
    publishDate: "",
    publishTime: ""
  })

  // convert to base64
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file); //convert to base64

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  function handleClick(e) {
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
      data.modifiedBy = username;
      data.modifiedAt = new Date();
      data.body = value;
      data.attachment = file.name;
      // data.attachment = await convertToBase64(file);
      data.status = "Draft";
      console.log(data);

      const { data: res } = await axios.put(`http://localhost:8000/api/blog/${id}`, data);
      console.log(res.message);
    } catch (err) {
      console.log(err.message);
    }

    navigate("/home");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    data.createdBy = username;
    data.body = value;
    // data.attachment = await convertToBase64(file);
    data.attachment = file.name;
    data.status = "Draft";

    console.log(data);

    try {
      const { data: res } = await axios.post("http://localhost:8000/api/blog", data);
      console.log(res.message);
    } catch (err) {
      console.log(err.message);
    }

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

  const handlePublish = async (e) => {
    e.preventDefault();
    data.body = value;
    data.attachment = await convertToBase64(file);
    data.status = "Scheduled";

    try {
      const { data: res } = await axios.post("http://localhost:8000/api/blog", data);
      console.log(res.message);
    } catch (err) {
      console.log(err.message);
    }

    navigate("/home");
  }

  function handleback() {
    window.history.back();
  }

  return (
    <>
      {/* navbar */}
      <nav className="navbar d-flex navbar-expand-lg navbar-light">
        <button className="navbar-brand" onClick={() => {handleback()}}>
          <IoChevronBack />
        </button>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active mt-3" aria-current="page" href="/home">
              Preview
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
            {/* <div className="ms-auto"> */}
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <Link to="/home">
                  <button
                    type="button"
                    className="btn"
                    style={{ border: "1px solid #E1E1E8 " }}
                  >
                    Cancel
                  </button>
                </Link>
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
          {/* </div> */}
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
                    {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                  </input>
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">* Publish Time</label>
                  <input type="time" className="form-control" id="time" name="time" onChange={handlePublishChange}>
                    {/* <TimePicker onChange={onChange} value={value} /> */}
                  </input>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" data-dismiss="modal" style={{ border: "1px solid #D1D1DB" }}>Close</button>
              <button type="button" className="btn btn-success" onClick={handlePublish}>Publish</button>
            </div>
          </div>
        </div>
      </div>

    {/*preview */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-body">
                <IoChevronBack style={{ cursor: 'pointer' }} size={30} onClick={() => window.history.back()} />
                <h2 className="card-title">{_data.title}</h2>
                <h5 className="card-subtitle mb-4 text-muted">{_data.subtitle}</h5>
                <div className="card-text" dangerouslySetInnerHTML={{ __html: _data.body }}></div>
                {/* {attachments && attachments.length > 0 && ( */}
                <div className="mt-4">
                  <h5>Attachments:</h5>
                  <ul>
                    {_data.attachment}
                    {/* {attachments.map((attachment, index) => (
                      <li key={index}><a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.name}</a></li>
                    ))} */}
                  </ul>
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;

