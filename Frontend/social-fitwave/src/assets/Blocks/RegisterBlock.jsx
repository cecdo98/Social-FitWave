import { useState } from "react"
import { useNavigate} from "react-router-dom";
import ButtonRegister from "../Buttons/ButtonRegister";

function RegisterBlock(){
    const [email, setEmail] = useState("");
    const [password,setPassword]= useState("");
    const [name,setName] = useState("");

    const navigate = useNavigate();

    return(
        <>
            <div>
                <div>
                    <form onSubmit={(e)=>e.preventDefault()}>
                        <h1>Registo</h1>
                        <div>
                            <input type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <input type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <input type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required
                            />
                        </div>

                        <div>
                            <div>
                                <ButtonRegister/>
                            </div>
                            <div>
                                <button 
                                type="button" 
                                onClick={()=>navigate("/")}>
                                Voltar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterBlock