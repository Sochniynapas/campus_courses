import { FormLabel } from "react-bootstrap";

function Semester(prop) {

    const page = window.location.pathname
    const check = /courses/
    switch (prop.semester) {
        case "Autumn":
            return (
                <>
                    {check.test(page) ? (
                        <>
                            <FormLabel>
                                Осенний
                            </FormLabel>
                        </>
                    ) : (
                        <>
                            <FormLabel className="fw-light">
                                Семестр - Осенний
                            </FormLabel>
                        </>
                    )}
                </>

            );
        case "Spring":
            return (
                <>
                    {check.test(page) ? (
                        <>
                            <FormLabel>
                                Весенний
                            </FormLabel>
                        </>
                    ) : (
                        <>
                            <FormLabel className="fw-light">
                                Семестр - Весенний
                            </FormLabel>
                        </>
                    )}
                </>
            );
    }

}
export default Semester