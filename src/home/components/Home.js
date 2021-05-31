import {useHistory} from "react-router";
import InProgressScreen from "../../common/components/in-progress/InProgressScreen";


const Home = ({logout}) => {
    const history = useHistory();

    const logoutAction = () => {
        logout();
        window.localStorage.removeItem('token');
        history.replace('/');
    }

    return (
        <InProgressScreen logout={logoutAction}/>
    )
}

export default Home;
