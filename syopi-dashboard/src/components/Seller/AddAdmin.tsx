import React, { useState } from 'react'
import Navbar from '../Navbar'
import './Seller.css'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default function AddAdmin(props:any) {
    let [userId, setUserId] = useState('')
    let [email, setemail] = useState('')
    let [shopId, setshopId] = useState('')
    let [userName, setuserName] = useState('')
    let [adminStatus, setadminStatus] = useState('')
    
    

    // const handleFileSelected = (e) => {
    //     // setImage(e.target.files[0]);
    //     console.log(files)
    //     };

    function checkUpload(event:any){
        console.log(event.target.files)
        // setImage(event.target.files)
        // console.log(image)
    }

    // function uploadImage(){
    //     const avatarFile = event.target.files[0]
    //     const { data, error } = await supabase
    //     .storage
    //     .from('avatars')
    //     .upload('public/avatar1.png', avatarFile, {
    //         cacheControl: '3600',
    //         upsert: false
    //     })
    // }

    // function uploadImage(){

    //     const handleSubmit = async (e) => {
    // e.preventDefault();
    //     // upload image
    //     };

        

    // }

function addAdmin() {
        const sentData = {
            UserId: userId,
            Email: email,
            ShopId: shopId,
            UserName: userName,
            AdminStatus: adminStatus
        }


        fetch(`http://127.0.0.1:5000/product/addproduct`, {
            method:'POST',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: JSON.stringify(sentData)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);

        })
        .catch((error) => {
            console.error("Error:", error);
        })
    }


    return (
        <>
        <Modal show = {props.show} size='lg' onHide= {props.onHide} centered>
        <Modal.Header closeButton>
        <Modal.Title>
                    Add Admin
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form className='seller-form'>
                <div className='row' style={{margin:'0'}}>
                    <div className='col-4 seller-grid'>
                        <p>User Id</p>
                    </div>
                    <div className='col-8'>
                        <input type='text' className='form-control' placeholder='User Id' onChange={(e) => setUserId(e.target.value)}/>
                        
                    </div>
                </div>
                <div className='row' style={{margin:'0'}}>
                    <div className='col-4 seller-grid'>
                        <p>Email</p>
                    </div>
                    <div className='col-8'>
                        <input type='text' className='form-control' placeholder='Email' onChange={(e) => setemail(e.target.value)}/>
                    </div>
                </div>
                <div className='row' style={{margin:'0'}}>
                    <div className='col-4 seller-grid'>
                        <p>User Name</p>
                    </div>
                    <div className='col-8'>
                    <input type='text' className='form-control' placeholder='User Name' onChange={(e) => setuserName(e.target.value)}/>
                    </div>
                </div>
                <div className='row'>
                    <button onClick={()=> {addAdmin(); setadminStatus('Active') ; setshopId({shopId})}}>Submit</button>
                </div>
            </form>
        
      </Modal.Body>
        </Modal>
        
        </>
    )
    }