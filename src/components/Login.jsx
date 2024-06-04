import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import useAuth from "../hooks/useAuth";
const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters"),
});

const Login = () => {
  const [serverError, setServerError] = useState("");
  const {setisLoggedIn} = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          setServerError("");

          try {
            const resp = await axios.post(
              `https://sapiensapi.onrender.com/api/login`,
              {
                username: values.username,
                password: values.password,
              },
              { withCredentials: true }
            );
            const data = await resp.data;
           // console.log(resp);
            if (data?.message == "Success") {
              setisLoggedIn(true)
             // console.log("Logged in successfully", resp.cookies);
              navigate("/color");
            }
          } catch (err) {
            if(!err?.response)
              setServerError("No Server Response!!")
          else if(err.response?.status===400)
            setServerError("Missing UserName or Password!")
          else if(err.response?.status===401)
            setServerError("Unauthorized!");
          else 
          setServerError("Login Falied!!")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="formContainer">
    <div className="formGroup">
      <label htmlFor="username" className="label">Username</label>
      <Field type="text" name="username" className="inputField" placeholder="Enter your username" />
      <ErrorMessage name="username" component="div" className="errorMessage" />
    </div>
    <div className="formGroup">
      <label htmlFor="password" className="label">Password</label>
      <Field type="password" name="password" className="inputField" placeholder="Enter your password" />
      <ErrorMessage name="password" component="div" className="errorMessage" />
    </div>
    {serverError && <div className="errorContainer">{serverError}</div>}
    <div>
      <button type="submit" disabled={isSubmitting} className="submitButton">
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </div>
  </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
