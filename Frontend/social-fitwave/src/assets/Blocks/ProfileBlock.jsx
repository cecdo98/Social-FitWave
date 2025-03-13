import { useState } from "react";
import useUserProfile from "./useUserProfile";
import '../../Css/BlockCss/ModalBlock.Css'
import { IMAGE_URL } from "../../config";

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

    const imagePath = `${IMAGE_URL}`;
    const profileImagePath = selectedFile
        ? URL.createObjectURL(selectedFile) 
        : user?.profile_picture
        ? `${imagePath}${user.profile_picture}`
        : `${imagePath}default_profile_picture.png`;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            handleImageChange(e); 
        }
    };

    return (
        <>
            <button onClick={handleEvent}
            className="ProfileButton">
                <i className='bx bxs-user'></i>
            </button>

            {profileModalOpen && user && (
                <div className="modal">
                    <div className="modalOverlay">
                        <form className="modal-content" onSubmit={updateProfile}>
                            <h2 className="Titulo">Perfil do Utilizador</h2>
                            <div className="modalBody"> 
                                <div className="modalImg">
                                    <h3>Foto de Perfil</h3>
                                    <img 
                                        src={profileImagePath} 
                                        alt="Foto de Perfil" 
                                        width="150"
                                    />

                                    <input 
                                        type="file" 
                                        accept={imagePath} 
                                        onChange={handleFileChange} 
                                        id="fileInput"
                                        style={{ display: "none" }}
                                    />


                                    <label htmlFor="fileInput" className="customFileButton">
                                    Escolher Imagem
                                    </label>


                                    {selectedFile && <p>Selecionado: {selectedFile.name}</p>}
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
                                <button className="modalButtonUpdate" type="submit">Atualizar</button>
                                <button className="modalButtonClose" onClick={ToggleModal}>Fechar</button>
                                <button className="modalButtonDelete" onClick={HandleDelete}>Apagar conta</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileBlock;
