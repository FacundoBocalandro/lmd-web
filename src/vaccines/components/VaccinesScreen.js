import React, {useEffect} from "react";

const VaccinesScreen = ({getAllVaccines, getUserVaccines, allVaccines, userVaccines}) => {
    useEffect(() => {
        if (!allVaccines) getAllVaccines();

        getUserVaccines();

        // eslint-disable-next-line
    }, [])

    return allVaccines && userVaccines ? (
        <div>

        </div>
    ) : null
}

export default VaccinesScreen
