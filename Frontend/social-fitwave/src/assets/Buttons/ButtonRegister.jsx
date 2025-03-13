import { useNavigate } from "react-router-dom";
import '../../Css/ButtonsCss/Buttons.css';
import { useEffect, useState } from "react";
import { API_URL } from "../../config";

function ButtonRegister({email ,password ,name}){
    const navigate= useNavigate();
    const [loading,setLoading] =useState(false);

    const handleRegister = async () => {
        setLoading(true);
    

        const response= await fetch(`${API_URL}`,{
                method: 'POST',
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify({action: "register", email, password, name})
        });


        const data = await response.json();

        setLoading(false);

        if(data.success){
            navigate('/')
        } else{
            alert("erro")
        }
    };



    return(
        <button 
            className="ButtonsInLoginRegister"
            onClick={handleRegister} 
            disabled={loading}
            type="button">
                {loading ? "Loading..." : "Registar"} 
        </button>
    )
}

export default ButtonRegister