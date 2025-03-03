import { useState, useEffect } from 'react';

function useUserProfile(email, token) {
    const [user, setUser] = useState(null);  
    const [profileModalOpen, setProfileModalOpen] = useState(false);  
    const [editProfile, setEditProfile] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        profile_picture: ''
    });

    function ToggleModal(){
        setProfileModalOpen(!profileModalOpen)
    }

    const handleEvent = () => {
        setProfileModalOpen(true);
    };


    useEffect(() => {
        if (profileModalOpen && email) {
            fetchUser();
        }
    }, [profileModalOpen, email]);  

    const fetchUser = async () => {
        try {
            const response = await fetch("http://localhost/social-fitwave/Backend/routers/api.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    action: "account",
                    email: email  
                })
            });

            if (!response.ok) {
                throw new Error("Erro na resposta do servidor");
            }

            const data = await response.json();

            if (data.id) {
                setUser(data);  
                setEditProfile({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    password: '',  
                    profile_picture: data.profile_picture || ''
                });
            } else {
                console.error("Erro ao encontrar utilizador:", data);
            }
        } catch (error) {
            console.error("Erro ao encontrar utilizador:", error);
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();
    
        try {
            if (!editProfile.id) {
                console.error("ID do usuário não encontrado.");
                return;
            }
    
            const dataToSend = {
                action: "update_account",  
                id: editProfile.id,
                name: editProfile.name,
                email: editProfile.email,
                profile_picture: editProfile.profile_picture
            };
    
            if (editProfile.password) {
                dataToSend.password = editProfile.password;
            }
    
            const response = await fetch("http://localhost/social-fitwave/Backend/routers/api.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dataToSend)
            });
    
            const result = await response.json();
   
            if (result === true) {
                setProfileModalOpen(false);
                fetchUser();  
            } else {
                console.error("Erro ao atualizar perfil: A resposta da API não é válida.");
            }
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
        }
    };
    
    

    return {
        user,
        profileModalOpen,
        setProfileModalOpen,
        editProfile,
        setEditProfile,
        handleEvent,
        updateProfile,
        ToggleModal
    };
}

export default useUserProfile;

