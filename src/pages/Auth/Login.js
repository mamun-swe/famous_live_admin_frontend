import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import jwt from 'jwt-decode';
import api from '../../utils/api';

const Login = () => {
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm()
    const [loading, setLoading] = useState(false)
    const [invalid, setInvalid] = useState("")

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await axios.post(`${api}auth/login`, data)
            if (response.data.message !== 'success') {
                setInvalid(response.data.message)
                setLoading(false)
            }
            if (response.data.message === 'success') {
                setLoading(false)
                const decode = jwt(response.data.token)
                if (decode.role === 'admin') {
                    localStorage.setItem("token", response.data.token)
                    history.push('/dashboard')
                } else {
                    setInvalid("Failed to login")
                }
            }
        } catch (error) {
            if (error) {
                setLoading(false)
                setInvalid("Failed to login")
            }
        }
    }

    return (
        <div className="auth">
            <div className="flex-center flex-column">
                <div className="card shadow border-0">
                    <div className="card-header text-center bg-white">
                        <h4 className="mb-0">Login Account</h4>
                        <p className="text-danger mb-0">{invalid ?? invalid}</p>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group mb-4">
                                {errors.phone && errors.phone.message ? (
                                    <small className="text-danger">{errors.phone && errors.phone.message}</small>
                                ) : <small>Phone number</small>
                                }
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control rounded-0 shadow-none"
                                    ref={register({
                                        required: "Phone number is required",
                                    })}
                                />
                            </div>

                            {/* <div className="text-right mb-3">
                                <Link to="/reset">Forgot password ?</Link>
                            </div> */}

                            <button type="submit"
                                className="btn float-right shadow-none text-white px-4 mt-3">
                                {loading ? (
                                    <p className="mb-0">Logging...</p>
                                ) : <p className="mb-0">Login</p>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;