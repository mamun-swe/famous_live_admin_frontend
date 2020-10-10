import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6 col-md-4">
                        <Link to='/dashboard/users'>
                            <div className="card border-0 shadow p-2">
                                <div className="flex-center flex-column text-center">
                                    <h4 className="text-success">1200</h4>
                                    <p className="text-dark">users</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-6 col-md-4">
                        <Link to='/dashboard/requests'>
                            <div className="card border-0 shadow p-2">
                                <div className="flex-center flex-column text-center">
                                    <h4 className="color-unique">1200</h4>
                                    <p className="text-dark">name update requests</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;