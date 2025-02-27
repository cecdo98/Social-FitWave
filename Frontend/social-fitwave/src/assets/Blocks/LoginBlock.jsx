import { useState } from "react"
import ButtonLogin from "../Buttons/ButtonLogin";
import { useNavigate} from "react-router-dom";


function LoginPage(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate= useNavigate();

    return(
        <>
            <div>
                <div>
                    <form onSubmit={(e)=> e.preventDefault()}>
                        <h1>Login</h1>
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
                            {/*Usar o onChange no selecionar diferentes desportos  */}

                        <div>
                            <div>
                                <ButtonLogin email={email} password={password}/>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={()=>navigate("registerBlock")}
                                >Registar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default LoginPage