import { FormLabel } from "react-bootstrap";

function Semester(prop) {

    switch (prop.semester) {
        case "Autumn":
            return (
                <FormLabel className="fw-light">
                    Семестр - Осенний
                </FormLabel>
            );
        case "Spring":
            return (
                <FormLabel className="fw-light">
                    Семестр - Весенний
                </FormLabel>
            );
    }

}
export default Semester