import { useState, useEffect } from "react";
import useUserProfile from "./useUserProfile";
import '../../Css/BlockCss/ModalBlock.Css'


function ProfileBlock({ email, token }) {
    const {
        user,
        profileModalOpen,
        setProfileModalOpen,
        editProfile,
        setEditProfile,
        handleEvent,
        updateProfile,
        ToggleModal,
        HandleDelete
    } = useUserProfile(email, token);

    return (
        <>
            <button onClick={handleEvent}>Perfil</button>

            {profileModalOpen && user && (
                <div className="modal">
                    <div className="modalOverlay">
                        <form className="modal-content" onSubmit={updateProfile}>
                            <h2 className="Titulo">Perfil do Utilizador</h2>
                            <div className="modalBody"> 
                                <div className="modalImg">
                                    {/*falta a foto de perfil atual para atualizar */}
                                    <h3> Foto de Perfil</h3>
                                    <img src="http://localhost/Social-FitWave/Backend/uploads/default_profile_picture.jpg" alt="Fotografia de perfil" width="100" height="100" />
                                    <button>Atualizar foto</button>
                                </div>
                                <div className="modalForm">
                                    <div className="modalInput">
                                        <h3>Nome antigo: {user.name}</h3>
                                        <input
                                            type="text"
                                            placeholder="Nome"
                                            value={editProfile.name}
                                            onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="modalInput">
                                        <h3>Email antigo: {user.email}</h3>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={editProfile.email}
                                            onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="modalInput">
                                        <h3>Palavra-passe </h3>
                                        <input
                                            type="password"
                                            placeholder="Palavra-passe"
                                            value={editProfile.password}
                                            onChange={(e) => setEditProfile({ ...editProfile, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modalFooter">
                                <div >
                                    <button className="modalButtonUpdate" type="submit">Atualizar</button>
                                </div>
                                <div>
                                    <button className="modalButtonClose" onClick={ToggleModal}>Fechar</button>
                                </div>
                                <div>
                                    <button className="modalButtonDelete" onClick={HandleDelete}>Apagar conta</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileBlock;
