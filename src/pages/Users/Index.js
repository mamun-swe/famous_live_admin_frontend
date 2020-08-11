import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api';
import UserList from '../../components/UserList';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';


const Index = () => {
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(20);

    useEffect(() => {
        fetchUsers()
    }, [])

    // fetch users
    const fetchUsers = () => {
        setLoading(true)
        axios.get(`${api}posts`)
            .then(res => {
                setUsers(res.data)
                setLoading(false)
            })
            .catch(err => {
                if (err) {
                    console.log(err);
                }
            })
    }


    // Get Current Users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <div className="users-index">

            {isLoading ? (
                <Loading />
            ) :
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0 py-3 mb-3">

                                <UserList users={currentUsers} />

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