import React, {useState, useEffect} from "react"
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import {Button,Form} from 'react-bootstrap'
import firebase from "../Config/firebase"
import { getDownloadURL, ref, uploadBytesResumable, listAll} from "firebase/storage";
import { v4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const initialState = { // initial state for our form
    name: "",
    price: "",
    description: "",
}


function ProductosAlta(){
    
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(null)
    const [form, setForm] = useState(initialState)// initial state for our form

    const navigate = useNavigate()

    const { name, price, description } = form 

   // const { register, handleSubmit, formState: { errors } } = useForm();

 /*   const onSubmit = async (data)=>{
        console.log("data",data)
        try{
            const document = await firebase.db.collection("productos")
            .add({
                ...form, 
                name:data.name,
                price:data.price,
                description:data.description
            })
            console.log(document)
        }catch(e){
            console.log(e)
        }
        
    }
    */
    useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(firebase.storage, `images/${file.name + v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            console.log("hola")
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setProgress(progress);
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
                        });
                }
            );
        };

        file && uploadFile();
    }, [file]);

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handlePrice = (event) => {
        setForm({ ...form, price: event.target.value })
    }

    const handleDescription = (event) => {
        setForm({ ...form, description: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (name && price && description) {
                try {
                    const document = await firebase.db.collection("productos")
                      .add({ ...form })
                } catch(error) {
                    console.log(error)
                }
        }
        navigate("/")
    }

    return(
      <div className="container-fluid mb-4">
        <div className="container">
            <div className="col-12">
            </div>
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-10 col-md-8 col-lg-6">
                <form className="row blog-form" onSubmit={handleSubmit}>
                <div className="col-12 py-3">
                <input
                                    type="text"
                                    className="form-control input-text-box"
                                    placeholder="Nombre"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                />
                </div>
                <div className="col-12 py-3">
                <input
                                    type="text"
                                    className="form-control input-text-box"
                                    placeholder="Precio"
                                    name="price"
                                    value={price}
                                    onChange={handlePrice}
                                />
                </div>
                <div className="col-12 py-3">
                <input
                                    type="text"
                                    className="form-control input-text-box"
                                    placeholder="Descripcion"
                                    name="description"
                                    value={description}
                                    onChange={handleDescription}
                                />
                </div>
                <div className="mb-3">
                                <input
                                    type="file"
                                    className="form-control"
                                // everytime you select a file on this input we'll call this function (yhe arrow one we are creating)
                                // which basically sets the image upload to be equal to the event.target.files
                                // so you can access the file in this specific input. And since we can select multiple files
                                // files will be an array, but for now we are uploading only one file so it will
                                // be the first element in the array, so files[0]
                                    onChange={(event)=> {
                                        setFile(event.target.files[0])
                                    }}
                                />
                            </div>
                            <div className="col-12 py-3 text-center">
                                <button
                                className="btn btn-add"
                                style={{background: "#bf7034", padding: "10px 50px", color: "white"}}
                                    type="submit"
                                    //onClick={uploadImage}
                                    disabled={progress !== null && progress < 100}
                                >Publicar</button>
                            </div>
                </form>
                </div>
            </div>
        </div>
      </div>
    )
} 

export default ProductosAlta