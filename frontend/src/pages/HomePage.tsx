import { Link } from "react-router-dom"

export const HomePage = () => {
    return <div>
        <div className="header-section">
            <div className="main-title">
                Welcome to AI Resume Analyzer. Happy Analyzing !!
            </div>
        </div>
        <div className="upload-actions">
            <Link to="/register">Signup</Link>
            <Link to="/login">Login</Link>
        </div>
    </div>
}