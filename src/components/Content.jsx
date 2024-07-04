import Section from "./Section";
import "../styles/Content.css";


function Content({ formData, onInputChange, onButtonClick, isActive }) {
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div onClick={onButtonClick} className="view-cv">
            <h2>Click To View CV</h2>
            <button className={"hamburger " + (isActive ? "is-active" : "")}>
              <div className="bar"></div>
            </button>
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
