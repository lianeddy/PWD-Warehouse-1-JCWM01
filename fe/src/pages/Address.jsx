import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '../assets/styles/Profile.css'
import ImageModals from '../components/ImageModals';
import ProfileAddress from '../components/ProfileAddress';
import ProfileData from '../components/ProfileData';
import { API_URL } from '../helper';


const Address = () => {
    const userGlobal = useSelector((state) => state.users);
    const addressGlobal = useSelector((state) => state.addresses);
    const { fullName, email, userImage, idUser } = userGlobal
    // console.log(addressGlobal);
    const [show, setShow] = useState(false);
    const [profileNav, setProfileNav] = useState(1)

    const reload = () => window.location.reload();

    const handleClose = () => {
        setShow(false);
        reload()
    }

    const handleShow = () => setShow(true);

    const fetchDataUser = () => {
        const { idUser } = userGlobal
        console.log(idUser);
    }

    useEffect(() => {
        fetchDataUser()
    }, [])

    return (
        <>
            <div className="container mt-5">
                <div className="profile-container">
                    <div className="profile-sidebar">
                        <div className="profile-picture-container">
                            <img src={"http://localhost:3001/" + userImage} alt="Trulli" className="profilePicture" />
                        </div>
                        <button className="btn btn-dark mt-3" onClick={handleShow}>Change Photo Profile</button>
                        <div className="profile-photo-desc mt-3">
                            <p>Besar file: maksimum 5.000.000 bytes (5 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</p>
                        </div>
                        <button className="button-profile mt-3"  >
                            <Link to="/profile/change-password" style={{ textDecoration: 'none', color: 'white' }}>
                                Change Password
                            </Link>
                        </button>
                    </div>

                    <div className="profile-main">
                        <div className="profile-tab">
                            <div><a onClick={() => setProfileNav(1)}>PROFILE</a></div>
                            <div><a onClick={() => setProfileNav(2)}>ADDRESS</a></div>
                            <div><a >{profileNav}</a></div>
                        </div>

                        <div className="profile-main-detail">
                            <h1><strong>Hello, {fullName}</strong></h1>
                            <h6><strong>{email}</strong></h6>
                            <hr className="hr-line" />

                            <ProfileAddress setProfileNav={setProfileNav} addresses={addressGlobal} />
                        </div>
                    </div>

                </div>
            </div>


            <ImageModals show={show} handleClose={handleClose} userImage={userImage} />




        </>
    )
}

export default Address