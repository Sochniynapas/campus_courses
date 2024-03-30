import { Card, FormGroup, FormLabel } from "react-bootstrap"
import Status from "../../Status/StatusComponent"
import Semester from "../../Semester/SemesterComponent"

function CourseInList(prop) {
    return (

        <Card key={prop.id}>
            <FormGroup className="d-flex flex-column p-2">
                <FormGroup className="d-flex flex-lg-row flex-column justify-content-between ">
                    <FormLabel className="fw-bold h4">
                        {prop.name}
                    </FormLabel>
                    <FormLabel className="fw-bold text-success ">
                        <Status status = {prop.status}/>
                    </FormLabel>
                </FormGroup>
                <FormLabel>
                    Учебный год - {prop.year}-{prop.year + 1}
                </FormLabel>
                <FormLabel>
                    <Semester semester = {prop.semester}/>
                </FormLabel>
                <FormLabel className="fw-light">
                    Мест всего - {prop.maxStudents}
                </FormLabel>
                <FormLabel className="fw-light">
                    Мест свободно - {prop.remainSlots}
                </FormLabel>
            </FormGroup>
        </Card>

    )
}

export default CourseInList