export default function Modules() {
    return (
      <div>
        {/* Implement Collapse All button, View Progress button, etc. */}
        <div id='top-buttons'>
            <button>Collapse All</button><button>View Progress</button>
            <select id="wd-select-one">
                <option value="publish">Publish All</option>
                <option value="hide">Hide All</option>
            </select>
            <button>+ Module</button>
        </div>
        <ul id="wd-modules">
          <li className="wd-module">
            <div className="wd-title">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introductior</li>
                  <li className="wd-content-item">Full Stack Developer - Chapter 2 -Creating User Interfaces With HTML</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to Web Development</li>
                  <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                   <li className="wd-content-item">Creating a React Application</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 2, Lecture 2 - Prototyping the React Kambaz User Interface with HTML</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                  <li className="wd-content-item">Keep working on assignment 1</li>
                  <li className="wd-content-item">Deploy the assignment to Netlify</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Full Stack Developer - Chapter 1 - Building React User Interfaces with HTML</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Implementing the Kambaz Account Screens</li>
                  <li className="wd-content-item">Implementing the Kambaz Dashboard Screens</li>
                  <li className="wd-content-item">Implementing the Kambaz Courses Screens</li>
                  <li className="wd-content-item">Implementing the Kambaz Modules Screens</li>
                  <li className="wd-content-item">Implementing the Kambaz Assignments Screens</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 3</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to CSS</li>
                  <li className="wd-content-item">Selectors by tag ID, classes, and document structure</li>
                  <li className="wd-content-item">Styling color and bcackground color</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Full Stack Developer - Chapter 2 -Styling Web Pages with CSS</li>
                </ul>
              </li>
              <li className="wd-lesson">
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction t o Cascading Style Sheets</li>
                  <li className="wd-content-item">Styling with Colors</li>
                  <li className="wd-content-item">The Box Model</li>
                  <li className="wd-content-item">Size & Position</li>
                  <li className="wd-content-item">Float</li>
                  <li className="wd-content-item">Flex</li>
                  <li className="wd-content-item">Roating content & Gradient background</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  );}
  