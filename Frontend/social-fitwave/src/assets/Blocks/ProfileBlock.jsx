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
        HandleDelete,
        handleImageChange
    } = useUserProfile(email, token);

    const [selectedFile, setSelectedFile] = useState(null);

    const imagePath = "http://localhost/social-fitwave/Backend/uploads/";
    const profileImagePath = user?.profile_picture
        ? `${imagePath}${user.profile_picture}`
        : `${imagePath}default_profile_picture.png`;

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    return (
        <>
            <button onClick={handleEvent}>
                <i className='bx bxs-user'></i>
            </button>

            {profileModalOpen && user && (
                <div className="modal">
                    <div className="modalOverlay">
                        <form className="modal-content" onSubmit={updateProfile}>
                            <h2 className="Titulo">Perfil do Utilizador</h2>
                            <div className="modalBody"> 
                                <div className="modalImg">
                                    <h3> Foto de Perfil</h3>
                                    <img 
                                        src={profileImagePath} 
                                        alt="Foto de Perfil" 
                                        width="150"
                                    />
                                    <input type="file" accept="image/*" onChange={handleImageChange} />
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
                                        <h3>Palavra-passe: </h3>
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

