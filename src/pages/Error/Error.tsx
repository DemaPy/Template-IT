import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Error = () => {
    const navigate = useNavigate()


    useEffect(() => {
        navigate("/login")
    }, [])

    return (
        <div>Error page</div>
    )
}

export default Error