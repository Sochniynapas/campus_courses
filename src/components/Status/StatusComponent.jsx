import { FormLabel } from "react-bootstrap";

function Status(prop) {

    switch (prop.status) {
        case "Created":
            return (
                <FormLabel className="fw-bold text-secondary ">
                    Создан
                </FormLabel>
            );
        case "OpenForAssigning":
            return (
                <FormLabel className="fw-bold text-success">
                    Открыт для записи
                </FormLabel>
            );
        case "Started":
            return (
                <FormLabel className="fw-bold text-primary">
                    В процессе обучения
                </FormLabel>
            );
        case "Finished":
            return (
                <FormLabel className="fw-bold text-danger ">
                    Закрыт
                </FormLabel>
            );
    }

}

export default Status