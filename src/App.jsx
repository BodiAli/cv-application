import { useState } from "react";
import Content from "./components/Content";
import Resume from "./components/Resume";
import formInformation, { educationArray, experienceArray } from "./data/information";
import "./App.css";

function App() {
  const [formData, setFormData] = useState(formInformation);
  const [educationData, setEducationData] = useState(educationArray);
  const [experienceData, setExperienceData] = useState(experienceArray);

  const initialState = window.innerWidth >= 700;
  const [isActive, setIsActive] = useState(initialState);

  const [listElements, setListElements] = useState({});

  function handleEdit(buttonField, arr, setStateVariable, value, buttonFieldIndex) {
    const updatedData = arr.map((section) => {
      return section.map((field) => {
        if (field.id === buttonField.id) {
          if (Array.isArray(field.value)) {
            return {
              ...field,
              value: field.value.map((val, index) => {
                if (index === buttonFieldIndex) {
                  return value;
                }
                return val;
              }),
            };
          }

          return { ...field, value };
        }
        return field;
      });
    });
    setStateVariable(updatedData);
  }

  function handleDeleteSection(buttonSection, arr, setStateVariable) {
    const index = arr.indexOf(buttonSection);

    const copyArray = [...arr];

    copyArray.splice(index, 1);

    setStateVariable(copyArray);
  }

  function handleDeleteListItem(buttonField, arr, setStateVariable, buttonFieldIndex) {
    const updatedData = arr.map((section) => {
      return section.map((field) => {
        if (field.id === buttonField.id && Array.isArray(field.value)) {
          return {
            ...field,
            value: field.value.filter((_, index) => index !== buttonFieldIndex),
          };
        }
        return field;
      });
    });
    setStateVariable(updatedData);
  }

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

    let isValid = true;

    formData.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.canAdd && (!listElements[field.id] || listElements[field.id].length === 0)) {
          isValid = false;
          alert(`Please add at least one item to the ${field.label} list in the ${section.title} section.`);
        }
      });
    });

    if (!isValid) {
      return;
    }

    formData.forEach((section) => {
      function updateStates(section, stateVariable, setStateVariable) {
        const fieldValues = section.fields.map((field) => {
          if (field.arr) {
            return { value: field.arr, id: crypto.randomUUID() };
          } else {
            return { value: field.value, id: crypto.randomUUID() };
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
        setEducationData={setEducationData}
        setExperienceData={setExperienceData}
        handleEdit={handleEdit}
        handleDeleteListItem={handleDeleteListItem}
        handleDeleteSection={handleDeleteSection}
        educationData={educationData}
        experienceData={experienceData}
        isActive={isActive}
        formData={formData}
      />
    </>
  );
}

export default App;
