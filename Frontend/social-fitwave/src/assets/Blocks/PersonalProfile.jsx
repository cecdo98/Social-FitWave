import { useState } from "react";
import ButtonLogout from '../Buttons/ButtonLogout.jsx';
import ProfileBlock from '../Blocks/ProfileBlock.jsx';

function PersonalProfile({email, token}){
    const [optionsModalOpen, setOptionsModalOpen] = useState(false);


    function Options(){
        setOptionsModalOpen(!optionsModalOpen)
    }

    return(
        <>
            <div>
                <div>
                    {/*Nao se sabe se vai implementar */}
                    <i className='bx bx-plus-circle'></i>
                    Novo evento
                </div>
                <div>
                    <button
                    onClick={Options}
                    >
                    <i className='bx bxs-cog'></i>
                        Definições
                    </button>
                </div>
            </div>

            {optionsModalOpen && (
                <div>
                    <div>
                        <ProfileBlock email={email} token={token} />
                    </div>
                    <div>
                        <ButtonLogout token={token}/>
                    </div>
                </div>
            )}
        </>
    );
}

export default PersonalProfile