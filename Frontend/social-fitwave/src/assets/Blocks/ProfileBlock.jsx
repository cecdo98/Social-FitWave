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
        ToggleModal
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
                                <div>
                                    {/*falta a foto de perfil atual para atualizar */}
                                    <label>Foto de Perfil:</label>
                                    <img src="http://localhost/Social-FitWave/Backend/uploads/default_profile_picture.jpg" alt="Fotografia de perfil" width="100" height="100"/>
                                </div>
                                <div>
                                    <div>
                                        <p><strong>Nome antigo:</strong> {user.name}</p>
                                        <label>Nome:</label>
                                        <input
                                            type="text"
                                            value={editProfile.name}
                                            onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <p><strong>Email antigo:</strong> {user.email}</p>
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            value={editProfile.email}
                                            onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                                        />
                                    </div>
                                    <div >
                                        <label>Nova Senha:</label>
                                        <input
                                            type="password"
                                            value={editProfile.password}
                                            onChange={(e) => setEditProfile({ ...editProfile, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modalFooter">
                                <div>
                                    <button type="submit">Atualizar</button>
                                </div>
                                <div>
                                    <button onClick={ToggleModal}>Fechar</button>
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
