import "../../components/Login/Login.css";
import logo from "../../images/logo.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    let isBlogs = false;

    const navigate = useNavigate();

    const [err, setErr] = useState("");
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: res } = await axios.post("http://localhost:8000/api/login", data);

            console.log(res);
            localStorage.setItem("token", res.token);
            localStorage.setItem("userId", res.id);

            navigate("/notfound");

            // const blogResponse = await axios.get("http://localhost:8000/api/blog");
            // const blogs = blogResponse.data;

            // console.log(blogResponse);

            // if (blogs.length) {
            //     navigate("/home");
            // } else {
            //     navigate("/notfound");
            // }

        } catch (err) {
            if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                setErr(err.response.data.message);
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="header d-flex align-items-center justify-content-center">
                            <img src={logo} alt="Logo" />
                            <p className="m-0">Rapid Page Builder</p>
                        </div>
                        <div className="myForm">
                            <form onSubmit={handleSubmit}>
                                <p className="fw-bold">Login</p>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address *</label>
                                    <input type="email" className="form-control" id="email" name="email" value={data.email} placeholder="Enter your email address" onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password *</label>
                                    <input type="password" className="form-control" id="password" name="password" value={data.password} placeholder="Enter Password" onChange={handleChange} required />
                                </div>
                                <div className="mb-3 d-flex justify-content-between">
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Subscribe to our newsletter</label>
                                    </div>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Don't have an account? <a href="/">Signup</a></label>
                                </div>
                                <div className="privasyPolicy">
                                    Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <a href="#">privacy policy.</a>
                                </div>
                                {err && <div className="alert alert-danger" role="alert" style={{ marginTop: 15 }}>{err}</div>}
                                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
