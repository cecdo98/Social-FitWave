import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../Css/PagesCss/PersonalPage.css';
import PersonalProfile from '../Blocks/PersonalProfile.jsx';

// Função para buscar a foto de perfil usando a API
const getProfilePicture = async (email, token) => {
    try {
        const response = await fetch("http://localhost/social-fitwave/Backend/routers/api.php", {
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
            return data.profile_picture; // Retorna o caminho da imagem
        } else {
            console.error("Erro ao buscar foto de perfil:", data.message);
            return null; // Caso não tenha foto
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null; // Em caso de erro
    }
};

function PersonalPage() {
    const location = useLocation();
    const { email, token } = location.state || {};
    
    const [profileImage, setProfileImage] = useState(""); // Para armazenar o caminho da foto de perfil

    useEffect(() => {
        // Carregar a foto de perfil assim que o componente for montado
        const loadProfilePicture = async () => {
            const picture = await getProfilePicture(email, token);
            setProfileImage(picture);
        };
        loadProfilePicture();
    }, [email, token]); // Quando o email ou token mudarem, refazer a requisição

    return (
        <div className="PersonalPageMain">
            <nav className='PersonalPagePessoal'>
                <img
                    src={profileImage ? profileImage : "http://localhost/Social-FitWave/Backend/uploads/default_profile_picture.jpg"}
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
                </div>
            </div>

            <footer className='PersonalPageFooter'>
                &copy; {new Date().getFullYear()} Footer
            </footer>
        </div>
    );
}

export default PersonalPage;
