import { useState } from "react";
import Content from "./components/Content";
import Resume from "./components/Resume";
import formInformation, { educationArray, experienceArray } from "./data/information";
import "./App.css";

function App() {
  const [formData, setFormData] = useState(formInformation);
  const [educationData, setEducationData] = useState(educationArray);
  const [experienceData, setExperienceData] = useState(experienceArray);
  const [isActive, setIsActive] = useState(false);

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

  function handleFormSubmit(ev) {
    ev.preventDefault();
    formData.forEach((section) => {
      function updateStates(section, stateVariable, setStateVariable) {
        const fieldValues = section.fields.map((field) => ({ value: field.value, id: field.id }));

        const isDuplicate = stateVariable.some((data) => {
          return (
            data.length === fieldValues.length &&
            data.every((obj, index) => {
              if (!Array.isArray(obj.value)) {
                return obj.value === fieldValues[index].value;
              } else if (Array.isArray(obj.value)) {
                return (
                  obj.value.length === fieldValues[index].value.length &&
                  obj.value.every((string, index) => {
                    return string === fieldValues[index].value[index];
                  })
                );
              }
            })
          );
        });

        if (!isDuplicate) {
          setStateVariable((prevEducationData) => [...prevEducationData, fieldValues]);
        }
      }

      if (section.title === "Education") {
        updateStates(section, educationData, setEducationData);
      } else if (section.title === "Experience") {
        updateStates(section, experienceData, setExperienceData);
      }
    });

    const initializeFormInputs = formData.map((section) => {
      if (section.title === "Personal Details") {
        return {
          ...section,
        };
      }
      return {
        ...section,
        fields: section.fields.map((field) => {
          return { ...field, value: "" };
        }),
      };
    });

    setFormData(initializeFormInputs);
    // console.log(educationData);
    // console.log(experienceData);
  }

  return (
    <>
      <Content
        onFormSubmit={handleFormSubmit}
        isActive={isActive}
        onButtonClick={onButtonClick}
        formData={formData}
        onInputChange={handleInputChange}
      />
      <Resume
        educationData={educationData}
        experienceData={experienceData}
        isActive={isActive}
        formData={formData}
      />
    </>
  );
}

export default App;
