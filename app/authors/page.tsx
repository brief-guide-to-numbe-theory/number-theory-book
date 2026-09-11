import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";
import MathBackground from "../MathBackground";
import ScrollReveal from "../ScrollReveal";

export default function AuthorsPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "86px" }}>
        <section
          className="authors section"
          id="authors"
          style={{ minHeight: "calc(100vh - 86px)" }}
        >
          <MathBackground variant="dark" />
          <div className="section-label light">
            <span>02</span>
            <span>Authors</span>
          </div>

          <div className="section-heading" data-reveal>
            <h2>
              Two minds.
              <br />
              <em>One conversation.</em>
            </h2>

            <p>
              The book is designed as a dialogue between complementary
              mathematical instincts: seeing the structure and finding the next
              move.
            </p>
          </div>

          <div
            className="page-actions-row"
            data-reveal
            style={{ marginTop: "32px", marginBottom: "44px" }}
          >
            <Link className="navy-button" href="/">
              About the Book <span>&rarr;</span>
            </Link>
            <Link className="navy-button" href="/hints">
              Hints <span>&rarr;</span>
            </Link>
          </div>

          <div className="author-grid">
            <article className="author-card first" data-reveal>
              <div className="author-mark">
                <div
                  className="author-photo-slot"
                  title="Photo Placeholder (Add Aritra's picture here)"
                >
                  <div className="photo-placeholder-frame">
                    <svg
                      className="photo-icon"
                      width="38"
                      height="38"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span className="photo-label">Add Photo</span>
                  </div>
                  <span className="author-initial-badge">A</span>
                </div>
                <small>01</small>
              </div>

              <div className="author-copy">
                <p className="author-role">CO-AUTHOR &amp; MATH ENTHUSIAST</p>

                <h3>Aritra Saha</h3>

                <div className="author-bio">
                  <p>
                    I am Aritra Saha from Malda, West Bengal; as of 2026, I am a
                    Class 12 student and, most importantly, a Math Enthusiast.
                    I started preparing for the Math Olympiad when I was in Class
                    7. From the start, Number Theory was the one topic I was most
                    excited to study or to solve problems on (not because I was
                    bad at other topics).
                  </p>
                  <p>
                    I wrote my first INMO in 2023 when I was in Grade 8. In 2025
                    (class 10), after failing INMO by 4 marks, I was obviously
                    devastated. But my love for Number Theory kept me motivated;
                    around then, I thought I should probably write something on
                    Number Theory. Around that time, I saw Riddhiman publish one
                    of his handouts in Geometry, and I knew he was also very
                    interested in Number Theory in general. So, I reached out to
                    him about his project, and we started working on it
                    together. First, the idea was to maybe write a 50-page
                    handout. But, when we started writing it, we wanted to make
                    it in such a way that someone with basic knowledge about
                    Modular arithmetic can also understand; on the other hand,
                    we wanted to write advanced number-theoretic topics too. At
                    that point, I understood that a 50-page handout cannot be
                    sufficient, and the idea of writing a book came to mind for
                    both of us.
                  </p>
                  <p>
                    Around this time, I qualified for IOQM and RMO for the MO
                    25-26 cycle. Until then, we raced through writing all the
                    chapters. As I was preparing for JEE at the time, it was hard
                    to manage time for INMO preparation, JEE, and writing the
                    book. So, from December to January, and even February, we
                    took a long break. Even in that time, we wrote some pages,
                    but it was very slow paced. One of the fun facts is that,
                    before the day of INMO, to calm myself down, I was actually
                    writing the proof for Zsigmondy (though the book contains a
                    different proof than what I initially wrote), and if you
                    have seen the INMO 26 paper, you know the rest. And because
                    of that question, I qualified for INMO and became an INMO
                    Awardee that year.
                  </p>
                  <p>
                    Nevertheless, there were ups and downs after this, and we
                    finished the book around mid-June soon after IMOTC ended.
                    Finally, the book is being published; hopefully, you, as
                    readers, will like it and, most importantly, learn something
                    from it.
                  </p>
                </div>

                <div className="tags">
                  <span>INMO Awardee</span>
                  <span>IMOTC</span>
                  <span>Co-Author</span>
                  <span>Structure &amp; Proofs</span>
                </div>
              </div>
            </article>

            <article className="author-card second d1" data-reveal>
              <div className="author-mark">
                <div
                  className="author-photo-slot"
                  title="Photo Placeholder (Add Riddhiman's picture here)"
                >
                  <div className="photo-placeholder-frame">
                    <svg
                      className="photo-icon"
                      width="38"
                      height="38"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span className="photo-label">Add Photo</span>
                  </div>
                  <span className="author-initial-badge">R</span>
                </div>
                <small>02</small>
              </div>

              <div className="author-copy">
                <p className="author-role">CO-AUTHOR &amp; PROBLEM SOLVER</p>

                <h3>Riddhiman Seal</h3>

                <div className="author-bio">
                  <p>
                    I am Riddhiman Seal from Mumbai. I was born in Kolkata, but
                    I grew up in Mumbai. As of 2026, I am in grade 12. I got into
                    mathematics around grade 3 or 4. Of course, at that time, all
                    I did was school mathematics. Even during the lockdown (when
                    I was in grade 6 or 7), I did not do much math. I only
                    discovered Olympiads in grade 8 when my cousin told me about
                    them. Back then, solving even IOQM-level problems was a huge
                    challenge, but it felt fun and refreshing. After working on
                    Olympiad problems, I didn’t feel like doing school math at
                    all (because spamming formulas is super fun, right?).
                  </p>
                  <p>
                    Despite enjoying Olympiad math, I failed to clear even the
                    IOQM for my first two years, but I kept learning and
                    improving. In the initial stages, I preferred algebra; then,
                    for a while, I was a geometry main. However, outside of
                    Olympiads, while reading up on higher mathematics, number
                    theory always interested me the most. Learning about unsolved
                    problems felt intriguing. When I looked into Olympiad number
                    theory, I realized that apart from a very few &quot;standard&quot;
                    books, there were very few resources available, with most
                    scattered as handouts. I also noticed that certain ideas were
                    appearing more frequently in Olympiads, yet there were
                    almost no resources to practice them from.
                  </p>
                  <p>
                    This was around the time Aritra reached out to me, saying he
                    wanted to write something on number theory. Initially, we
                    thought it would just be a handout, but in no time 2 pages
                    turned into 10, then 20, then 40, and soon enough we had
                    crossed 100 pages. That was when we realized we had so much
                    to write that cutting it short would do an injustice to the
                    subject. So, we made a bold decision and decided to turn it
                    into an entire book.
                  </p>
                  <p>
                    Of course, the journey wasn’t smooth. At times, I felt I had
                    too much to balance and that writing a book was far too
                    ambitious. There were weeks when we wrote close to nothing,
                    and there were days when we wrote entire sections in one
                    sitting. Finally, the book is almost ready to be published (by
                    the time you read this, it will have been published).
                  </p>
                </div>

                <div className="tags">
                  <span>Geometry &amp; NT</span>
                  <span>Problem Solving</span>
                  <span>Co-Author</span>
                  <span>Olympiad Math</span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
