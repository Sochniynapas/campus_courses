import { useSelector } from "react-redux"
import { useGetAllUsersQuery } from "../api/userApi"
import { useEffect, useState } from "react"

export function useGetTransformedUsers(){
    const token = localStorage.getItem("token")
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