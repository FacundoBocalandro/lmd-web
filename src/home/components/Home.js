import {useHistory} from "react-router";
import InProcessScreen from "../../common/components/in-process/InProcessScreen";


const Home = ({logout}) => {
    const history = useHistory();

    const logoutAction = () => {
        logout();
        window.localStorage.removeItem('token');
        history.replace('/');
    }

    return (
        <InProcessScreen logout={logoutAction}/>
    )
}

export default Home;
