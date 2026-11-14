import React from 'react';
import './HonestFAQ.css';

const COL_MIDDLE_QUESTIONS = [
  {
    num: '01',
    q: 'HOW SOON ARE YOU READY TO START?',
    a: "yesterday. if you have a messy dataset, a high-stakes problem, or a 0-to-1 AI product that needed to ship last week—my docker environment is already spun up.",
  },
  {
    num: '02',
    q: 'HOW LONG HAVE YOU BEEN IN THE SHOW BIZ?',
    a: "3+ years shipping production AI systems across enterprise production environments (and breaking GPUs long before that). i've architected everything from 15-second Japanese MLIT document parsers to 100-equity deep learning engines.",
  },
  {
    num: '03',
    q: "WHAT'S THE FASTEST WAY TO GET YOUR BEST WORK?",
    a: 'skip the micromanagement and hand me the hardest bottleneck. give me direct access to the raw data, tell me the business metric that actually matters, and let me architect the pipeline end-to-end.',
  },
];

const COL_RIGHT_QUESTIONS = [
  {
    num: '04',
    q: 'WHAT MAKES YOU DANGEROUS?',
    a: "most ML engineers hate frontend; most frontend devs fear tensor math. i write the custom LSTM/RAG architecture, build the FastAPI/GraphQL gateway, design the editorial UI, and ship it to Azure.",
  },
  {
    num: '05',
    q: 'WHO SHOULD NOT HIRE YOU?',
    a: 'teams looking for a "yes-man" to slap a generic wrapper on a broken product. if you want 40-slide strategy decks with zero code or someone who hides in Jupyter notebooks without deploying to prod—we will both be miserable.',
  },
  {
    num: '06',
    q: 'WHAT DO YOU STILL SUCK AT?',
    a: 'saying no to absurdly ambitious problems. i get excited easily when someone says "that document layout is impossible to parse" and i will lose sleep until the latency is under 15 seconds.',
  },
];

export default function HonestFAQ() {
  return (
    <section id="faq" className="bya-section">
      <div className="bya-three-col-spread">
        {/* COLUMN 1 (Left): Giant Stacked Condensed Red 'BEFORE / YOU / ASK...' (frame_026) */}
        <div className="bya-col-heading">
          <h2 className="bya-stacked-red-title">
            BEFORE
            <br />
            YOU
            <br />
            ASK...
          </h2>
        </div>

        {/* COLUMN 2 (Middle): Questions 01, 02, 03 */}
        <div className="bya-col-questions">
          {COL_MIDDLE_QUESTIONS.map((item) => (
            <article key={item.num} className="bya-open-item">
              <span className="bya-open-num">{item.num}</span>
              <h3 className="bya-open-q">{item.q}</h3>
              <p className="bya-open-a">{item.a}</p>
            </article>
          ))}
        </div>

        {/* COLUMN 3 (Right): Questions 04, 05, 06 */}
        <div className="bya-col-questions">
          {COL_RIGHT_QUESTIONS.map((item) => (
            <article key={item.num} className="bya-open-item">
              <span className="bya-open-num">{item.num}</span>
              <h3 className="bya-open-q">{item.q}</h3>
              <p className="bya-open-a">{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
