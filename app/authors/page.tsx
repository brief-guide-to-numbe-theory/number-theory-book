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
                    I am Riddhiman Seal, a <strong>Grade 12 student</strong> and math enthusiast based in Mumbai. My journey into mathematics began in elementary school, but my passion for competitive problem-solving truly ignited in Grade 8 when my cousin introduced me to Olympiads. Tackling IOQM-level problems for the first time was a steep challenge, but it opened up a refreshing side of mathematics that I quickly grew to love. Within Olympiad math, I focus heavily on <strong>geometry</strong> and <strong>number theory</strong>.
                  </p>
                  <p>
                    Over the years, I have participated in the Indian Olympiad cycle (<strong>IOQM</strong>, <strong>RMO</strong>, <strong>INMO</strong>) alongside individual contests like the <strong>AMC</strong> and <strong>AIME</strong>. Some key highlights include placing <strong>1st in the subjective round at the MTRP camp at ISI Kolkata</strong> and earning a <strong>3rd Diploma in the Sharygin Geometry Olympiad</strong>. Together with my co-author Aritra, I have also competed in team events — placing <strong>2nd in the Power Round at the Berkeley Math Tournament</strong> and <strong>1st overall in the Oxford Mathematics Team Competition</strong>. Outside of competing, I am a staff member at the <a href="https://www.youtube.com/@OMath" target="_blank" rel="noopener noreferrer">Online Math Club (OMC)</a>, where I deliver lectures, curate problem sets, draft mock papers, and assist with club administration.
                  </p>
                  <p>
                    The inspiration for this book came from a gap I noticed while studying Olympiad number theory: while standard classic texts exist, many modern, recurring ideas are scattered across short handouts without a centralized place to practice. When Aritra reached out to collaborate on a small handout, our draft quickly grew from 2 pages to over 100. Realizing that shortening the material would do a disservice to the subject, we made the bold decision to write a comprehensive book. Despite the challenge of balancing schoolwork with writing sprints, this project grew into the complete resource we wished we had when we began our own Olympiad journeys.
                  </p>
                  <p>
                    Beyond mathematics, I am a <strong>2nd-degree black belt in Taekwondo</strong> with a decade of training under my belt and have competed in football at the district level.
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
