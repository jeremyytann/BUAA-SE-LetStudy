import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import api from '../Api/api'
import Report from './Report'

const AdminReportBody = () => {
    const { tab, page } = useParams();
    const [reports, setReports] = useState();
    
    useEffect(() => {
        const fetchUnfinishedReportsByPage = async() => {
            const data = await api.reportGetByStatusAndPage(0, page, 8);
            setReports(data.data);
        }

        const fetchCompletedReportsByPage = async() => {
            const data = await api.reportGetByStatusAndPage(1, page, 8);
            setReports(data.data);
        }

        const fetchRejectedReportsByPage = async() => {
            const data = await api.reportGetByStatusAndPage(2, page, 8);
            setReports(data.data);
        }

        const fetchAllReportsByPage = async() => {
            const data = await api.reportGetAllByPage(page, 8);
            setReports(data.data);
        }

        if (tab === 'unfinished') {
            fetchUnfinishedReportsByPage();
        } else if (tab === 'completed') {
            fetchCompletedReportsByPage();
        } else if (tab === 'rejected') {
            fetchRejectedReportsByPage();
        } else if (tab === 'all') {
            fetchAllReportsByPage();
        }
    }, [tab, page])

    return (
        <Box height={580} mt={5} ml={10} mr={2}>
            { reports !== undefined ?
                <Box display='flex' flexWrap='wrap'>
                    {reports.map((report, index) => (
                        <Report key={index} report={report}/>
                    ))}
                </Box> : ''
            }
        </Box>
    )
}

export default AdminReportBody