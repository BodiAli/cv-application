import "../styles/Resume.css";

function Resume({ formData }) {
  return (
    <div className="resume">
      <div className="container">
        {formData.map((section) => {
          return (
            <div className="resume-container" key={section.id}>
              <h2>{section.title}</h2>
              <ul>
                {section.fields.map((field) => {
                  return (
                    <li key={field.id}>
                      {field.label}: {field.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Resume;
