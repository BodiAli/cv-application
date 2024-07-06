import Section from "./Section";
import "../styles/Content.css";

function Content({
  formData,
  onInputChange,
  onAddListClick,
  onButtonClick,
  onFormSubmit,
  isActive,
  listElements,
  onDelete,
}) {
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
        <form onSubmit={onFormSubmit}>
          <div className="container">
            {formData.map((section) => {
              return (
                <Section
                  onDelete={onDelete}
                  onAddListClick={onAddListClick}
                  key={section.id}
                  section={section}
                  onInputChange={onInputChange}
                  listElements={listElements}
                />
              );
            })}
            <button className="save-changes" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Content;
