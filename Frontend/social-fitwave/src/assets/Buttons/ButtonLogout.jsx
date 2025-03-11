import { useNavigate } from "react-router-dom";

function ButtonLogout({token}){

    const navigate=useNavigate();

    const handleLogout = () => {
        localStorage.removeItem(token);
        navigate("/");
    }

    return(
        <>
            <button
                onClick={handleLogout}
            >
                <i className='bx bx-log-out'></i>
            </button>
        </>
    )
}

export default ButtonLogout