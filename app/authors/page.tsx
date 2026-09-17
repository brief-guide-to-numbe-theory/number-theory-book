import Link from "next/link";
import Image from "next/image";
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
            <span>2</span>
            <span>Authors</span>
          </div>

          <div className="section-heading authors-heading" data-reveal>
            <h2 className="authors-title">
              About the <em>Authors.</em>
            </h2>
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
                <div className="author-photo-slot author-photo-real">
                  <Image
                    src="/aritra-saha.jpg"
                    alt="Aritra Saha"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    sizes="(max-width: 960px) 90vw, 280px"
                    priority
                  />
                </div>
              </div>

              <div className="author-copy">
                <p className="author-role">CO-AUTHOR</p>

                <h3>Aritra Saha</h3>

                <div className="author-bio">
                  <p>
                    I am Aritra Saha from Malda, West Bengal. I am a math enthusiast currently in <strong>grade 12</strong> as of 2026. I started preparing for math Olympiads back in grade 7. From the very beginning, <strong>Number Theory</strong> was the one topic I was most excited to study and solve problems in <em>(definitely not because I was bad at the other topics!)</em>.
                  </p>
                  <p>
                    I wrote my first <strong>INMO in 2023</strong> and was devastated in 2025 after missing the cutoff by just 4 points. However, my love for Number Theory kept me motivated, and I decided to write something on the subject, which led to the initial spark that made us write the book.
                  </p>
                  <p>
                    During this same period, I became deeply involved in the wider math community. I joined the <strong>Sophie Fellowship</strong> for the 2025 Cohort and soon after became a part of the <strong>Online Math Club (OMC)</strong> organizing team. I began teaching classes there — which you can find on the <a href="https://www.youtube.com/@OMath" target="_blank" rel="noopener noreferrer">OMC YouTube Channel</a> — and took part in creating problem sets and selecting problems for team contests. During this time, we were both constantly working on the book, specifically at night.
                  </p>
                  <p>
                    I qualified through IOQM and RMO for the 2025–26 Olympiad cycle. Between all my preparation for JEE, Olympiad, and OMC duties, eventually the day of INMO 2026 came. A fun fact about this journey: the day before the INMO, just to calm my nerves, I was actually writing out the proof for <strong>Zsigmondy&apos;s Theorem</strong> (though the book ultimately features a different proof than the one I drafted that day). If you have seen the 2026 INMO paper, you know the rest. Thanks to that topic, I cleared the exam and proudly became an <strong>INMO Awardee</strong>.
                  </p>
                  <p>
                    I have been incredibly fortunate to participate in several mathematical programs that have deeply shaped my understanding of the subject over the last few years. These experiences have taught me as much about perseverance as they have about mathematics:
                  </p>
                  <ol>
                    <li>
                      Along with attending the <strong>IMOTC in 2026</strong>, I had the opportunity to participate in STEMS (2026) and the Enumeration Camp in both 2025 and 2026, where I was happy to place <strong>second in the 2026 finals</strong>.
                    </li>
                    <li>
                      I was honoured to be selected for the <strong>Maths Beyond Limits</strong> camp in the Balkans (though I was ultimately unable to attend) and enjoyed participating in the <strong>Sharygin Geometry Olympiad</strong>, advancing to Round 2 for grade 10.
                    </li>
                    <li>
                      I recently advanced past Round 1 of the <strong>SRMC</strong> and am currently preparing for the Round 2 examination this October.
                    </li>
                  </ol>
                  <p>
                    When I am not doing math, I have a variety of other interests. I enjoy solving Rubik&apos;s Cubes, though I wouldn&apos;t call myself a speed-solver. I also spend time solving variant Sudokus. I am an avid chess player (Chess.com username: <a href="https://www.chess.com/member/AritraSaha13" target="_blank" rel="noopener noreferrer">AritraSaha13</a>) and recently competed in my first offline tournament at ISI, Kolkata. Furthermore, I spend a lot of time playing GeoGuessr, enjoy watching competitive Scrabble, and occasionally look back fondly on my days of active quizzing, where I represented my school and district at the state level.
                  </p>
                  <p>
                    One of my absolute favorite mathematical hobbies is proposing original problems. You will actually find two or three of my own problems featured in this book. I also proposed <a href="https://artofproblemsolving.com/community/c6h3866818p38676468" target="_blank" rel="noopener noreferrer">Problem 2</a> and <a href="https://artofproblemsolving.com/community/c6h3866822p38676496" target="_blank" rel="noopener noreferrer">Problem 6</a> for the LMAO Revenge Contest, which you can check out on the <a href="https://artofproblemsolving.com/community/c4952335_imotc_2026_tst" target="_blank" rel="noopener noreferrer">IMOTC 2026 page on AoPS</a>.
                  </p>
                  <p>
                    If anyone wants to reach out to me personally, you can connect via <strong>AoPS</strong>, where my username is <a href="https://artofproblemsolving.com/community/user/CrystalMind" target="_blank" rel="noopener noreferrer">CrystalMind</a> (though I am not very active there), or via <strong>Discord</strong>, where my username is <code>aritra2008</code>.
                  </p>
                </div>

              </div>
            </article>

            <article className="author-card second d1" data-reveal>
              <div className="author-mark">
                <div className="author-photo-slot author-photo-real">
                  <Image
                    src="/riddhiman-seal.jpg"
                    alt="Riddhiman Seal"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    sizes="(max-width: 960px) 90vw, 280px"
                    priority
                  />
                </div>
              </div>

              <div className="author-copy">
                <p className="author-role">CO-AUTHOR</p>

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
