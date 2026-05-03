import { useState } from "react"
import { AuthForm } from "../components/Form"
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom"
import Button from "../components/Button";


export const LoginPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try{
            const loginResponse = await loginUser({email, password});
            // store the JWT token returned by backend
            localStorage.setItem("access_token", loginResponse.access_token);
            localStorage.setItem("token_type", loginResponse.token_type);
            setMsg("Login Succeeded");
            // redirect to dashboard
            setTimeout(() => navigate("/dashboard"), 1500)
        }catch(error: any){
            setMsg(`Error in login: ${error.message}`);
        }

    }
    return (
        <div>
            <AuthForm 
                fields={[
                    {label:"email", type: "email", onChange: handleEmailChange, name: "email", value: email},
                    {label:"password", type: "password", onChange: handlePasswordChange, name: "password", value: password}
                ]}
                onSubmit={handleLogin} buttonText="Login" 
            />
            <Button label="Back to HomePage" onClick={()=> navigate("/")} />
            <div>
                <p>{msg}</p>
            </div>
        </div>
    )
}