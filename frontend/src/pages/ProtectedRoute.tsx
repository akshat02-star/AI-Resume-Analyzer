import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    child: React.ReactNode;
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
    const access_token = localStorage.getItem("access_token");
    if(!access_token){
        return <Navigate to="/login" replace/>;
    }
    return <>{props.child}</>;
}
export default ProtectedRoute;