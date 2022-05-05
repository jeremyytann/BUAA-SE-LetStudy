import { Box } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../Api/api'
import User from './User'

const AdminUserBody = () => {
    const { tab, page, username } = useParams();
    const [users, setUsers] = useState();

    useEffect(() => {
        const fetchAllUsers = async() => {
            const data = await api.userGetAllByPage(page, 12);
            setUsers(data.data);
        }

        const fetchActiveUsers = async() => {
            const data = await api.userGetByStatus(1, page, 12);
            setUsers(data.data);
        }

        const fetchBannedUsers = async() => {
            const data = await api.userGetByStatus(0, page, 12);
            setUsers(data.data);
        }

        const fetchSearchUsers = async() => {
            const data = await api.userSearchByUsername(username, page, 12);
            setUsers(data.data);
        }

        if (tab === 'all') {
            fetchAllUsers();
        } else if (tab === 'active') {
            fetchActiveUsers();
        } else if (tab === 'banned') {
            fetchBannedUsers();
        } else if (tab === 'search') {
            fetchSearchUsers();
        }
    }, [tab, page, username])

    return (
        <Box height={580} mt={5} ml={10} mr={2}>
            { users !== undefined && users.length > 0 ? 
                <Box display='flex' flexWrap='wrap'>
                    {users.map((user, index) => (
                        <User key={index} user={user}/>
                    ))}
                </Box> : 
                <Box>
                    <Box mt={12} fontSize={150} fontWeight='bold' color='#DDC3A5'>
                        404
                    </Box>

                    <Box fontSize={24} fontWeight='bold'>
                        抱歉，此搜索没有任何结果
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default AdminUserBody