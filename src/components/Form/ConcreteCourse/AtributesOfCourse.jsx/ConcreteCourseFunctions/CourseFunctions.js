import SwalSignUpToACourseContent from "../SwalsOfACourse/SwalForSignUpToACourse"

export function setCourseFields(setIsTeacherOfCourse, setFields, courseData, emailOfUser, role) {
    const userIsTeacher = courseData.teachers.find(obj => obj.email === emailOfUser)
    if (userIsTeacher !== undefined || role.isAdmin) {
        setIsTeacherOfCourse(userIsTeacher)
        setFields({
            name: courseData.name,
            startYear: courseData.startYear,
            maximumStudentsCount: courseData.maximumStudentsCount,
            semester: courseData.semester,
            requirements: courseData.requirements,
            annotations: courseData.annotations,
        })
    }
    else {
        setIsTeacherOfCourse(undefined)
    }
}
export function handleCloseSimple (type, setShowSimpleModal) {
    setShowSimpleModal(prevValues => ({
        ...prevValues,
        [type]: false
    }))
}
export function handleShowSimple (type, setShowSimpleModal) {
    setShowSimpleModal(prevValues => ({
        ...prevValues,
        [type]: true
    }))
}
export async function handleSignUp (signUpToACourse, dispatch, navigate, token, id) {
    const response = await signUpToACourse({ token: token, id: id })
    if (response.error) {
        SwalSignUpToACourseContent(response.error.status, dispatch, navigate)
    }
    else {

        SwalSignUpToACourseContent(200, dispatch, navigate)
    }
}