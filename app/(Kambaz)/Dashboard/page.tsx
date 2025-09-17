import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" alt="course image" width={200} height={150} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/Courses/4550" className="wd-dashboard-course-link">
                <Image src="/images/webdev.jpg" alt="course image" width={200} height={150} />
                <div>
                <h5> CS4550 Web Development </h5>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer
                </p>
                <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/Courses/4100" className="wd-dashboard-course-link">
                <Image src="/images/ai.jpg" alt="course image" width={200} height={150} />
                <div>
                <h5> CS4100 Artificial Intelligence</h5>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer
                </p>
                <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/Courses/4120" className="wd-dashboard-course-link">
                <Image src="/images/nlp.jpg" alt="course image" width={200} height={150} />
                <div>
                <h5> CS4100 Natural Language Processing</h5>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer
                </p>
                <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/Courses/3000" className="wd-dashboard-course-link">
                <Image src="/images/algorithm.jpg" alt="course image" width={200} height={150} />
                <div>
                <h5> CS3000 Algorithm & Data</h5>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer
                </p>
                <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/Courses/3520" className="wd-dashboard-course-link">
                <Image src="/images/cpp.jpg" alt="course image" width={200} height={150} />
                <div>
                <h5> CS3520 Programing in C++</h5>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer
                </p>
                <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/Courses/4200" className="wd-dashboard-course-link">
                <Image src="/images/information-retrieval.jpg" alt="course image" width={200} height={150} />
                <div>
                <h5> IS4200 Information Retrieval</h5>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer
                </p>
                <button> Go </button>
                </div>
            </Link>
        </div>
      </div>
    </div>
);}
