import React from 'react';
import noImage from '../assets/static/noimage.png';

const UserList = ({ users, updatestatus }) => {

    return (
        <div className="p-2">
            <table className="table table-sm table-responsive-sm table-borderless">
                <thead>
                    <tr>
                        <td>SL</td>
                        <td>Image</td>
                        <td>Name</td>
                        <td>Phone</td>
                        <td>Status</td>
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
                            <td className="text-capitalize pt-2">{user.account_status}</td>
                            <td className="text-center">
                                {user.account_status === 'pending' ?
                                    <button
                                        type="button"
                                        className="btn btn-primary shadow-none mt-1 mt-sm-0"
                                        onClick={() => updatestatus({ id: user.id, status: "confirmed" })}
                                    >Confirm</button>
                                    : user.account_status === 'confirmed' ?
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-danger shadow-none"
                                                onClick={() => updatestatus({ id: user.id, status: "blocked" })}
                                            >Block</button>
                                            <button type="button" className="btn btn-success shadow-none mt-1 mt-sm-0">Give Coin</button>
                                        </div>
                                        : user.account_status === 'blocked' ?
                                            <button
                                                type="button"
                                                className="btn btn-warning shadow-none"
                                                onClick={() => updatestatus({ id: user.id, status: "confirmed" })}
                                            >Unblock</button>
                                            : null
                                }

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
};

export default UserList;