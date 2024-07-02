import Section from "./Section";
import formInformation from "../data/information";
import "../styles/Content.css";

function Content() {
  return (
    <main>
      {formInformation.map((info) => {
        return <Section key={info.id} information={info} />;
      })}
    </main>
  );
}

export default Content;
