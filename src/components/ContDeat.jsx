import React, { useEffect, useState } from 'react';
import './ContDeat.css';
import './AddCont.css';
import { RxCross2 } from "react-icons/rx";

const ContDeat = ({ onCrossPress, selectedData }) => {
    const [detailData, setDetailData] = useState([]);

    useEffect(() => {
        if (selectedData) {
            setDetailData(selectedData);
        }
    }, [selectedData]);

    return (
        <section id='cont-deat'>
            <div className='add-cont-inn'>
                <div className='add-cont-inn-head'>
                    <h4>Contact Detail</h4>
                    <RxCross2 onClick={onCrossPress} />
                </div>
                <div className='cont-det'>
                    <div className='cont-det-inn'>
                        {detailData && (
                            <div className='spa'>
                                <span><span className="label">Name:</span> {detailData.name}</span>
                                <span><span className="label">Email:</span> {detailData.email}</span>
                                <span><span className="label">Number:</span> {detailData.phone}</span>
                                <span><span className="label">Address:</span> {detailData.address}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContDeat;
