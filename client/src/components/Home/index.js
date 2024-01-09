import React, { useState, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/forms");
        if (!response.ok) {
          throw new Error("Failed to fetch forms");
        }
        const formsData = await response.json();
        setForms(formsData);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  const handleDelete = async (formId) => {
    const modifiedForms = forms.filter((form) => form._id !== formId);
    setForms(modifiedForms);
    try {
      const response = await fetch(
        `http://localhost:4000/api/forms/${formId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Form deleted successfully");
      } else {
        console.error("Failed to delete form");
      }
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  return (
    <div className="bg-container">
      <div className="home-container">
        <div className="header">
          <h1 className="header-heading">Welcome to Form.com</h1>
          <p className="header-description">This is a simple form builder</p>

          <Link to={"/form/create"} >
            <button className="new-form-btn">CREATE NEW FORM</button>
          </Link>
        </div>
        <hr className="line" />
        <div className="forms-list-container">
          <h1 className="forms-list-heading">Forms</h1>
          {forms.length !== 0 ? (
            <ul className="forms-list">
              {forms.map((form) => (
                <li className="form-card" key={form._id}>
                  <h1 className="form-title">{form.title}</h1>

                  <div className="form-btn-container">
                    <Link to={`/form/${form._id}`} className="menu-btn">
                      <button className="form-card-btn view">View</button>
                    </Link>
                    <Link to={`/form/${form._id}/edit`} className="menu-btn">
                      <button className="form-card-btn edit">Edit</button>
                    </Link>

                    <button
                      className="form-card-btn delete"
                      onClick={() => {
                        handleDelete(form._id);
                      }}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="header-description">You have no forms created yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
