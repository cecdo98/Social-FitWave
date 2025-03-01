import { useState } from "react"
import { useNavigate} from "react-router-dom";
import ButtonRegister from "../Buttons/ButtonRegister";
import '../../Css/BlockCss/LoginRegisterBlock.css'

function RegisterBlock(){
    const [email, setEmail] = useState("");
    const [password,setPassword]= useState("");
    const [name,setName] = useState("");

    const navigate = useNavigate();

    return(
        <>
            <div className="RegisterBody"> 
                <div className="RegisterMainForm">
                    <form onSubmit={(e)=>e.preventDefault()}>
                        <h1>Registo</h1>
                        <div className="Register">
                            <input type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                            />
                        </div>
                        <div className="Register">
                            <input type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                            />
                        </div>
                        <div className="Register">
                            <input type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required
                            />
                        </div>

                        <div className="ButtonsOfRegister">
                            <div>
                                <ButtonRegister email={email} password={password} name={name}/>
                            </div>
                            <div>
                                <button className="ButtonsInLoginRegister"
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