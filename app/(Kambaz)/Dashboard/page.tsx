import Link from "next/link";
import {Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button} from "react-bootstrap";


export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
            <Col className="wd-dashboard-course" style={{width: "300px"}}>
                <Card>
                    <Link href="/Courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/reactjs.jpg" alt="course image" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Full Stack software developer
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{width: "300px"}}>
                <Card>
                    <Link href="/Courses/4550" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/webdev.jpg" alt="course image" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4550 Web Development</CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Full Stack software developer
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{width: "300px"}}>
                <Card>
                    <Link href="/Courses/4100" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/ai.jpg" alt="course image" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4100 Artificial Intelligence</CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                202610_1 Fall 2025 Semester Full Term
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{width: "300px"}}>
                <Card>
                    <Link href="/Courses/4120" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/nlp.jpg" alt="course image" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4120 Natural Language Processing</CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                202530_1 Spring 2025 Semester Full Term
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{width: "300px"}}>
                <Card>
                    <Link href="/Courses/3000" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/algorithm.jpg" alt="course image" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3000 Algorithm & Data</CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                202530_1 Spring 2025 Semester Full Term
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{width: "300px"}}>
                <Card>
                    <Link href="/Courses/3520" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/cpp.jpg" alt="course image" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3520 Programing in C++</CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                202410_1 Fall 2023 Semester Full Term
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>
            <Col className="wd-dashboard-course" style={{width: "300px"}}>
                <Card>
                    <Link href="/Courses/4200" className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/information-retrieval.jpg" alt="course image" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">IS4200 Information Retrieval</CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                202430_1 Spring 2024 Semester Full Term
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                    </Link>
                </Card>
            </Col>
        </Row>
      </div>
    </div>
);}
