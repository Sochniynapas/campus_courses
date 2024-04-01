import { FormLabel } from "react-bootstrap"


const CustomNotification = ({ isImportant, last, text }) => {
    console.log()
    if (isImportant && last) {
        return (
            <FormLabel className="bg-danger bg-opacity-25 pt-2 pb-2 pe-3 ps-3 text-danger">{text}</FormLabel>
        )
    }
    else if (isImportant) {
        return (
            <FormLabel className="bg-danger bg-opacity-25 pt-2 pb-2 pe-3 ps-3 text-danger border-bottom">{text}</FormLabel>
        )
    }
    else if (last) {
        return (
            <FormLabel className="pt-2 pb-2 pe-3 ps-3">{text}</FormLabel>
        )
    }
    else {
        return (
            <FormLabel className="border-bottom pt-2 pb-2 pe-3 ps-3 ">{text}</FormLabel>
        )
    }
}
export default CustomNotification