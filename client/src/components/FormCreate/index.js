import React, { useEffect, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { BiGridVertical } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import "./index.css";
import { useNavigate } from "react-router-dom";

const inputFields = [
  {
    id: "TEXT",
    inputType: "text",
    label: "Text",
  },
  {
    id: "NUMBER",
    inputType: "number",
    label: "Number",
  },
  { id: "EMAIL", inputType: "email", label: "Email" },
  { id: "PASSWORD", inputType: "password", label: "Password" },
  {
    id: "DATE",
    inputType: "date",
    label: "Date",
  },
];

const FormCreate = () => {
  const [formData, setFormData] = useState({
    title: "Untitled",
    inputFields: [],
  });
  const [editor, setEditor] = useState({
    id: "",
    editField: "",
    label: "",
    title: "",
    placeholder: "",
  });
  const [inputStatus, setInputStatus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [forms, setForms] = useState([]);
  const navigate = useNavigate("/");

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/forms"); // Adjust the endpoint as needed
        // if (!response.ok) {
        //   throw new Error("Failed to fetch forms");
        // }
        const formsData = await response.json();
        setForms(formsData);
      } catch (error) {
        console.log("Error fetching forms:", error.message);
      }
    };

    fetchForms();
  }, []);

  const validateFields = () => {
    const { title, inputFields } = formData;
    const titleFields = inputFields.filter((each) => each.title === "title");
    const formsTitle = forms.filter((each) => each.title === title);
    if (title === "Untitled" || title === "") {
      setErrMsg("Enter Proper Form Title");
    } else if (inputFields.length === 0) {
      setErrMsg("Please add at least 1 input field.");
    } else if (inputFields.length > 20) {
      setErrMsg("Please limit the input fields to 20 or fewer.");
    } else if (titleFields.length > 1) {
      setErrMsg("Form have multiple title fields");
    } else if (formsTitle.length > 0) {
      setErrMsg(`Form with title ${title} already exist`);
    } else {
      setIsSubmit(true);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmit) {
      setIsSubmit(false);
      try {
        const response = await fetch("http://localhost:4000/api/forms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            inputFields: formData.inputFields,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        
        navigate("/");
      } catch (error) {
        setErrMsg(error.message)
        console.error("There was an error submitting the form:", error);
      }
    }

    console.log("Form submitted:", formData);
  };

  const inputStatusChange = () => {
    setErrMsg("");
    setInputStatus(!inputStatus);
  };

  function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base36 string
    const randomString = Math.random().toString(36).substr(2, 5); // Generate random string

    return `${timestamp}-${randomString}`; // Combine timestamp and random string
  }

  const addInput = (input, label) => {
    setErrMsg("");
    const uniqueId = generateUniqueId();
    if (formData.inputFields.length < 20) {
      const inputField = {
        id: uniqueId,
        label,
        inputType: input,
        title: "title",

        placeholder: "placeholder",
      };
      setFormData({
        ...formData,
        inputFields: [...formData.inputFields, inputField],
      });
    } else {
      setErrMsg("Please limit the input fields to 20 or fewer.");
    }
  };

  const handleTitleFieldChange = (id, value) => {

    setErrMsg("");
    let foundInput = formData?.inputFields?.filter(
      (input) => input.title === value
    );

    if (foundInput.length === 0) {
      let modifiedList = formData.inputFields.map((input) => {
        if (input.id === id) {
          return {
            ...input,
            title: value,
          };
        } else {
          return input;
        }
      });
      console.log(formData);
      return { ...formData, inputFields: modifiedList };
    } else {
      setErrMsg(`input field with ${value} already exist`);
      let modifiedList = formData.inputFields.map((input) => {
        if (input.id === id) {
          return {
            ...input,
            title: value,
          };
        } else {
          return input;
        }
      });
      console.log(formData);
      return { ...formData, inputFields: modifiedList };
    }
  };

  const handlePlaceholderFieldChange = (id, value) => {
    let modifiedList = formData.inputFields.map((input) => {
      if (input.id === id) {
        return {
          ...input,
          placeholder: value,
        };
      } else {
        return input;
      }
    });
    return { ...formData, inputFields: modifiedList };
  };
  const deleteField = (id) => {
    setErrMsg("");
    let filteredList = formData.inputFields.filter((input) => input.id !== id);
    setFormData({ ...formData, inputFields: filteredList });
  };

  return (
    <div className="create-form-container">
      <h2 className="create-form-heading">Create New Form</h2>
      <div className="create-form-card">
        <div className="input-field-container grid-item">
          <div className="form-title-container">
            <h1 className="create-form-heading">{formData.title}</h1>
            <button
              className="icon-button"
              onClick={() =>
                setEditor({
                  ...editor,
                  editField: "title",
                  title: formData.title,
                })
              }>
              <RiPencilFill color="blue" size={25} />
            </button>
          </div>

          <div className="input-list-container">
            {formData?.inputFields?.map((input, index) => (
              <div className="list-item" key={index}>
                <BiGridVertical size={25} />
                <input
                  className="input-field-read"
                  type={input.type}
                  name={input.title}
                  value={input.title}
                  readOnly
                />
                <button
                  className="icon-button"
                  onClick={() =>
                    setEditor({
                      ...editor,
                      id: input.id,
                      editField: "input",
                      title: input.title,
                      placeholder: input.placeholder,
                      label: input.label,
                    })
                  }>
                  <RiPencilFill color="blue" size={25} />
                </button>
                <button
                  className="icon-button"
                  onClick={() => deleteField(input.id)}>
                  <MdDelete color="red" size={25} />
                </button>
              </div>
            ))}
          </div>

          {!inputStatus ? (
            <button
              className="add-input-btn"
              onClick={() => inputStatusChange()}>
              ADD INPUT
            </button>
          ) : (
            <>
              <button
                className="add-input-btn"
                onClick={() => inputStatusChange()}>
                CLOSE ADD INPUT
              </button>

              <div className="input-btn-container">
                {inputFields.map((field) => (
                  <button
                    key={field.id}
                    className="input-type-btn"
                    onClick={() => {
                      addInput(field.inputType, field.label);
                    }}>
                    {field.id}
                  </button>
                ))}
              </div>
            </>
          )}
          <button
            className="submit-btn"
            onClick={() => {
              validateFields();
            }}>
            Submit
          </button>
        </div>
        <div className="form-editor grid-item">
          <h1 className="edit-form-heading">Form Editor</h1>
          <div className="editor-form">
            {editor.editField === "title" ? (
              <div className="input-box">
                <input
                  className="input-field"
                  type="text"
                  name="title"
                  placeholder=""
                  value={editor.title}
                  required
                  onChange={(e) => {
                    setErrMsg("");
                    setEditor({ ...editor, title: e.target.value });
                    setFormData({ ...formData, title: e.target.value });
                  }}
                />
                <label className="form-label">Title</label>
              </div>
            ) : editor.editField === "input" ? (
              <>
                <h1 className="editor-form-heading">{editor.label}</h1>
                <div className="input-box">
                  <input
                    className="input-field"
                    type="text"
                    name="title"
                    placeholder=""
                    value={editor.title}
                    required
                    onChange={(e) => {
                      setEditor({ ...editor, title: e.target.value });
                      setFormData(
                        handleTitleFieldChange(editor.id, e.target.value)
                      );
                    }}
                  />
                  <label className="form-label">Title</label>
                </div>
                <div className="input-box">
                  <input
                    className="input-field"
                    type="text"
                    name="placeholder"
                    placeholder=""
                    required
                    value={editor.placeholder}
                    onChange={(e) => {
                      setEditor({ ...editor, placeholder: e.target.value });
                      setFormData(
                        handlePlaceholderFieldChange(editor.id, e.target.value)
                      );
                    }}
                  />
                  <label className="form-label">Placeholder</label>
                </div>
              </>
            ) : (
              <p> select to see the editor</p>
            )}
          </div>
        </div>
      </div>
      {errMsg !== "" ? <p className="err-msg">{errMsg}</p> : null}
      <button
        className="submit-btn create-form-btn"
        onClick={(e) => {
          handleSubmit(e);
        }}
        disabled={!isSubmit}>
        CREATE FORM
      </button>
    </div>
  );
};

export default FormCreate;
