import { FormLabel } from "react-bootstrap"


const CustomNotification = ({ isImportant, last, text }) => {
    console.log()
    if (isImportant) {
        return (
            <FormLabel className={!last?
                " border-bottom bg-danger bg-opacity-25 pt-2 pb-2 pe-3 ps-3 text-danger text-break":"bg-danger bg-opacity-25 pt-2 pb-2 pe-3 ps-3 text-danger text-break"
            }>{text}</FormLabel>
        )
    }
    else {
        return (
            <FormLabel className={!last? "border-bottom pt-2 pb-2 pe-3 ps-3 text-break":"pt-2 pb-2 pe-3 ps-3 text-break"}>{text}</FormLabel>
        )
    }
}
export default CustomNotification