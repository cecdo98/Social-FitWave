import { useNavigate } from "react-router-dom";

function ButtonLogout({token}){

    const navigate=useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        sessionStorage.removeItem("userToken");
        navigate("/",{replace: true});
    }

    return(
        <>
            <button
                onClick={handleLogout}
                className="LogoutButton"
            >
                <i className='bx bx-log-out'></i>
            </button>
        </>
    )
}

export default ButtonLogout