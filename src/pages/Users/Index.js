import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../utils/api';
import UserList from '../../components/UserList';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({ autoClose: 2000 })
const Index = () => {
    const [isLoading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState(users)
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(20)

    useEffect(() => {
        fetchUsers()
    }, [])

    // On change filter handeller
    const statusFilter = event => {
        let data = event.target.value
        if (data === 'confirmed') {
            const filtereData = users.filter(x => x.account_status === 'confirmed')
            return setFilteredUsers(filtereData)
        } else if (data === 'pending') {
            const filtereData = users.filter(x => x.account_status === 'pending')
            return setFilteredUsers(filtereData)
        } else if (data === 'blocked') {
            const filtereData = users.filter(x => x.account_status === 'blocked')
            return setFilteredUsers(filtereData)
        } else if (data === 'all') {
            return setFilteredUsers(users)
        }
        const filtereData = users.filter(x => x.account_status > 10000)
        return setFilteredUsers(filtereData)
    }

    // Header 
    const header = {
        headers:
        {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    // fetch users
    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${api}admin/users`, header)
            setUsers(response.data.users)
            setFilteredUsers(response.data.users)
            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                toast.warn(error.response.data.message)
            }
        }
    }


    // Get Current Users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="users-index">
            {isLoading ? (
                <Loading />
            ) :
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 mb-2">
                            <div className="card border-0">
                                <div className="card-body py-2">
                                    <select
                                        style={{ width: 150, marginLeft: "auto" }}
                                        className="form-control shadow-none"
                                        onChange={statusFilter}
                                    >
                                        <option value="all">All</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="pending">Pending</option>
                                        <option value="blocked">Blocked</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card border-0 py-3 mb-3">

                                <UserList users={currentUsers} />

                                <div className="px-2 px-lg-3 pt-2 pt-lg-3">
                                    <Pagination usersPerPage={usersPerPage} totalUsers={filteredUsers.length} paginate={paginate} />
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