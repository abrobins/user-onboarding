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

        <p>
          <Field type="text" name="email" placeholder="Email" />
        </p>

        <p>
          <Field type="text" name="password" placeholder="Password" />
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
        <p>
          <button type="submit">Submit!</button>
        </p>
      </Form>
      {user.map(el => (
        <ul key={el.id}>
          <li>Name: {el.name}</li>
          <li>Email: {el.email}</li>
          <li>Password: {el.password}</li>
        </ul>
      ))}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues({ users }) {
    return {
      termsofservice: false,
      name: "",
      email: "",
      password: ""
    };
  },
  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting! ", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data); // get just the animal data from the REST api
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(UserForm); // currying functions in Javascript
console.log("This is the HOC", FormikUserForm);

// });

export default FormikUserForm;
