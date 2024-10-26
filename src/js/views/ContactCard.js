import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleDelete = () => {
      actions.deleteContact(contact.id); // Elimina el contacto por ID
  };

  const handleEdit = () => {
    navigate(`/editar-contacto/${contact.id}`); // Redirige a la página de edición
  };

  return (
    <li className="list-group-item d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <img
          src="https://thispersondoesnotexist.com/"
          className="rounded-circle mr-3"
          style={{ width: "90px", height: "90px", marginRight: "15px"}}
        />

      <div>
        <h5>{contact.name}</h5>
        <p><i class="fa-solid fa-location-dot"></i> {contact.address}</p>
        <p><i class="fa-solid fa-phone"></i> {contact.phone}</p>
        <p><i class="fa-solid fa-envelope"></i> {contact.email}</p>       
      </div>
      </div>
      <div className="d-flex align-items-center">
        <button onClick={handleEdit} className="btn btn-outline-dark mr-2"><i class="fa-solid fa-pencil"></i></button>
        <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i class="fa-solid fa-trash"></i>
        </button>
        <div className="modal fade" id={"exampleModal"} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                If you delete thing entire universe will go down!
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Oh no!</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>Yes baby!</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </li>
  );
};

export default ContactCard;


