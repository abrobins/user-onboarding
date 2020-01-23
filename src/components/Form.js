import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values, status }) => {
  console.log("values", values);
  console.log("errors", errors);
  console.log("touched", touched);

  const [user, setUser] = useState([]);
  useEffect(() => {
    status && setUser(user => [...user, status]);
  }, [status]);

  return (
    <div className="user-form">
      <h1>User Onboarding Form</h1>
      {/* <Form></Form> */}
    </div>
  );
};

export default UserForm;
