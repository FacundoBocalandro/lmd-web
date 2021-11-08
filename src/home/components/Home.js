import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getAvatar} from "../../utils/avatars";
import "./Home.css";
import WeightChart from "../../charts/containers/WeightChart";
import HeightChart from "../../charts/containers/HeightChart";
import PerimeterChart from "../../charts/containers/PerimeterChart";
import EnterDataScreen from "../../enter-data/containers/EnterDataScreen";
import BmiChart from "../../charts/containers/BmiChart";
import {USER_ROLES} from "../../constants/roles";
import NoPatientScreen from "../../common/components/no-patient/NoPatientScreen";
import {getSelectedPatient} from "../../utils/tokens";
import {Button, Tab, Tabs} from "@material-ui/core";
import {TableChart, Timeline} from "@material-ui/icons";

const WEIGHT_TAB = "WEIGHT_TAB";
const HEIGHT_TAB = "HEIGHT_TAB";
const PERIMETER_TAB = "PERIMETER_TAB";
const BMI_TAB = "BMI_TAB";
const ENTER_DATA_TAB = "ENTER_DATA_TAB";

const Home = ({userInfo, userRole, relationships}) => {
    const [selectedTab, setSelectedTab] = useState(WEIGHT_TAB);
    const [tableTabSelected, setTableTabSelected] = useState(false);

    /**
     * If user is patient, display his/her information
     * If user is doctor, display selected patients information
     */
    const userInfoToDisplay = userRole === USER_ROLES.PATIENT ? userInfo : relationships.find(user => user.id === getSelectedPatient());

    return userInfoToDisplay ? (
        <div className={"home-screen"}>
            <div className={"home-personal-data"}>
                <div className={"home-avatar-container"}>
                    <FontAwesomeIcon icon={getAvatar(userInfoToDisplay.avatar)} className={"home-avatar"}/>
                </div>
                <span className={"home-name"}>{userInfoToDisplay.firstName} {userInfoToDisplay.lastName}</span>
                <span className={"home-age-and-id"}>{userInfoToDisplay.age}</span>
                <span className={"home-age-and-id"}>{userInfoToDisplay.dni}</span>
            </div>
            <div className={"home-screen-charts"}>
                <div className={"home-screen-charts-container"}>
                    <div className={"table-tab-button-container"}>
                        {selectedTab !== ENTER_DATA_TAB && <Button
                            variant="contained"
                            color="primary"
                            startIcon={tableTabSelected ? <Timeline/> : <TableChart/>}
                            onClick={() => setTableTabSelected(!tableTabSelected)}
                            className={"table-tab-button"}
                        >
                            {tableTabSelected ? "Gráfico" : "Tabla"}
                        </Button>}
                    </div>
                    {selectedTab === WEIGHT_TAB && <WeightChart tableTabSelected={tableTabSelected}/>}
                    {selectedTab === HEIGHT_TAB && <HeightChart tableTabSelected={tableTabSelected}/>}
                    {selectedTab === PERIMETER_TAB && <PerimeterChart tableTabSelected={tableTabSelected}/>}
                    {selectedTab === BMI_TAB && <BmiChart tableTabSelected={tableTabSelected}/>}
                    {selectedTab === ENTER_DATA_TAB && <EnterDataScreen/>}
                </div>
                <Tabs
                    value={selectedTab}
                    onChange={(e, value) => setSelectedTab(value)}
                    indicatorColor="primary"
                    textColor="primary"
                    orientation="vertical"
                >
                    <Tab label="Peso" value={WEIGHT_TAB}/>
                    <Tab label="Estatura" value={HEIGHT_TAB}/>
                    <Tab label="Perímetro Cefálico" value={PERIMETER_TAB}/>
                    <Tab label="IMC" value={BMI_TAB}/>
                    {userRole === USER_ROLES.DOCTOR && <Tab label="Cargar Datos" value={ENTER_DATA_TAB}/>}
                </Tabs>
            </div>
        </div>
    ) : (userRole === USER_ROLES.DOCTOR ? <NoPatientScreen/> : null)
}

export default Home;
