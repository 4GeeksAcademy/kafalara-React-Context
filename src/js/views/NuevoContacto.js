import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const NuevoContacto = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };



  // Enviar el nuevo contacto a la API (POST)
  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log("Enviando contacto:", contact); 
const response=await actions.addContact(contact)
if(response){
  navigate("/")
}
 
  };

  return (
    <div className="jumbotron">
      <h1 className="display-4">Add a new contact</h1>
      <form onSubmit={handleSubmit}>
        <input
        class="form-control"
          type="text"
          name="name"
          value={contact.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
        class="form-control"
          type="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />
        <input
        class="form-control"
          type="tel"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          placeholder="Enter phone"
        />
        <input
        class="form-control"
          type="text"
          name="address"
          value={contact.address}
          onChange={handleChange}
          placeholder="Enter address"
        />
        <button type="submit" className="btn btn-primary mt-3">Save</button>
      </form>
      <Link to="/">
        <button className="btn btn-secondary mt-3">Or get back to contacts</button>
      </Link>

      {/* Mostrar los contactos obtenidos */}
    
    </div>
  );
};

export default NuevoContacto;

