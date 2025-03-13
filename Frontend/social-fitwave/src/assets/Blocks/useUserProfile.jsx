import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../config';


function useUserProfile(email, token) {
    const navigate = useNavigate();
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
            const response = await fetch(`${API_URL}`, {
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
                    id: data.id || null,
                    name: data.name || '',
                    email: data.email || '',
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
                return;
            }
    
            const dataToSend = {
                action: "update_account",  
                id: editProfile.id,
                name: editProfile.name,
                email: editProfile.email,
                profile_picture: editProfile.profile_picture  
            };
    
    
            const response = await fetch(`${API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dataToSend)
            });
    
  
            const result = await response.json();
    
    
            if (result.success === true) {
                setProfileModalOpen(false);
                fetchUser();  
            } else {
                console.error("Erro ao atualizar perfil:", result);
            }
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
        }
    };
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditProfile({ ...editProfile, profile_picture: file.name });
        }
    };

    const HandleDelete = async (e) => {
        e.preventDefault();

        const confirmDelete = window.confirm("Tem certeza que deseja apagar a sua conta? Esta ação não pode ser desfeita!");

        if (!confirmDelete) {
            return;  
        }

        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ action: "delete_account", email })
        });

        const data = await response.json();

        if (data.success) {
            navigate("/");
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
        ToggleModal,
        HandleDelete,
        handleImageChange  
    };
}

export default useUserProfile;

