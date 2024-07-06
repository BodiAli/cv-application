import emailIcon from "../assets/email.svg";
import phoneIcon from "../assets/phone.svg";
import locationIcon from "../assets/location.svg";
import "../styles/Resume.css";

//TODO: style resume and add an edit functionality

function Resume({ formData, isActive, experienceData, educationData }) {
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
  });

  const educationElement = (
    <div className="experience-container">
      {educationData.map((section) => {
        return section.map((field) => {
          if (!Array.isArray(field.value)) {
            return <p key={field.id}>{field.value}</p>;
          } else {
            return (
              <ul key={field.id}>
                {field.value.map((value, index) => {
                  return <li key={index}>{value}</li>;
                })}
              </ul>
            );
          }
        });
      })}
    </div>
  );

  const experienceElement = (
    <div className="experience-container">
      {experienceData.map((section) => {
        return section.map((field) => {
          if (!Array.isArray(field.value)) {
            return <p key={field.id}>{field.value}</p>;
          } else {
            return (
              <ul key={field.id}>
                {field.value.map((value, index) => {
                  return <li key={index}>{value}</li>;
                })}
              </ul>
            );
          }
        });
      })}
    </div>
  );

  return (
    <div className={`resume ${isActive ? "visible" : "hidden"}`}>
      <div className="resume-container">
        <div className="resume-section-container">{resumeData}</div>
        <div className="resume-section-container">
          <h2>Education</h2>
          {educationElement}
        </div>
        <div className="resume-section-container">
          <h2>Experience</h2>
          {experienceElement}
        </div>
      </div>
    </div>
  );
}

export default Resume;
