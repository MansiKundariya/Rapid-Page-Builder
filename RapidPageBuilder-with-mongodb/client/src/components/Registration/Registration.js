import "../../components/Registration/Registration.css";
import logo from "../../images/logo.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";

function Registration() {

    const navigate = useNavigate();

    const [err, setErr] = useState("");
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            setErr("Confirm passsword is not matched");
            return;
        }

        try {
            const { data: res } = await axios.post("http://localhost:8000/api/users", data);
            navigate("/login");
            toast(res.message);
        } catch (err) {
            if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                setErr(err.response.data.message);
            }
        }
    }

    return (
        <>
        <ToastContainer/>
            <div className="containers">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="header d-flex align-items-center justify-content-center">
                            <img src={logo} alt="Logo" />
                            <p className="m-0">Rapid Page Builder</p>
                        </div>
                        <div className="myForm">
                            <form onSubmit={handleSubmit}>
                                <p className="fw-bold">Register</p>
                                <div className="mb-3">
                                    <label htmlFor="fname" className="form-label">First Name *</label>
                                    <input type="text" className="form-control" id="fname" name="firstName" value={data.firstName} placeholder="Enter your first name" onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lname" className="form-label">Last Name *</label>
                                    <input type="text" className="form-control" id="lname" name="lastName" value={data.lastName} placeholder="Enter your last name" onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">email address *</label>
                                    <input type="email" className="form-control" id="email" name="email" value={data.email} placeholder="Enter your email address" onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pass" className="form-label">Password *</label>
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cpass" className="form-label">Confirm Password *</label>
                                    <input type="password" className="form-control" id="cpassword" name="confirmPassword" placeholder="Re-enter your password" onChange={handleChange} required />
                                </div>
                                <div className="mb-3 d-flex justify-content-between">
                                    <div className="mb-3 form-check">
                                        {/* <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Subscribe to our newsletter</label> */}
                                    </div>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Already have an account? <a href="/login">Login</a></label>
                                </div>
                                <div className="privasyPolicy">
                                    Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <a href="/privasyPolicy">privacy policy.</a>
                                </div>
                                {err && <div className="alert alert-danger" role="alert" style={{ marginTop: 15 }}>
                                    {err}
                                </div>}
                                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Registration;
