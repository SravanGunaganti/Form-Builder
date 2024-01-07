import React, { useEffect, useState } from "react";

import "./index.css";
import { useNavigate, useParams } from "react-router-dom";

const FormView = () => {
  const [formData, setFormData] = useState({
    title: "",
    inputFields: [],
  });
  const [initialFormData, setInitialFormData] = useState({
    title: "",
    inputFields: [],
  });
  const [form, setForm] = useState({});

  const [errMsg, setErrMsg] = useState("");

  const { id } = useParams();
  const navigate =useNavigate();
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/forms/${id}`);
        if (!response.ok) {
          navigate("/")
          throw new Error(`Failed to fetch forms or Form with id '${id}' not Found `);
        }
        const formsData = await response.json();

        const formObj = {};
        const modData = formsData.inputFields.map((each) => {
          return { ...each, value: "" };
        });
        setFormData({ ...formsData, inputFields: modData });
        formsData.inputFields.forEach((each) => {
          formObj[each.title] = "";
        });
        setForm({ ...formObj });
        setInitialFormData({ ...formsData });
      } catch (error) {
        setErrMsg(error.message);
      }
    };

    fetchForms();
    // eslint-disable-next-line
  }, [id]);

  const handleInput = (id, val) => {
    setErrMsg("");
    console.log(id, val);
    const modifiedFields = formData.inputFields.map((input) => {
      if (input.id === id) {
        setForm({ ...form, [input.title]: val });
        return {
          ...input,
          value: val,
        };
      } else {
        return input;
      }
    });
    setFormData({ ...formData, inputFields: modifiedFields });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = formData.inputFields.filter((input) => input.value === "");
    console.log("empty", isEmpty);
    if (isEmpty.length === 0) {
      console.log(form);

      alert("check the output in the console");
      setFormData(initialFormData);
    } else {
      setErrMsg("Enter all input fields");
    }
  };

  return (
    <div className="create-form-container">
      <div className="form-container-card">
        <h2 className="create-form-heading">{formData.title}</h2>
        <form className="form-container">
          <ul className="input-list">
            {formData?.inputFields?.map((field, index) => (
              <li className="input-field-box" key={field.id}>
                <input
                  className="form-input-field "
                  type={field.inputType}
                  placeholder={field.placeholder}
                  value={field.value || ""}
                  required
                  onChange={(e) => handleInput(field.id, e.target.value)}
                />

                <label className="form-input-label">{field.title}</label>
              </li>
            ))}
          </ul>
        </form>
        {errMsg !== "" ? <p className="err-msg">{errMsg}</p> : null}
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormView;
