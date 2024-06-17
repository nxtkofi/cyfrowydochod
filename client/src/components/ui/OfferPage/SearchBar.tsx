import { Input } from "../input";

function SearchBar({...props}) {
    return ( <div>
        <Input {...props} placeholder="I wanna search for..."/>
    </div> );
}

export default SearchBar;