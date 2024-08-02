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

  const [value, setValue] = useState();
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

  return (
    <>
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

