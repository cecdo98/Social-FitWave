import { useState } from "react";
import { useNavigate} from "react-router-dom";
import '../../Css/ButtonsCss/Buttons.css';


function ButtonLogin({email ,password}){
    const navigate = useNavigate();  
    const [loading,setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true)
    
        const response = await fetch('http://localhost/social-fitwave/Backend/routers/api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: "login", email, password })
        });
    
        const data = await response.json();
        setLoading(false);
    
        if (data.success) {
            navigate("personalPage", {
                state: {
                    email: email, 
                    token: data.token
                }
            });
        } else {
            alert("email ou password incorreto!");
        }
    };
    



    return(
        <>
            <button className="ButtonsInLoginRegister"
                onClick={handleLogin} disabled={loading}>
                {loading ? "loading..." : "Login"}
            </button>
        </>
    )
}

export default ButtonLogin