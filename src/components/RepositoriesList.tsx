import { useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";


const RepositoriesList: React.FC = () => {
    const [term, setTerm] = useState('');
    const {searchRepositories} = useActions();
    const {data, error, loading} = useTypedSelector((state) => state.repositories);
    const onSubmit = (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        searchRepositories(term);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={term} onChange={(e) => { setTerm(e.target.value); }} type='text' placeholder="Package Name"/>
                <button type="submit">Search</button>
            </form>
            {error && <h3>{error}</h3>}
            {loading && <h3>loading...</h3>}
            {!error && !loading && data && data.map( library => {
                return(<h1>{library}</h1>)
            })}
        </div>
    )
}

export default RepositoriesList;