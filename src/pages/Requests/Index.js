import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../utils/api';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';

import noDataImage from '../../assets/static/no_data.png';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({ autoClose: 2000 })
const Index = () => {
    const [isLoading, setLoading] = useState(false)
    const [isEmpty, setEmpty] = useState(false)
    const [requests, setRequests] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [requestsPerPage] = useState(20)

    useEffect(() => {
        fetchRequests()
    }, [])

    // Header 
    const header = {
        headers:
        {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    // fetch users
    const fetchRequests = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${api}admin//users/name/update/requests`, header)

            if (response.data.requests.length > 0) {
                setLoading(false)
                return setRequests(response.data.requests)
            }

            setLoading(false)
            return setEmpty(true)
        } catch (error) {
            if (error) {
                setLoading(false)
                toast.warn(error.response.data.message)
            }
        }
    }


    // Update Name
    const updateName = async (data) => {
        let newData = {
            new_name: data.new_name
        }

        try {
            setLoading(true)
            const response = await axios.put(`${api}admin/user/${data.id}/update-name`, newData, header)
            if (response.data.message === 'success') {
                fetchRequests()
                setLoading(false)
            }
        } catch (error) {
            if (error) console.log(error.response)
        }
    }

    // Get Current Users
    const indexOfLastUser = currentPage * requestsPerPage;
    const indexOfFirstUser = indexOfLastUser - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="update-request">
            {isLoading ? (
                <Loading />
            ) : isEmpty ?
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card border-0 px-3 py-5 mb-3 text-center shadow">
                                    <img src={noDataImage} className="img-fluid" alt="..." />
                                    <h4>No request available</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    :
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card border-0 p-3 mb-3">

                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <td className="pl-2">SL</td>
                                                <td>Old Name</td>
                                                <td>New Name</td>
                                                <td className="text-center">Action</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRequests.length > 0 && currentRequests.map((request, i) =>
                                                <tr key={i}>
                                                    <td className="pl-2">{i + 1}</td>
                                                    <td>{request.name}</td>
                                                    <td>{request.new_name}</td>
                                                    <td className="text-center">
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm shadow-none text-white"
                                                            onClick={() => updateName({ id: request._id, new_name: request.new_name })}
                                                        >Update Name</button>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                    <div className="px-2 px-lg-3 pt-2 pt-lg-3">
                                        <Pagination usersPerPage={requestsPerPage} totalUsers={requests.length} paginate={paginate} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Index;