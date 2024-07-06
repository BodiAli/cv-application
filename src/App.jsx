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
  const [listElements, setListElements] = useState({});

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

  function handleDeleteButton(buttonField, value) {
    const updatedData = formData.map((section) => {
      const updatedFields = section.fields.map((field) => {
        if (field.id === buttonField.id) {
          const newArr = [...field.arr];
          const index = newArr.indexOf(value);
          newArr.splice(index, 1);
          return { ...field, arr: [...newArr] };
        }

        return field;
      });
      return { ...section, fields: updatedFields };
    });

    updatedData.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.id === buttonField.id) {
          setListElements((prevListElements) => ({
            ...prevListElements,
            [buttonField.id]: field.arr,
          }));
        }
      });
    });

    setFormData(updatedData);
  }

  function handleFormSubmit(ev) {
    ev.preventDefault();
    formData.forEach((section) => {
      function updateStates(section, stateVariable, setStateVariable) {
        const fieldValues = section.fields.map((field) => {
          if (field.arr) {
            return { value: field.arr, id: field.id };
          } else {
            return { value: field.value, id: field.id };
          }
        });
        const isDuplicate = stateVariable.some((data) => {
          return (
            data.length === fieldValues.length &&
            data.every((obj, index) => {
              if (!Array.isArray(obj.value)) {
                return obj.value === fieldValues[index].value;
              } else if (Array.isArray(obj.value)) {
                if (obj.value.length !== fieldValues[index].value.length) {
                  return false;
                } else if (obj.value.length === 0 && fieldValues[index].value.length === 0) {
                  return true;
                } else {
                  return obj.value.every((string, index2) => {
                    return string === fieldValues[index].value[index2];
                  });
                }
              }
            })
          );
        });

        if (!isDuplicate) {
          setStateVariable((prevStateVariable) => [...prevStateVariable, fieldValues]);
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
          if (field.arr) {
            return { ...field, value: "", arr: [] };
          } else {
            return { ...field, value: "" };
          }
        }),
      };
    });

    initializeFormInputs.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.arr) {
          setListElements((prevListElements) => ({
            ...prevListElements,
            [field.id]: field.arr,
          }));
        }
      });
    });

    setFormData(initializeFormInputs);
    // console.log(educationData);
    // console.log(experienceData);
  }

  function onAddListClick(buttonField) {
    const updatedData = formData.map((section) => {
      const updatedFields = section.fields.map((field) => {
        if (field.id === buttonField.id) {
          if (!field.arr.includes(field.value) && field.value.trim() !== "") {
            return { ...field, arr: [...field.arr, buttonField.value], value: "" };
          }
        }

        return field;
      });
      return { ...section, fields: updatedFields };
    });

    updatedData.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.id === buttonField.id) {
          setListElements((prevListElements) => ({
            ...prevListElements,
            [buttonField.id]: field.arr,
          }));
        }
      });
    });

    setFormData(updatedData);
  }

  return (
    <>
      <Content
        onDelete={handleDeleteButton}
        onFormSubmit={handleFormSubmit}
        isActive={isActive}
        onButtonClick={onButtonClick}
        formData={formData}
        onAddListClick={onAddListClick}
        onInputChange={handleInputChange}
        listElements={listElements}
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
