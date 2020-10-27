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
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(20)

    useEffect(() => {
        fetchUsers()
    }, [])

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
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


    // Block User
    const blockUser = async (data) => {
        try {
            setLoading(true)
            const result = await axios.post(`${api}admin/user/block-unblock`, data, header)
            if (result.data.status === true) {
                fetchUsers()
            }

        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }

    // Unblock User
    const unblockUser = async (data) => {
        try {
            setLoading(true)
            const result = await axios.post(`${api}admin/user/block-unblock`, data, header)
            if (result.data.status === true) {
                fetchUsers()
            }
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }

    return (
        <div className="users-index">
            {isLoading ? (
                <Loading />
            ) :
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0 py-3 mb-3">

                                <UserList users={currentUsers} block={blockUser} unblock={unblockUser} />

                                <div className="px-2 px-lg-3 pt-2 pt-lg-3">
                                    <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} />
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