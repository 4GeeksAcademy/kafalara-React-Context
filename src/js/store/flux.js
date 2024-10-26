const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [] 
        },
        actions: {
            // Acción para obtener los contactos desde la API (GET)
            getContacts: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/agendas/kafalara/contacts`);
                    const data = await response.json();
                    if (response.ok) {
                        setStore({ contacts: data.contacts });
                    } else {
                        if (response.status==404) {
                            getActions().createAgenda()
                        }
                        console.error("Error al obtener los contactos");
                    }
                } catch (error) {
                    console.error("Error al obtener los contactos", error);
                }
            },

            createAgenda: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/agendas/kafalara`, {
                        method: "POST",
                    });

                    if (response.ok) {
                      
                       console.log("Se creo la agenda");
                       
                    } else {
                        console.error("Error al crear el contacto");
                    }
                } catch (error) {
                    console.error("Error al crear el contacto", error);
                }
            },


            // nuevo contacto a la agenda - POST
            addContact: async (contact) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/agendas/kafalara/contacts`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: contact.name,
                            email: contact.email,
                            phone: contact.phone,
                            address: contact.address,
                        })
                    });
const data = await response.json()
                    if (response.ok) {
                      setStore({contacts: [...getStore().contacts,data]})
                      return true
                    } else {
                        console.error("Error al crear el contacto");
                        return false
                    }
                } catch (error) {
                    console.error("Error al crear el contacto", error);
                    return false
                }
            },

            //actualizar un contacto existente - PUT
            updateContact: async (updatedContact) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/agendas/kafalara/contacts/${updatedContact.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: updatedContact.name,
                            email: updatedContact.email,
                            phone: updatedContact.phone,
                            address: updatedContact.address,
      
                        })
                    });

                    if (response.ok) {
                        // recarga la lista de contactos
                        getActions().getContacts();
                    } else {
                        console.error("Error al actualizar el contacto");
                    }
                } catch (error) {
                    console.error("Error al actualizar el contacto", error);
                }
            },

            // eliminar un contacto
            deleteContact: async (id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/agendas/kafalara/contacts/${id}`, {
                        method: "DELETE"
                    });

                    if (response.ok) {
                       
                        getActions().getContacts();
                    } else {
                        console.error("Error al eliminar el contacto");
                    }
                } catch (error) {
                    console.error("Error al eliminar el contacto", error);
                }
            }
        }
    };
};

export default getState;

