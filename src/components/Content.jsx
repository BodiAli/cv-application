import Section from "./Section";
import "../styles/Content.css";

//TODO: Make hamburger button and make the resume come down from the top

function Content({ formData, onInputChange }) {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="view-cv">
            <h2>Click To View CV Add</h2>
            <button>ADD</button>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="container">
          {formData.map((section) => {
            return <Section key={section.id} section={section} onInputChange={onInputChange} />;
          })}
        </div>
      </main>
    </>
  );
}

export default Content;
