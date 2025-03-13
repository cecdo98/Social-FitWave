import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../Css/PagesCss/PersonalPage.css';
import PersonalProfile from '../Blocks/PersonalProfile.jsx';
import { IMAGE_URL } from '../../config.js';
import { API_URL } from '../../config.js';
import ButtonNewEvent from '../Buttons/ButtonNewEvent.jsx'


const getProfilePicture = async (email, token) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                action: "get_profile_picture",
                email: email
            })
        });

        const data = await response.json();

        if (data.success) {
            return data.profile_picture; 
        } else {
            console.error("Erro ao encontrar foto de perfil:", data.message);
            return null;
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null; 
    }
};

function PersonalPage() {
    const location = useLocation();
    const { email, token } = location.state || {};
    
    const [profileImage, setProfileImage] = useState(""); 

    useEffect(() => {
        const loadProfilePicture = async () => {
            const picture = await getProfilePicture(email, token);
            setProfileImage(picture);
        };
        loadProfilePicture();
    }, [email, token]); 

    return (
        <div className="PersonalPageMain">
            <nav className='PersonalPagePessoal'>
                <img
                    src={profileImage ? profileImage : `${IMAGE_URL}default_profile_picture.png`}
                    alt="Fotografia de perfil"
                    width="100"
                    height="100"
                />
                <h1>Social-Fitwave</h1>
                <PersonalProfile email={email} token={token} />
            </nav>

            <div className='PersonalPageComponents'>
                <div className='PersonalPageEvents'>
                    <h1>Eventos</h1>
                    <ButtonNewEvent/>
                </div>
            </div>

            <footer className='PersonalPageFooter'>
                &copy; {new Date().getFullYear()} Social-Fitwave
            </footer>
        </div>
    );
}

export default PersonalPage;
