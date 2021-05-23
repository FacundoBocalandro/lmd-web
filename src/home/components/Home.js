import {useHistory} from "react-router";

const Home = ({logout}) => {
    const history = useHistory();

    return (
        <button onClick={() => {
            logout();
            window.localStorage.removeItem('token');
            history.replace('/');
        }}>logout</button>
    )
}

export default Home;
