export default function Sections() {
  return (
    <>
      <section className="general section" id="general">
        <div className="section-label">
          <span>01</span>
          <span>General</span>
        </div>

        
        <div className="placeholder">
          <div className="placeholder-copy">
            <p className="micro-label">
              RESERVED FOR BOOK INFORMATION
            </p>

            <h2>
              General content
              <br />
              <em>coming soon.</em>
            </h2>

            <p>
              This section is a placeholder for the book overview,
              introductory note, chapter summary, and other general
              information.
            </p>
          </div>

          <div
            className="placeholder-sheet"
            aria-hidden="true"
          >
            <span>GENERAL</span>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <strong>01</strong>
          </div>
        </div>
      </section>

      <section className="authors section" id="authors">
        <div className="section-label light">
          <span>02</span>
          <span>Authors</span>
        </div>

        <div className="section-heading">
          <h2>
            Two minds.
            <br />
            <em>One conversation.</em>
          </h2>

          <p>
            The book is designed as a dialogue between complementary
            mathematical instincts: seeing the structure and finding
            the next move.
          </p>
        </div>

        <div className="author-grid">
          <article className="author-card first">
            <div className="author-mark">
              <span>A</span>
              <small>01</small>
            </div>

            <div className="author-copy">
              <p className="author-role">
                THE STRUCTURALIST
              </p>

              <h3>Author One</h3>

              <p>
                Brings the broad view—connecting definitions,
                proofs, and recurring patterns so each new idea
                has a natural place in the larger story.
              </p>

              <div className="tags">
                <span>Clarity</span>
                <span>Proof</span>
                <span>Structure</span>
              </div>
            </div>
          </article>

          <article className="author-card second">
            <div className="author-mark">
              <span>B</span>
              <small>02</small>
            </div>

            <div className="author-copy">
              <p className="author-role">
                THE PROBLEM-SOLVER
              </p>

              <h3>Author Two</h3>

              <p>
                Keeps the mathematics moving—offering examples,
                tactical questions, and the carefully timed nudge
                that helps a stuck idea unfold.
              </p>

              <div className="tags">
                <span>Examples</span>
                <span>Strategy</span>
                <span>Insight</span>
              </div>
            </div>
          </article>
        </div>

        <p className="author-note">
          Author names and biographies can be replaced when the final
          details are supplied.
        </p>
      </section>

      <section className="hints section" id="hints">
        <div className="section-label">
          <span>03</span>
          <span>Hints</span>
        </div>

        <div className="section-heading">
          <div>
            <p className="micro-label">
              A NUDGE, NOT A SPOILER
            </p>

            <h2>
              Find your
              <br />
              <em>next move.</em>
            </h2>
          </div>

          <p>
            Five hundred numbered prompts, kept out of sight until
            you need one. Enter the complete three-digit number to
            reveal only that hint.
          </p>
        </div>

        <form
          className="lookup-form"
          id="hintLookup"
          noValidate
        >
          <label htmlFor="hintNumber">
            Enter a three-digit hint number
          </label>

          <div className="lookup-row">
            <div className="number-field">
              <span aria-hidden="true">#</span>

              <input
                id="hintNumber"
                name="hintNumber"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{3}"
                maxLength={3}
                placeholder="001"
                autoComplete="off"
                aria-describedby="hintHelp hintError"
              />
            </div>

            <button
              id="revealHint"
              type="submit"
              disabled
            >
              Reveal hint{" "}
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          <p
            className="lookup-help"
            id="hintHelp"
          >
            Enter the full number from 001 to 500.
            Partial numbers reveal nothing.
          </p>

          <p
            className="hint-error"
            id="hintError"
            role="alert"
            hidden
          ></p>
        </form>

        <article
          className="hint-result"
          id="hintResult"
          aria-live="polite"
          hidden
        >
          <p className="result-label">
            YOUR HINT
          </p>

          <p className="revealed-hint">
            <span
              className="hint-number"
              id="resultNumber"
            ></span>

            <span className="hint-colon">:</span>

            <span id="resultText"></span>
          </p>

          <button
            id="hideHint"
            type="button"
          >
            Hide this hint
          </button>
        </article>
      </section>
    </>
  );
}
