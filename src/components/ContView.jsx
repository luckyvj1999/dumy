import React, { useEffect, useState } from 'react';
import './ContView.css';
import { GoPlusCircle } from "react-icons/go";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import AddCont from './AddCont';
import ContDeat from './ContDeat';
import sampleData from '../json/sample.json'; 

const ContView = () => {
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setData(sampleData);
  }, []);

  const onUpdateData = (newData) => {
    const index = data.findIndex(item => item.id === newData.id);
    if (index !== -1) {
      data[index] = newData;
      setData([...data]);
    } else {
      setData(prevState => [...prevState, newData]);
    }
  }

  const handleDelete=(id)=>{
    const newData = data.filter(item=>item.id !== id);
    setData(newData)
  }

  const filteredData = data.filter(contact => {
    const searchString = `${contact.phone.toLowerCase()}`;
    return searchString.includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <section id='cont-view'>
        <div className="row">
          <div className="col">
            <div className='container' >
              <h2>All Contacts</h2>
              <GoPlusCircle onClick={() => setAddForm(true)} />
            </div>
            <div className='search'>
              <div className="input-group">
                <input  type="search" 
                  className="form-control rounded" 
                  placeholder="Search Contact" 
                  aria-label="Search" 
                  aria-describedby="search-addon" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}/>
              </div>
            </div>
            <div className='cards '>
              {filteredData.map((contact, index) => (
                <div className='card' key={contact.id}>
                  <div className='cardInner'>
                    <div className='sno'>
                      <span>{index + 1}</span>
                    </div>
                    <div className='card-cent d-flex justify-content-start align-items-center'>
                      <div className='useIcon '>
                        <FaRegCircleUser />
                      </div>
                      <div className='card-user-det'>
                        <h3>{contact.name}</h3>
                        <span>{contact.phone}</span>
                      </div>
                    </div>
                    <div className='card-right d-flex justify-content-center align-items-center'>
                      <IoEyeSharp onClick={() => {setViewDetail(true); setSelectedData(contact)}}  />
                      <AiFillDelete onClick={() => handleDelete(contact.id)} />
                      <MdModeEdit onClick={() => {setEditForm(true); setSelectedData(contact) }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div>
        {addForm && <AddCont onUpdateData={onUpdateData} onCrossPress={() => { setAddForm(false); }} />}
      </div>
      <div>
        {editForm && <AddCont onUpdateData={onUpdateData} selectedData={selectedData} onCrossPress={() => setEditForm(false)} />}
      </div>
      <div>
        {viewDetail && <ContDeat selectedData={selectedData} onCrossPress={() => setViewDetail(false)} />}
      </div>
    </>
  )
}

export default ContView;
