import { useState, useEffect } from "react";
import useUserProfile from "./useUserProfile";

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
                <div>
                    <h2>Perfil do Utilizador</h2>
                    <form onSubmit={updateProfile}>
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
                        <div>
                            <label>Nova Senha:</label>
                            <input
                                type="password"
                                value={editProfile.password}
                                onChange={(e) => setEditProfile({ ...editProfile, password: e.target.value })}
                            />
                        </div>
                        <div>
                            {/*falta a foto de perfil atual para atualizar */}
                            <label>Foto de Perfil:</label>

                        </div>
                        <div>
                            <button type="submit">Atualizar</button>
                        </div>
                        <div>
                            <button onClick={ToggleModal}>Fechar</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default ProfileBlock;
