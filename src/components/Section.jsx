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
    ></input>
  );
}

function Section({ section, onInputChange }) {
  return (
    <section className="section">
      <h2 className="section-header">{section.title}</h2>
      {section.fields.map((field) => {
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
                <button className="add-list-button">
                  <img src={plusIcon} alt="Add List" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
export default Section;
