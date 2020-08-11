import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import Modal from 'react-bootstrap/Modal';
import { user, phone, coinDollar, statsBars2 } from 'react-icons-kit/icomoon';
import UserImg from '../../assets/static/user.jpg';

const MyProfile = () => {
    const [showImageModal, setShowImageModal] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showNameModal, setShowNameModal] = useState(false);

    // handle image modal
    const handleCloseImageModal = () => setShowImageModal(false);
    const handleShowImageModal = () => setShowImageModal(true);

    // handle phone modal
    const handleClosePhoneModal = () => setShowPhoneModal(false);
    const handleShowPhoneModal = () => setShowPhoneModal(true);

    // handle name modal
    const handleCloseNameModal = () => setShowNameModal(false);
    const handleShowNameModal = () => setShowNameModal(true);



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
                                    </div>

                                </div>

                                <div className="mt-3">
                                    <button type="button" className="btn shadow-none text-white" onClick={handleShowImageModal}>change image</button>
                                    <button type="button" className="btn shadow-none text-white mx-sm-2" onClick={handleShowPhoneModal}>change phone</button>
                                    <button type="button" className="btn shadow-none text-white" onClick={handleShowNameModal}>change name</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Image change modal */}
            <Modal show={showImageModal} onHide={handleCloseImageModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Image</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    <form>
                        <div className="form-group mb-3">
                            <input type="file" />
                        </div>
                        <button type="submit" className="btn shadow-none text-white btn-block submit-btn">Update</button>
                    </form>
                </Modal.Body>
            </Modal>


            {/* Phone change modal */}
            <Modal show={showPhoneModal} onHide={handleClosePhoneModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Change phone</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    <form>
                        <div className="form-group mb-3">
                            <input type="number" className="form-control shadow-none" placeholder="Enter new phone number" />
                        </div>
                        <button type="submit" className="btn shadow-none text-white btn-block submit-btn">update</button>
                    </form>
                </Modal.Body>
            </Modal>


            {/* Name change modal */}
            <Modal show={showNameModal} onHide={handleCloseNameModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Change name</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    <form>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control shadow-none" placeholder="Enter new name" />
                        </div>
                        <button type="submit" className="btn shadow-none text-white btn-block submit-btn">update</button>
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default MyProfile;