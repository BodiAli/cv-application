import { useState } from "react";
import emailIcon from "../assets/email.svg";
import phoneIcon from "../assets/phone.svg";
import locationIcon from "../assets/location.svg";
import "../styles/Resume.css";

// TODO: style resume and add an edit functionality
function Resume({ formData, isActive, experienceData, educationData }) {
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

  function renderSection(arr, sectionTitle) {
    return (
      <div className="experience-container">
        {arr.map((section, index) => {
          console.log(sectionTitle);
          console.log(index);
          const isEditing = editSection === `${sectionTitle}-${index}`;
          return (
            <div key={index} className="experience-field-container">
              <button
                onClick={() => {
                  isEditing ? disableEdit() : enableEdit(`${sectionTitle}-${index}`);
                }}
              >
                {isEditing ? "Apply" : "Edit"}
              </button>
              {section.map((field) => {
                if (!Array.isArray(field.value)) {
                  return isEditing ? (
                    <input value={field.value} key={field.id} />
                  ) : (
                    <p key={field.id}>{field.value}</p>
                  );
                } else {
                  return (
                    <ul key={field.id} className="resume-list-container">
                      {field.value.map((value, index) =>
                        isEditing ? (
                          <li key={index}>
                            <input value={value} type="text" />
                          </li>
                        ) : (
                          <li key={index}>{value}</li>
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
          {renderSection(educationData, "Education")}
        </div>
        <div className="resume-section-container">
          <h2>Experience</h2>
          {renderSection(experienceData, "Experience")}
        </div>
      </div>
    </div>
  );
}

export default Resume;
