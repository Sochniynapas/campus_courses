import { Button, Card, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


function CourseGroups() {
    return (
        <Container>
            <Nav className="pb-2">
                <h1 className="fw-bold display-5 ">Группы кампусных курсов</h1>
            </Nav>
            <Button>
                Создать
            </Button>
            <Card className="p-2">
                <Nav className="d-flex justify-content-between  ">
                    <Link className="col-2 d-flex align-items-center justify-content-start">ГГГГГГГГГ</Link>
                    <Nav className="col-6 d-flex justify-content-end  ">
                        <Button className="me-3 border-0 bg-warning text-black ">
                            Редактировать
                        </Button>
                        <Button className="bg-danger border-0">
                            Удалить
                        </Button>
                    </Nav>
                </Nav>
            </Card>
            <Card className="p-2">
                <Nav className="d-flex justify-content-between  ">
                    <Link className="col-2 d-flex align-items-center justify-content-start">ГГГГГГГГГ</Link>
                    <Nav className="col-6 d-flex justify-content-end  ">
                        <Button className="me-3 border-0 bg-warning text-black ">
                            Редактировать
                        </Button>
                        <Button className="bg-danger border-0">
                            Удалить
                        </Button>
                    </Nav>
                </Nav>
            </Card>
            <Card className="p-2">
                <Nav className="d-flex justify-content-between  ">
                    <Link className="col-2 d-flex align-items-center justify-content-start">ГГГГГГГГГ</Link>
                    <Nav className="col-6 d-flex justify-content-end  ">
                        <Button className="me-3 border-0 bg-warning text-black ">
                            Редактировать
                        </Button>
                        <Button className="bg-danger border-0">
                            Удалить
                        </Button>
                    </Nav>
                </Nav>
            </Card>
            <Card className="p-2">
                <Nav className="d-flex justify-content-between  ">
                    <Link className="col-2 d-flex align-items-center justify-content-start">ГГГГГГГГГ</Link>
                    <Nav className="col-6 d-flex justify-content-end  ">
                        <Button className="me-3 border-0 bg-warning text-black ">
                            Редактировать
                        </Button>
                        <Button className="bg-danger border-0">
                            Удалить
                        </Button>
                    </Nav>
                </Nav>
            </Card>
            <Card className="p-2">
                <Nav className="d-flex justify-content-between  ">
                    <Link className="col-2 d-flex align-items-center justify-content-start">ГГГГГГГГГ</Link>
                    <Nav className="col-6 d-flex justify-content-end  ">
                        <Button className="me-3 border-0 bg-warning text-black ">
                            Редактировать
                        </Button>
                        <Button className="bg-danger border-0">
                            Удалить
                        </Button>
                    </Nav>
                </Nav>
            </Card>

        </Container>
    )

}
export default CourseGroups