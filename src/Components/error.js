export function handleError(error, navigate, message) {
    console.error("Request failed: ", message, ": ", error)
    switch (error.response.status) {
        case 401:      
            alert(message,': Unauthorized access.');
            // navigate("/")
            break;
    
        default: console.error(message, ": ", error, "Please try again.");
            break;
    }
    
}
