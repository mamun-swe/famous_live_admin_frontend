import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';

const Index = () => {
    const [isLoading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [requestsPerPage] = useState(5);

    useEffect(() => {
        fetchRequests()
    }, [])

    // fetch users
    const fetchRequests = () => {
        setLoading(true)
        axios.get(`${api}users`)
            .then(res => {
                setRequests(res.data)
                setLoading(false)
            })
            .catch(err => {
                if (err) {
                    console.log(err);
                }
            })
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
            ) :
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0 py-3 mb-3">

                                <table className="table table-sm table-responsive-sm">
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
                                                <td>New Name</td>
                                                <td className="text-center">
                                                    <button type="button" className="btn btn-sm shadow-none text-white">Approve</button>
                                                    <button type="button" className="btn btn-sm shadow-none text-white ml-1 cancel-btn">cancel</button>
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