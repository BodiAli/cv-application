import { useState } from "react";
import Content from "./components/Content";
import Resume from "./components/Resume";
import formInformation from "./data/information";
import "./App.css";

function App() {
  const [formData, setFormData] = useState(formInformation);
  const [isActive, setIsActive] = useState(true);

  function onButtonClick() {
    setIsActive(!isActive);
  }

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
      <Content
        isActive={isActive}
        onButtonClick={onButtonClick}
        formData={formData}
        onInputChange={handleInputChange}
      />
      <Resume isActive={isActive} formData={formData} />
    </>
  );
}

export default App;
