import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import api from '../../api';

const Login = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false)

    const onSubmit = data => {
        setLoading(true)
        console.log(data);
        props.history.push('/dashboard')
        // axios.post(`${URL}auth/login`, data)
        //     .then(res => {
        //         if (res.status === 204) {
        //             setLoading(false)
        //             invalid()
        //         }

        //         if (res.status === 200) {
        //             localStorage.setItem('token', res.data.access_token)
        //             localStorage.setItem('id', res.data.id)
        //             props.history.push('/admin')
        //         }
        //     })
        //     .catch(err => {
        //         if (err) {
        //             console.log(err)
        //         }
        //     })
    }

    return (
        <div className="auth">
            <div className="flex-center flex-column">
                <div className="card shadow border-0">
                    <div className="card-header text-center bg-white">
                        <h4 className="mb-0">Login Account</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group mb-4">
                                {errors.email && errors.email.message ? (
                                    <small className="text-danger">{errors.email && errors.email.message}</small>
                                ) : <small>E-mail</small>
                                }
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control rounded-0 shadow-none"
                                    ref={register({
                                        required: "E-mail is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                            </div>

                            <div className="form-group mb-1">
                                {errors.password && errors.password.message ? (
                                    <small className="text-danger">{errors.password && errors.password.message}</small>
                                ) : <small>Password</small>
                                }
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control rounded-0 shadow-none"
                                    ref={register({
                                        minLength: {
                                            value: 8,
                                            message: "Please enter minimum 8 characters",
                                        },
                                        required: "Please enter password",
                                    })}
                                />
                            </div>
                            <div className="text-right mb-3">
                                <Link to="/reset">Forgot password ?</Link>
                            </div>

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