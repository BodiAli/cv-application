import { useState } from "react";
import emailIcon from "../assets/email.svg";
import phoneIcon from "../assets/phone.svg";
import locationIcon from "../assets/location.svg";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";
import "../styles/Resume.css";

function Resume({
  formData,
  isActive,
  experienceData,
  educationData,
  handleEdit,
  handleDeleteListItem,
  handleDeleteSection,
  setExperienceData,
  setEducationData,
}) {
  const [editSection, setEditSection] = useState(null);

  function enableEdit(sectionId) {
    setEditSection(sectionId);
  }

  function disableEdit() {
    setEditSection(null);
  }

  const resumeData = formData.map((section) => {
    if (section.title === "Personal Details") {
      let fullName = "";

      const personalInfo = section.fields.map((field) => {
        if (field.label === "Full Name") {
          fullName = field.value;
          return null;
        } else {
          return (
            <div className="personal-icon-container" key={field.id}>
              <img
                src={
                  field.label === "Email"
                    ? emailIcon
                    : field.label === "Phone Number"
                    ? phoneIcon
                    : locationIcon
                }
                alt=""
              />
              <p>{field.value}</p>
            </div>
          );
        }
      });

      const filteredPersonalInfo = personalInfo.filter((info) => info !== null);
      return (
        <div key={section.id} className="personal-details">
          {fullName && <h2>{fullName}</h2>}
          <div className="personal-info">{filteredPersonalInfo}</div>
        </div>
      );
    }
    return null;
  });

  function renderSection(arr, sectionTitle, setStateVariable) {
    return (
      <div className="experience-container">
        {arr.map((section, index) => {
          const isEditing = editSection === `${sectionTitle}-${index}`;
          return (
            <div key={index} className={`experience-field-container${isEditing ? " edit" : ""}`}>
              <div className="buttons-container">
                <button
                  className={isEditing ? "apply-edit" : ""}
                  onClick={() => {
                    isEditing ? disableEdit() : enableEdit(`${sectionTitle}-${index}`);
                  }}
                >
                  {isEditing ? "Apply" : <img src={editIcon} />}
                </button>
                <button onClick={() => handleDeleteSection(section, arr, setStateVariable)}>
                  <img src={deleteIcon} alt="" />
                </button>
              </div>
              {section.map((field) => {
                if (!Array.isArray(field.value)) {
                  return isEditing ? (
                    <input
                      name="field-value"
                      onChange={(ev) => handleEdit(field, arr, setStateVariable, ev.target.value)}
                      value={field.value}
                      key={field.id}
                    />
                  ) : (
                    <p key={field.id}>{field.value}</p>
                  );
                } else {
                  return (
                    <ul key={field.id} className="resume-list-container">
                      {field.value.map((value, index) =>
                        isEditing ? (
                          <li key={index}>
                            <input
                              name="list-value"
                              onChange={(ev) =>
                                handleEdit(field, arr, setStateVariable, ev.target.value, index)
                              }
                              value={value}
                              type="text"
                            />
                            <button
                              onClick={() => handleDeleteListItem(field, arr, setStateVariable, index)}
                              type="button"
                            >
                              Delete
                            </button>
                          </li>
                        ) : (
                          <li key={index}>- {value}</li>
                        )
                      )}
                    </ul>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`resume ${isActive ? "visible" : "hidden"}`}>
      <div className="resume-container">
        <div className="resume-section-container">{resumeData}</div>
        <div className="resume-section-container">
          <h2>Education</h2>
          {renderSection(educationData, "Education", setEducationData)}
        </div>
        <div className="resume-section-container">
          <h2>Experience</h2>
          {renderSection(experienceData, "Experience", setExperienceData)}
        </div>
      </div>
    </div>
  );
}

export default Resume;
