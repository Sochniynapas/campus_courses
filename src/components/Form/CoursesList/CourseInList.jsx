import { Card, Form, FormGroup, FormLabel } from "react-bootstrap"

function CourseInList() {
    return (
        <>
            <Form>
                <FormLabel className="fw-bold display-5 h1" >
                    Группа - Компьютерные науки
                </FormLabel>

                <Card className="p-2">
                    <FormGroup className="d-flex flex-lg-row flex-column justify-content-between ">
                        <FormLabel className="fw-bold h4">
                            Группа - Компьютерные науки
                        </FormLabel>
                        <FormLabel className="fw-bold text-success ">
                            Группа - Компьютерные науки
                        </FormLabel>
                    </FormGroup>
                    <FormLabel>
                        Группа - Компьютерные науки
                    </FormLabel>
                    <FormLabel>
                        Группа - Компьютерные науки
                    </FormLabel>
                    <FormLabel className="fw-light">
                        Группа - Компьютерные науки
                    </FormLabel>
                    <FormLabel className="fw-light">
                        Группа - Компьютерные науки
                    </FormLabel>
                </Card>
            </Form>
        </>
    )
}

export default CourseInList