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
      <Form>
        <p>
          <Field type="text" name="name" placeholder="Name" />
        </p>
        {errors.name && <p className="error">{errors.name}</p>}
        <p>
          <Field type="text" name="email" placeholder="Email" />
        </p>
        {errors.email && <p className="error">{errors.email}</p>}
        <p>
          <Field type="text" name="password" placeholder="Password" />
          {errors.password && <p className="error">{errors.password}</p>}
        </p>
        <p>
          <label className="checkbox-container">
            Agree to Terms of Service
            <Field
              type="checkbox"
              name="termsofservice"
              checked={values.termsofservice}
            />
          </label>
        </p>
        {errors.termsofservice && (
          <p className="error">{errors.termsofservice}</p>
        )}
        <p>
          <button type="submit">Submit!</button>
        </p>
      </Form>
      {user.map(el => (
        <ul key={el.id}>
          <li>Name: {el.name}</li>
          <li>Email: {el.email}</li>
          <li>Password: {el.password}</li>
          {/* <li>Agree to Terms: {el.termsofservice}</li> */}
        </ul>
      ))}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues({ user }) {
    return {
      termsofservice: false,
      name: "",
      email: "",
      password: ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(50, "Please enter no more than 50 characters"),
    email: Yup.string()
      .email("Email address isn't valid")
      .required("Email is required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum."),
    termsofservice: Yup.bool().oneOf([true], "Terms of service are required")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting! ", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data); // get just the user data from the REST api
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(UserForm); // currying functions in Javascript
console.log("This is the HOC", FormikUserForm);

// });

export default FormikUserForm;
