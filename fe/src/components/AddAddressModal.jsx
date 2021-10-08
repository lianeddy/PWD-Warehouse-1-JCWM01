import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Modal, Button } from 'react-bootstrap'
import * as Yup from 'yup'
import axios from 'axios'
import { API_URL } from '../helper/index'
import { useSelector } from 'react-redux'

const AddAddressModal = ({ show, handleClose }) => {
    const userGlobal = useSelector((state) => state.users);
    const { idUser } = userGlobal
    const [successUpload, setSuccessUpload] = useState(false)

    const addressDataInitialValues = {
        //diisi dari redux
        recipientName: "",
        phoneNumber: "",
        jalan: "",
        kecamatan: "",
        kota: "",
        provinsi: "",
        zip: "",
        isDefault: ""

    }

    const addressDataValidationSchema = Yup.object().shape({
        recipientName: Yup.string().required("Recipient name is required"),
        phoneNumber: Yup.number().required("Phone number is required"),
        jalan: Yup.string().required("Street is required"),
        kecamatan: Yup.string().required("Subdivision is required"),
        kota: Yup.string().required("City is required"),
        provinsi: Yup.string().required("Province is required"),
        zip: Yup.number().required("ZIP is required"),

    })

    const onSubmit = (data) => {

        if (data.isDefault == true) {
            data = { ...data, isDefault: 1 }
        } else if (data.isDefault == false) {
            data = { ...data, isDefault: 0 }
        }
        data = { ...data, idUser: idUser }
        console.log(data);
        axios.post(`${API_URL}/address`, { data })
            .then((res) => {
                console.log(res);
                setSuccessUpload(res.data.success)
                alert(res.data.message)
                handleClose()
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Choose Your Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={addressDataInitialValues}
                    onSubmit={onSubmit}
                    validationSchema={addressDataValidationSchema}
                    enableReinitialize={true}>

                    <Form>
                        <div className="profile-main-data">
                            <div className="input-container">
                                <ErrorMessage name="recipientName" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="recipientName" placeholder="Recipient Name" />
                            </div>


                            <div className="input-container">
                                <ErrorMessage name="phoneNumber" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="phoneNumber" placeholder="Phone Number" />
                            </div>


                            <div className="input-container">
                                <ErrorMessage name="jalan" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="jalan" placeholder="Street" />
                            </div>


                            <div className="input-container">
                                <ErrorMessage name="kecamatan" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="kecamatan" placeholder="Subdivision" />
                            </div>


                            <div className="input-container">
                                <ErrorMessage name="kota" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="kota" placeholder="City" />
                            </div>


                            <div className="input-container">
                                <ErrorMessage name="provinsi" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="provinsi" placeholder="Province" />
                            </div>


                            <div className="input-container">
                                <ErrorMessage name="zip" component="span" className="error-message" />
                                <Field type="text" autocomplete="off" className="input-field" name="zip" placeholder="ZIP" />
                            </div>
                        </div>
                        {successUpload ?
                            <button className="btn btn-success mt-2" disabled>Success</button>
                            :
                            <button type="submit" className="btn btn-warning">Add Address</button>
                        }

                    </Form>
                </Formik>

            </Modal.Body>

        </Modal>
    )
}

export default AddAddressModal