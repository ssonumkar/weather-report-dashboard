export function handleError(error, navigate, message, auth) {
    console.error("Request failed: ", message, ": ", error)
    switch (error.response.status) {
        case 401:      
            alert(message,': Unauthorized access.');
            auth.handleLogout()
            navigate("/")
            break;
        
        default: console.error(message, ": ", error, "Please try again.");
            break;
    }
    
}
