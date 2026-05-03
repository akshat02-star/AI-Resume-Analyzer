import { useState } from "react"
import { registerUser } from "../services/authService"
import { AuthForm } from "../components/Form"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [username, setUsername] = useState("");
    const [useremail, setUseremail] = useState("");
    const [userpassword, setUserpassword] = useState("");
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setUsername(event?.target.value);
    }
    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setUseremail(event?.target.value);
    }
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setUserpassword(event?.target.value);
    }
    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await registerUser({name: username, email: useremail, password: userpassword});
            // show a success message to user 
            setMsg("You have been succesfully registered");
            setUseremail("");
            setUserpassword("");
            setUsername("");
            // redirect to login page
            setTimeout(() => navigate("/login"), 1500)
        }catch(error: any){
            // console.log("complex Error: ", error)
            setMsg(`Error in registering user: ${error.message}`);
        }
    }

    return <div>
    <AuthForm
        fields={[
            {label: "Name", type: "text", name: "name", value: username, onChange: onNameChange},
            {label: "Email", type: "email", name: "email", value: useremail, onChange: onEmailChange},
            {label: "Password", type: "password", name: "password", value: userpassword, onChange: onPasswordChange}
        ]}
        onSubmit={handleRegister} buttonText="Register"
    />
    <Button label="Back to HomePage" onClick={()=>navigate("/")} />
    {msg && <div>
        <p>{msg}</p>
    </div>}
    </div>
}

export default RegisterPage;