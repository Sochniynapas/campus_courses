import { FormLabel } from "react-bootstrap";

function Status(prop) {

    const page = window.location.pathname
    const check = /courses/

    switch (prop.status) {
        case "Created":
            return (
                <>
                    {check.test(page) ? (
                        <>
                            <FormLabel className="text-secondary ">
                                Создан
                            </FormLabel>
                        </>
                    ) : (
                        <>
                            <FormLabel className="fw-bold text-secondary ">
                                Создан
                            </FormLabel>
                        </>
                    )}
                </>
            );
        case "OpenForAssigning":
            return (
                <>
                    {check.test(page) ? (
                        <>
                            <FormLabel className="text-success">
                                Открыт для записи
                            </FormLabel>
                        </>
                    ) : (
                        <>
                            <FormLabel className="fw-bold text-success">
                                Открыт для записи
                            </FormLabel>
                        </>
                    )}
                </>
            );
        case "Started":
            return (
                <>
                    {check.test(page) ? (
                        <>
                            <FormLabel className="text-primary">
                                В процессе обучения
                            </FormLabel>
                        </>
                    ) : (
                        <>
                            <FormLabel className="fw-bold text-primary">
                                В процессе обучения
                            </FormLabel>
                        </>
                    )}
                </>
            );
        case "Finished":
            return (
                <>
                    {check.test(page) ? (
                        <>
                            <FormLabel className="text-danger ">
                                Закрыт
                            </FormLabel>
                        </>
                    ) : (
                        <>
                            <FormLabel className="fw-bold text-danger ">
                                Закрыт
                            </FormLabel>
                        </>
                    )}
                </>
            );
    }

}

export default Status