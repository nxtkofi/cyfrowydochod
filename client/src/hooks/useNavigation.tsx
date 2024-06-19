import { NavigateOptions, useNavigate } from "react-router-dom";

interface NavigationOptions extends NavigateOptions {
    path:string;
}

function useNavigation() {
    const navigate = useNavigate()

    const handleNavigation = (options:NavigationOptions)=>{
        const {path,...navigateOptions} = options
        navigate(path,navigateOptions);
    }
    return handleNavigation;
}

export default useNavigation;