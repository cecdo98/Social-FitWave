import ButtonLogout from '../Buttons/ButtonLogout.jsx';
import ProfileBlock from '../Blocks/ProfileBlock.jsx';

function PersonalProfile({email, token}){


    return(
        <>
            <div>
                    <div>
                        <ProfileBlock email={email} token={token} />
                    </div>
                    <div>
                        <ButtonLogout token={token}/>
                    </div>
            </div>
        </>
    );
}

export default PersonalProfile