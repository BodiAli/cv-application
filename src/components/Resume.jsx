import "../styles/Resume.css";

function Resume({ formData, isActive }) {
  let details;
  const resumeData = formData.map((section) => {
    if (section.title === "Personal Details") {
      let fullName = "";

      {
        const personalInfo = section.fields.map((field) => {
          if (field.label === "Full Name") {
            fullName = field.value;
            return null;
          } else {
            return <p key={field.id}>{field.value}</p>;
          }
        });

        const filteredPersonalInfo = personalInfo.filter((info) => info !== null);
        details = (
          <div className="personal-details">
            <h2>{fullName}</h2>
            <div className="personal-info">{filteredPersonalInfo}</div>
          </div>
        );
      }
    } else {
      details = (
        <div className="experience-container">
          {section.fields.map((field) => {
            return <p key={field.id}>{field.value}</p>;
          })}
        </div>
      );
    }
    return (
      <div className="resume-container" key={section.id}>
        <h2>{section.title}</h2>
        {details}
      </div>
    );
  });

  return (
    <div className={`resume ${isActive ? "visible" : "hidden"}`}>
      <div className="container">{resumeData}</div>
    </div>
  );
}

export default Resume;
