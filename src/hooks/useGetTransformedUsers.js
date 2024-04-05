import { useSelector } from "react-redux"
import { useGetAllUsersQuery } from "../api/userApi"
import { useEffect, useState } from "react"
import { selectToken } from "../store/slice/authSlice"

export function useGetTransformedUsers(){
    const token = useSelector(selectToken)
    const { data: users, error: usersError } = useGetAllUsersQuery(token)
    const [transformedUsers, setTransformedUsers] = useState([])
    useEffect(() => {
        if (users) {
            const transformedUsers = users.map(user => ({
                value: user.id,
                label: user.fullName
            }))
            setTransformedUsers(transformedUsers)
        }
    }, [users, usersError])
    return transformedUsers

}