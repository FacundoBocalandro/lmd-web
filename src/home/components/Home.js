import React, {useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getAvatar} from "../../utils/avatars";
import "./Home.css";

const Home = ({personalData, getPersonalData}) => {
    useEffect(() => {
        getPersonalData();
        // eslint-disable-next-line
    }, [])

    return (
        <div className={"home-screen"}>
            <div className={"home-personal-data"}>
                <div className={"home-avatar-container"}>
                    <FontAwesomeIcon icon={getAvatar(personalData.avatar)} className={"home-avatar"}/>
                </div>
                <span className={"home-name"}>{personalData.fullName}</span>
                <span className={"home-age-and-id"}>{personalData.age} años - {personalData.dni}</span>
            </div>
        </div>
    )
}

export default Home;
