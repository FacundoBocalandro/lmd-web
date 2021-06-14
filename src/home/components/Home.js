import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getAvatar} from "../../utils/avatars";
import "./Home.css";
import WeightChart from "../../charts/containers/WeightChart";
import HeightChart from "../../charts/containers/HeightChart";
import PerimeterChart from "../../charts/containers/PerimeterChart";
import EnterDataScreen from "../../enter-data/containers/EnterDataScreen";

const Home = ({userInfo}) => {
    const [selectedTab, setSelectedTab] = useState(1);

    return userInfo ? (
        <div className={"home-screen"}>
            <div className={"home-personal-data"}>
                <div className={"home-avatar-container"}>
                    <FontAwesomeIcon icon={getAvatar(userInfo.avatar)} className={"home-avatar"}/>
                </div>
                <span className={"home-name"}>{userInfo.firstName} {userInfo.lastName}</span>
                <span className={"home-age-and-id"}>{userInfo.age} - {userInfo.dni}</span>
            </div>
            <div className={"home-screen-charts"}>
                <div className={"home-screen-charts-container"}>
                    {selectedTab === 1 && <WeightChart/>}
                    {selectedTab === 2 && <HeightChart/>}
                    {selectedTab === 3 && <PerimeterChart/>}
                    {selectedTab === 4 && <EnterDataScreen/>}
                </div>
                <div className={"home-screen-tabs-container"}>
                    <div className={`home-screen-tab${selectedTab === 1 ? ' selected' : ''}`}
                         onClick={() => setSelectedTab(1)}>Peso
                    </div>
                    <div className={`home-screen-tab${selectedTab === 2 ? ' selected' : ''}`}
                         onClick={() => setSelectedTab(2)}>Estatura
                    </div>
                    <div className={`home-screen-tab${selectedTab === 3 ? ' selected' : ''}`}
                         onClick={() => setSelectedTab(3)}>Perímetro Cefálico
                    </div>
                    <div className={`home-screen-tab${selectedTab === 4 ? ' selected' : ''}`}
                         onClick={() => setSelectedTab(4)}>Cargar Datos
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default Home;
