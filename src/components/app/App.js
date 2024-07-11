import PageWrapper from "../layout/page-wrapper/page-wrapper.jsx";
import cardData from "../../server/server.js";
import "../../styles/styles.css";

function App() {
  return <PageWrapper cards={cardData} />;
}

export default App;
