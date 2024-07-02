import "../styles/Section.css";

function Section({ information }) {
  return (
    <section>
      <h2>{information.title}</h2>
      {information.fields.map((field, index) => {
        return (
          <label key={index}>
            {field.label}
            <input defaultValue={!Array.isArray(field.value) ? field.value : "kool"} type="text" />
          </label>
        );
      })}
    </section>
  );
}
export default Section;
