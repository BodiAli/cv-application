import plusIcon from "../assets/plus-icon.svg";
import "../styles/Section.css";

function Input({ id, type, autoComplete, value, onChange }) {
  return (
    <input
      className="input"
      id={id}
      type={type}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      required
    ></input>
  );
}

function Section({ section, onAddListClick, onInputChange, listElements, onDelete }) {
  return (
    <section className="section">
      <h2 className="section-header">{section.title}</h2>
      {section.fields.map((field) => {
        const fieldListElements = listElements[field.id] || [];

        return (
          <div key={field.id} className="field-container">
            <label htmlFor={field.id}>{field.label}</label>
            <div className="add-list-container">
              <Input
                id={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                value={field.value}
                onChange={(e) => {
                  onInputChange(section.id, field.id, e.target.value);
                }}
              />
              {field.canAdd && (
                <button type="button" onClick={() => onAddListClick(field)} className="add-list-button">
                  <img src={plusIcon} alt="Add List" />
                </button>
              )}
            </div>
            {field.canAdd && (
              <ul className="list-container">
                {fieldListElements.map((element, index) => {
                  return (
                    <div key={index}>
                      <li>{element}</li>
                      <button type="button" onClick={() => onDelete(field, element)}>
                        Delete
                      </button>
                    </div>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </section>
  );
}
export default Section;
