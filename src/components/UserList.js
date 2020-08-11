import React from 'react';
import profileImg from '../assets/static/user.jpg';
import { Link } from 'react-router-dom';


const UserList = ({ users }) => {
    return (
        <div>
            {users.length > 0 && users.map((user, i) =>
                <div className="d-flex p-2 px-lg-3 border-bottom" key={i}>
                    <div className="img-box rounded-circle">
                        <img src={profileImg} className="img-fluid" alt="..." />
                    </div>
                    <div className="pl-3 pr-2">
                        <p className="mb-0">{user.title.slice(0, 10)}</p>
                    </div>
                    {/* <div className="ml-auto px-1">
                        <button type="button" className="btn btn-sm btn-light shadow-none text-danger">Block</button>
                    </div> */}
                    <div className="ml-auto px-1">
                        <button type="button" className="btn btn-sm btn-light shadow-none follow-btn">Follow</button>
                    </div>
                    <div className="px-1">
                        <Link to={`/dashboard/user/${user.id}`} type="button" className="btn btn-sm btn-light shadow-none text-dark">Profile</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;