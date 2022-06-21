import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Help = () => {
  const [openModal] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div id="modal" className={`modal${openModal ? " is-active" : ""}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Guide</p>
            <button
              className="delete"
              aria-label="close"
              onClick={(e) => {
                navigate(-1);
              }}
            />
          </header>
          <section className="modal-card-body">
            <div className="content">
              <h2>Javscript and React Code Cells </h2>
              <p>
                Fully Featured Javascript notebook code cells for fast
                prototyping on the and ability to import any npm library (or css
                library on npm such as bulma). Code cells support cumulative
                code execution similar to Google Colab Use the built-in show
                function to preview your work. Syntax:{" "}
                <pre>
                  show(literal | variable | JSX.Element |{" "}
                  {"<YourCustomReactComponent />"} )
                </pre>{" "}
              </p>
              <blockquote>
                <h3>Note:</h3>
                Adding CSS is still beta, we recommend either using a css
                framework such as bulma css from npm or using JSX inline styles.
                Check the featured examples.
              </blockquote>
              <p>
                <a href="/" className="button is-primary">
                  Check Featured Examples
                </a>
              </p>
              <h2>Document Code with Markdown Cells</h2>
              <p>
                A good software engineer doesn't memorize. Instead, they know
                how to research. Add meaningful documentation to your code with
                Markdown cells so your research is done ahead of time!
              </p>
            </div>
          </section>
          <footer className="modal-card-foot">
            <a className="button is-primary" href="/createNotebook">
              Try it!
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};
