import React, { useEffect, useState } from 'react';
import './AddCont.css';
import { RxCross2 } from "react-icons/rx";

const AddCont = ({ onCrossPress, onUpdateData, selectedData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    })

    const [formDataErr, setFormDataErr] = useState({
        nameErr: '',
        emailErr: '',
        phoneErr: '',
        addressErr: '',
    })

    useEffect(() => {
        if (selectedData) {
            setFormData(selectedData)
        }
    }, [selectedData])


    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setFormDataErr((prevFormData) => ({ ...prevFormData, [name + 'Err']: '' }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!formData.name) {
            setFormDataErr((prevFormData) => ({ ...prevFormData, nameErr: 'Enter your name' }));
        } else if (!formData.email) {
            setFormDataErr((prevFormData) => ({ ...prevFormData, emailErr: 'Enter your email' }));
        }
        else if (!formData.email.match(regex)) {
            setFormDataErr((prevFormData) => ({ ...prevFormData, emailErr: 'Enter correct email' }));
        } else if (!formData.phone) {
            setFormDataErr((prevFormData) => ({ ...prevFormData, phoneErr: 'Enter your phone' }));
        }
        else if (formData.phone.length > 10 || formData.phone.length <= 9) {
            setFormDataErr((prevFormData) => ({ ...prevFormData, phoneErr: 'Enter Correct phone number' }));
        } else if (!formData.address) {
            setFormDataErr((prevFormData) => ({ ...prevFormData, addressErr: 'Enter your address' }));
        } else {
            onUpdateData({ id: Math.random(), ...formData })
            onCrossPress()
        }
    }

    return (
        <section id='add-cont'>
            <div className='add-cont-inn'>
                <div className='add-cont-inn-head'>
                    <h4>{selectedData ? 'Edit Contact' : 'Add Contact'}</h4>
                    <RxCross2 onClick={onCrossPress} />
                </div>
                <div className='form-cont d-flex justify-content-center align-items-center'>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='form-inn'>
                            <label >Name:</label>
                            <div>
                                <input type="text" name="name" value={formData.name} onChange={handleInput}
                                    className="formInput" placeholder="Enter your name" />
                                {formDataErr.nameErr ? <p className="err">{formDataErr.nameErr}</p> : null}
                            </div>
                        </div>
                        <div className='form-inn'>
                            <label >Email:</label>
                            <div>
                                <input type="text" name="email" value={formData.email} onChange={handleInput}
                                    className="formInput" placeholder="Enter your email" />
                                {formDataErr.emailErr ? <p className="err">{formDataErr.emailErr}</p> : null}
                            </div>
                        </div>
                        <div className='form-inn'>
                            <label >Phone:</label>
                            <div>
                                <input type="text" name="phone" maxLength={10} value={formData.phone} onChange={handleInput}
                                    className="formInput" placeholder="Enter your phone number" />
                                {formDataErr.phoneErr ? <p className="err">{formDataErr.phoneErr}</p> : null}
                            </div>
                        </div>
                        <div className='form-inn'>
                            <label >Address:</label>
                            <div>
                                <input type="text" name="address" value={formData.address} onChange={handleInput}
                                    className="formInput" placeholder="Enter your address" />
                                {formDataErr.addressErr ? <p className="err">{formDataErr.addressErr}</p> : null}
                            </div>
                        </div>
                        <div className='form-btn'>
                            <button type="submit" class="btn btn-primary">{selectedData ? 'Update' : 'Submit'}</button>
                            <button type="button" class="btn btn-dark" onClick={() => {
                                setFormData({
                                    name: '',
                                    email: '',
                                    phone: '',
                                    address: '',
                                })
                            }}>Reset</button>
                        </div>
                    </form>
                </div>

            </div>
        </section>
    )
}

export default AddCont