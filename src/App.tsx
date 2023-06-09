import AgeApp from "./components/AgeApp/AgeApp";
import "./App.css";

function App() {
  return (
    <div className="principal-container">
      <header>navbar</header>
      <main>
        <AgeApp />
      </main>
      <footer>
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by{" Kenneth Fuentes "}
        <a target="_blank" href="https://github.com/Kenfu03/AgeCalculator">
          Kenfu03
        </a>
        .
      </footer>
    </div>
  );
}

export default App;
