import { useState } from "react";
import Content from "./components/Content";
import Resume from "./components/Resume";
import formInformation from "./data/information";
import "./App.css";

function App() {
  const [formData, setFormData] = useState(formInformation);

  function handleInputChange(sectionId, fieldId, value) {
    const updatedFormData = formData.map((section) => {
      if (section.id === sectionId) {
        const updatedFields = section.fields.map((field) => {
          if (field.id === fieldId) {
            return { ...field, value };
          }
          return field;
        });
        return { ...section, fields: updatedFields };
      }
      return section;
    });
    setFormData(updatedFormData);
  }

  return (
    <>
      <Content formData={formData} onInputChange={handleInputChange} />
      <Resume formData={formData} />
    </>
  );
}

export default App;
