import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Icon } from 'react-icons-kit';
import { ic_clear } from 'react-icons-kit/md';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import api from '../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import noImage from '../assets/static/noimage.png';

toast.configure({ autoClose: 2000 })
const UserList = ({ users, block, unblock }) => {
    const { register, handleSubmit, errors } = useForm()
    const [show, setShow] = useState(false)
    const [modalData, setModalData] = useState({})
    const [isLoading, setLoading] = useState(false)

    const handleClose = () => setShow(false)

    const handleShow = (data) => {
        setModalData(data)
        setShow(true)
    }

    // Header 
    const header = {
        headers:
        {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    // Send daimond
    const onSubmit = async (data) => {
        const newData = {
            coin_amount: parseInt(data.coin_amount)
        }

        try {
            setLoading(true)
            const response = await axios.put(`${api}admin/user/${modalData.id}/give-daimond`, newData, header)
            if (response.data.status === true) {
                setLoading(false)
                handleClose()
                toast.success(response.data.message)
            }
        } catch (error) {
            if (error) {
                setLoading(false)
                console.log(error.response)
            }
        }
    }

    // Block
    const submitBlock = data => {
        block({ status: 'blocked', blockId: data })
    }

    // Unblock
    const submitUnlock = data => {
        unblock({ status: 'confirmed', blockId: data })
    }

    return (
        <div className="p-2">
            <table className="table table-sm table-responsive-sm table-borderless">
                <thead>
                    <tr>
                        <td>SL</td>
                        <td>Image</td>
                        <td>Name</td>
                        <td>Phone</td>
                        <td className="text-center">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 && users.map((user, i) =>
                        <tr key={i}>
                            <td className="pt-2">{i + 1}</td>
                            <td>
                                <div className="img-box rounded-circle">
                                    {user.image ?
                                        <img src={user.image} className="img-fluid" alt={user.name} />
                                        :
                                        <img src={noImage} className="img-fluid" alt="..." />
                                    }
                                </div>
                            </td>
                            <td className="pt-2">{user.name}</td>
                            <td className="pt-2">{user.phone}</td>
                            <td className="text-center">
                                <button
                                    type="button"
                                    className="btn btn-success shadow-none mt-1 mt-sm-0"
                                    onClick={() => handleShow(user)}
                                >Give Daimond</button>

                                {user.account_status === 'confirmed' ?
                                    <button
                                        type="button"
                                        className="btn btn-danger shadow-none mt-1 mt-sm-0"
                                        onClick={() => submitBlock(user.id)}
                                    >Block</button>
                                    : user.account_status === 'blocked' ?
                                        <button
                                            type="button"
                                            className="btn btn-info shadow-none mt-1 mt-sm-0"
                                            onClick={() => submitUnlock(user.id)}
                                        >Unblock</button>
                                        : null}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>


            {/* Modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <div className="d-flex w-100">
                        <div className="flex-fill">
                            <h5 className="font-weight-bold mb-0 mt-2">Give Coin</h5>
                        </div>
                        <div className="ml-auto">
                            <button
                                type="button"
                                className="btn btn-sm shadow-none rounded-0"
                                onClick={handleClose}
                            >
                                <Icon icon={ic_clear} size={28} />
                            </button>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* User name */}
                        <div className="form-group mb-3">
                            <small>User name</small>
                            <input
                                type="text"
                                className="form-control shadow-none"
                                defaultValue={modalData.name}
                                readOnly
                            />
                        </div>

                        {/* Coin amount */}
                        <div className="form-group mb-3">
                            {errors.coin_amount && errors.coin_amount.message ? (
                                <small className="text-danger">{errors.coin_amount && errors.coin_amount.message}</small>
                            ) : <small>Coin amount</small>
                            }

                            <input
                                type="number"
                                name="coin_amount"
                                className="form-control shadow-none"
                                ref={register({
                                    required: "Coin amount is required",
                                })}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn py-2 px-4 btn-sm font-weight-bold btn-primary shadow-none text-white float-right"
                        >
                            {isLoading ? <span>Sending...</span> : <span>Send Coin</span>}
                        </button>

                    </form>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default UserList;