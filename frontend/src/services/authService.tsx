const API_URL = import.meta.env.VITE_API_URL;


// registers user in the postgres db
export const registerUser = async (inputData: {name: string, email: string, password: string}) => {
    const response = await fetch(`${API_URL}/api/v1/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData)
    });
    const data = await response.json();
    if (!response.ok) {
        const errorMessage =
        typeof data.detail === "string"
        ? data.detail
        : data.detail[0].msg;
        
        throw new Error(errorMessage || "Failed to register user");
    }
    return data
}

export const loginUser = async (inputData: {email: string, password: string}) => {
    const response = await fetch(`${API_URL}/api/v1/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData)
    });
    
    const data = await response.json();
    if (!response.ok) {
        const errorMessage =
        typeof data.detail === "string"
        ? data.detail
        : data.detail[0].msg;
        
        throw new Error(errorMessage || "Login Attempt Failed");
    }
    // get object containing: {access token and token type}
    return data
}