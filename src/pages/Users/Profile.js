import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import Modal from 'react-bootstrap/Modal';
import { user, phone, coinDollar, statsBars2 } from 'react-icons-kit/icomoon';
import UserImg from '../../assets/static/user.jpg';


const Profile = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className="user-profile">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card border-0mb-3">
                            <div className="card-body p-lg-4">
                                <div className="d-lg-flex">

                                    {/* User Profile Picture */}
                                    <div className="profile-picture-box rounded-circle">
                                        <img src={UserImg} className="img-fluid" alt="..." />
                                    </div>

                                    {/* User Info */}
                                    <div className="user-info mt-3 mt-lg-2 ml-3 ml-lg-4">
                                        <ul>
                                            <li>
                                                <p><Icon size={16} icon={user} /><span className="pl-2">abdullah al mamun</span></p>
                                            </li>
                                            <li>
                                                <p><Icon size={16} icon={phone} /><span className="pl-2">01533592610</span></p>
                                            </li>
                                            <li>
                                                <p><Icon size={16} icon={coinDollar} /><span className="pl-2">500</span></p>
                                            </li>
                                            <li>
                                                <p><Icon size={16} icon={statsBars2} /><span className="pl-2">3</span></p>
                                            </li>
                                        </ul>
                                        <button type="button" className="btn shadow-none text-white" onClick={handleShow}>Give Me Coin</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Coin sent modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Coin</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    <form>
                        <div className="form-group mb-3">
                            <input type="number" className="form-control shadow-none" placeholder="Enter coin amount" />
                        </div>
                        <button type="submit" className="btn shadow-none text-white btn-block submit-btn">Send</button>
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default Profile;