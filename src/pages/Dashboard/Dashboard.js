import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingComponent from '../../components/Loading';

toast.configure({ autoClose: 2000 })
const Dashboard = () => {
    const [data, setData] = useState('')
    const [isLoading, setLoading] = useState(false)

    // Header 
    const header = {
        headers:
        {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    useEffect(() => {
        // fetch data
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${api}admin/dashboard`, header)
                if (response.data.status === true) {
                    setData(response.data)
                    setLoading(false)
                }
            } catch (error) {
                if (error) {
                    setLoading(false)
                    toast.warn(error.response.data.message)
                }
            }
        }

        fetchData()
    }, [])


    return (
        <div className="dashboard">
            {isLoading ? <LoadingComponent /> :
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 col-md-4">
                            <Link to='/dashboard/users'>
                                <div className="card border-0 shadow p-2">
                                    <div className="flex-center flex-column text-center">
                                        <h4 className="text-success">{data.usersTotal}</h4>
                                        <p className="text-dark">users</p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-6 col-md-4">
                            <Link to='/dashboard/requests'>
                                <div className="card border-0 shadow p-2">
                                    <div className="flex-center flex-column text-center">
                                        <h4 className="color-unique">{data.updateRequests}</h4>
                                        <p className="text-dark">name update requests</p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            }
        </div>
    );
};

export default Dashboard;