import { useLocation } from 'react-router-dom';
import '../../Css/PagesCss/PersonalPage.css'
import PersonalProfile from '../Blocks/PersonalProfile.jsx';

function PersonalPage() {
    const location = useLocation();
    const { email, token } = location.state || {};

    return(
        <>
        <div className="PersonalPageMain">
            <header className='PersonalPageHeader'>
                Social-Fitwave 
            </header>
                <div className='PersonalPageComponents'>
                <aside className='PersonalPagePessoal'> 
                        <h1>Pessoal</h1>
                        {/*por a parte /default_profile_picture.jpg no sql e o 
                        resto no fica guardado no codigo e fica src={user.profilePictureUrl}*/}
                        <img src="http://localhost/Social-FitWave/Backend/uploads/default_profile_picture.jpg" width="100" height="100"/>
                        <PersonalProfile email={email} token={token}/>
                        
                    </aside>
                    <aside className='PersonalPageEvents'>
                        <h1>Eventos</h1>
                    </aside>
                    <aside className='PersonalPageSocial'>
                        <h1>social</h1>      
                    </aside>
                </div>
            <footer className='PersonalPageFooter'>
                &copy; {new Date().getFullYear()} Footer
            </footer>
        </div>
        </>
    )
}
export default PersonalPage