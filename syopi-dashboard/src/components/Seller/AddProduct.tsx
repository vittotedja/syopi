import React, { useState } from 'react'
import Navbar from '../Navbar'
import './Seller.css'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ImageUploadPreviewComponent from './ImageUploadPreviewComponent.js'


function AddProduct() {
    let [productName, setProductName] = useState()
    let [category, setCategory] = useState()
    let [productDescription, setProductDescription] = useState()
    let [price, setPrice] = useState()
    let [stock, setStock] = useState()
    const [image, setImage] = useState([])

    // const handleFileSelected = (e) => {
    //     // setImage(e.target.files[0]);
    //     console.log(files)
    //     };

    function checkUpload(event){
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

    function addProduct() {
        const sentData = {
            ProductName: productName,
            Category: category,
            ProductDescription: productDescription,
            Price: price,
            Stock: stock,
            Image: image
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
        <div className='seller-container'>
            <div className='row'>
                <div className='col-12'>
                    <p className='seller-page-title'>Add Produk</p>
                </div>
            </div>
        </div>
        <div className='seller-container'>
            <form className='seller-form'>
                <div className='row' style={{margin:'0'}}>
                    <div className='col-4 seller-grid'>
                        <p>Product Name</p>
                    </div>
                    <div className='col-8'>
                        <input type='text' className='form-control' placeholder='Product Name' onChange={(e) => setProductName(e.target.value)}/>
                        
                    </div>
                </div>
                <div className='row' style={{margin:'0'}}>
                    <div className='col-4 seller-grid'>
                        <p>Category</p>
                    </div>
                    <div className='col-8'>
                        <input type='text' className='form-control' placeholder='Category' onChange={(e) => setCategory(e.target.value)}/>
                    </div>
                </div>
                <div className='row' style={{margin:'0'}}>
                    <div className='col-4 seller-grid'>
                        <p>Product Description</p>
                    </div>
                    <div className='col-8'>
                        <textarea className='form-control' placeholder='Product Description' onChange={(e) => setProductDescription(e.target.value)}/>
                    </div>
                </div>
                <div className='row' style={{margin:'0'}}>
                    <div className='col-4 seller-grid'>
                        <p>Price</p>
                    </div>
                    <div className='col-8'>
                        <input type='text' className='form-control' placeholder='10.00' onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                </div>
                <div className='row' style={{margin:'0'}}>
                    <div className='col-4 seller-grid'>
                        <p>Stock</p>
                    </div>
                    <div className='col-8'>
                        <input type='text' className='form-control' placeholder='Input Total Stock Available' onChange={(e) => setStock(e.target.value)}/>
                    </div>
                </div>
                <div className='row' style={{margin:'0'}}>
                    <div className='col-4 seller-grid'>
                        <p>Image</p>
                    </div>
                    <div className='col-8'>
                    <input type="file" name="image[]" onChange={checkUpload} multiple/>
                    {image}
                    </div>
                </div>
                <div className='row'>
                    <Button onClick={()=> addProduct()}>Submit</Button>
                </div>
            </form>
        </div>
        </>
    )
    }

    export default AddProduct