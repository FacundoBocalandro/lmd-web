import {useHistory} from "react-router";
import Navbar from "../../navbar/components/Navbar";

const Home = ({logout}) => {
    const history = useHistory();

    return (
        <Navbar logout={logout}> </Navbar>
    )
}

export default Home;
