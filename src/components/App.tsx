import { Provider } from "react-redux";
import { store } from "../reduxWithTypescript";
import RepositoriesList from "./RepositoriesList";


export const App : React.FC = () => {

    return <Provider store={store}>
        <div>
            <h1>Search For a Package</h1>
            <RepositoriesList />
        </div>
    </Provider>
};