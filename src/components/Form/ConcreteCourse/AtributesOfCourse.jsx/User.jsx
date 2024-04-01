import { Button, FormLabel } from "react-bootstrap"
import { Link } from "react-router-dom"

const User = ({ name, email, status, finalResult, midtermResult, last, isTeacher, isAdmin, currentUserEmail }) => {
    return (
        <>
            {last ? (
                <div className="d-flex flex-lg-row flex-column justify-content-lg-between col-12 p-3">
                    <div className="d-flex flex-column col-4">
                        <FormLabel className="m-0">Студент - {name}</FormLabel>
                        <FormLabel className="fw-light m-0">
                            Статус -
                            {status === "InQueue" && (isTeacher || isAdmin) ? (
                                <FormLabel className="text-primary m-0">в очереди</FormLabel>
                            ) : status === "Accepted" ? (
                                <FormLabel className="text-success m-0">принят в группу</FormLabel>
                            ) : status === "Declined" && (isTeacher || isAdmin) ? (
                                <FormLabel className="text-danger m-0">отклонён</FormLabel>
                            ) : null}
                        </FormLabel>
                        <FormLabel className="fw-light m-0">{email}</FormLabel>
                    </div>
                    {((isTeacher || isAdmin) || (currentUserEmail === email && status === "Accepted")) &&
                        <>
                            {status === "InQueue" ? (
                                <div className="col-lg-6 d-flex flex-row justify-content-lg-end  ">
                                    <Button className="me-3 col-lg-3">
                                        Принять
                                    </Button>
                                    <Button className="text-bg-danger border-0 col-lg-3">
                                        Отклонить заявку
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    {status !== "Declined" &&
                                        <>
                                            <div className="col-4">
                                                <Link className="m-0">Промежуточная аттестация </Link>
                                                <span> - </span>
                                                {midtermResult === "NotDefined" || midtermResult === null ? (
                                                    <FormLabel className="text-bg-secondary p-1 rounded-3 m-0 text-lowercase ">отметки нет</FormLabel>
                                                ) : midtermResult === "Passed" ? (
                                                    <FormLabel className="text-bg-success p-1 rounded-3 m-0 text-lowercase ">успешно пройдена</FormLabel>
                                                ) : midtermResult === "Failed" ? (
                                                    <FormLabel className="text-bg-danger p-1 rounded-3 m-0 text-lowercase ">зафейлена</FormLabel>
                                                ) : null}
                                            </div>
                                            <div className="col-4">
                                                <Link className="m-0">Финальная аттестация </Link>
                                                <span> - </span>
                                                {finalResult === "NotDefined" || finalResult === null ? (
                                                    <FormLabel className="text-bg-secondary p-1 rounded-3 m-0 text-lowercase ">отметки нет</FormLabel>
                                                ) : finalResult === "Passed" ? (
                                                    <FormLabel className="text-bg-success p-1 rounded-3 m-0 text-lowercase ">успешно пройдена</FormLabel>
                                                ) : finalResult === "Failed" ? (
                                                    <FormLabel className="text-bg-danger p-1 rounded-3 m-0 text-lowercase ">зафейлена</FormLabel>
                                                ) : null}
                                            </div>
                                        </>
                                    }
                                </>
                            )
                            }
                        </>
                    }
                </div >
            ) : (
                <div className="d-flex flex-lg-row flex-column justify-content-lg-between border-bottom col-12 p-3">
                    <div className="d-flex flex-column col-4">
                        <FormLabel className="m-0">Студент - {name}</FormLabel>
                        <FormLabel className="fw-light m-0">
                            Статус -
                            {status === "InQueue" && (isTeacher || isAdmin) ? (
                                <FormLabel className="text-primary m-0">в очереди</FormLabel>
                            ) : status === "Accepted" ? (
                                <FormLabel className="text-success m-0">принят в группу</FormLabel>
                            ) : status === "Declined" && (isTeacher || isAdmin) ? (
                                <FormLabel className="text-danger m-0">отклонён</FormLabel>
                            ) : null}
                        </FormLabel>
                        <FormLabel className="fw-light m-0">{email}</FormLabel>
                    </div>
                    {((isTeacher || isAdmin) || (currentUserEmail === email && status === "Accepted")) &&
                        <>
                            {status === "InQueue" ? (
                                <div className="col-lg-6 d-flex flex-row justify-content-lg-end  ">
                                    <Button className="me-3 col-lg-3">
                                        Принять
                                    </Button>
                                    <Button className="text-bg-danger border-0 col-lg-3">
                                        Отклонить заявку
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    {status !== "Declined" &&
                                        <>
                                            <div className="col-4">
                                                <Link className="m-0">Промежуточная аттестация </Link>
                                                <span> - </span>
                                                {midtermResult === "NotDefined" || midtermResult === null ? (
                                                    <FormLabel className="text-bg-secondary p-1 rounded-3 m-0 text-lowercase ">отметки нет</FormLabel>
                                                ) : midtermResult === "Passed" ? (
                                                    <FormLabel className="text-bg-success p-1 rounded-3 m-0 text-lowercase ">успешно пройдена</FormLabel>
                                                ) : midtermResult === "Failed" ? (
                                                    <FormLabel className="text-bg-danger p-1 rounded-3 m-0 text-lowercase ">зафейлена</FormLabel>
                                                ) : null}
                                            </div>
                                            <div className="col-4">
                                                <Link className="m-0">Финальная аттестация </Link>
                                                <span> - </span>
                                                {finalResult === "NotDefined" || finalResult === null ? (
                                                    <FormLabel className="text-bg-secondary p-1 rounded-3 m-0 text-lowercase ">отметки нет</FormLabel>
                                                ) : finalResult === "Passed" ? (
                                                    <FormLabel className="text-bg-success p-1 rounded-3 m-0 text-lowercase ">успешно пройдена</FormLabel>
                                                ) : finalResult === "Failed" ? (
                                                    <FormLabel className="text-bg-danger p-1 rounded-3 m-0 text-lowercase ">зафейлена</FormLabel>
                                                ) : null}
                                            </div>
                                        </>
                                    }

                                </>
                            )
                            }
                        </>
                    }
                </div >
            )}

        </>
    )
}
export default User