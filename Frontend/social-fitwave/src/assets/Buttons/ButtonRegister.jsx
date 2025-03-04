import { useNavigate } from "react-router-dom";
import '../../Css/ButtonsCss/Buttons.css';
import { useEffect, useState } from "react";

function ButtonRegister({email ,password ,name}){
    const navigate= useNavigate();
    const [loading,setLoading] =useState(false);

    const handleRegister = async () => {
        setLoading(true);
    

        const response= await fetch('http://localhost/social-fitwave/Backend/routers/api.php',{
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