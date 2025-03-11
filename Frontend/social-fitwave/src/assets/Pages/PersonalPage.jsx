import { useLocation } from 'react-router-dom';
import '../../Css/PagesCss/PersonalPage.css'
import PersonalProfile from '../Blocks/PersonalProfile.jsx';

function PersonalPage() {
    const location = useLocation();
    const { email, token } = location.state || {};

    return(
        <>
        <div className="PersonalPageMain">
                <nav className='PersonalPagePessoal' >
                    {/*por a parte /default_profile_picture.jpg no sql e o 
                    resto no fica guardado no codigo e fica src={user.profilePictureUrl}*/}
                    <img src="http://localhost/Social-FitWave/Backend/uploads/default_profile_picture.jpg" alt="Fotografia de perfil" width="100" height="100"/>
                    <h1>Social-Fitwave </h1>
                    <PersonalProfile email={email} token={token}/>           
                </nav>

                <div className='PersonalPageComponents' >
                    <div className='PersonalPageEvents'>
                        <h1>Eventos</h1>
                    </div>
                </div>
            <footer className='PersonalPageFooter'>
                &copy; {new Date().getFullYear()} Footer
            </footer>
        </div>
        </>
    )
}
export default PersonalPage