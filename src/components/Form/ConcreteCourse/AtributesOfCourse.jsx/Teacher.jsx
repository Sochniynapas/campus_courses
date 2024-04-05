import { FormLabel } from "react-bootstrap"

const Teacher = ({ name, email, isMain, last }) => {
    return (
        <>
            <div className={!last ? "d-flex flex-column p-3 border-bottom" : "d-flex flex-column p-3"}>
                <div className="d-flex flex-lg-row flex-column">
                    <FormLabel className="m-0 fw-bold me-1 text-break">{name}</FormLabel>
                    {isMain && <FormLabel className="text-bg-success d-flex align-items-center justify-content-center  ps-1 pe-1 mb-0 rounded-1 ">основной</FormLabel>}
                </div>
                <FormLabel className="fw-light  m-0 text-break">{email}</FormLabel>
            </div>
        </>

    )
}
export default Teacher