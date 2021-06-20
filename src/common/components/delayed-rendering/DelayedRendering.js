import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import "./DelayedRendering.css";

const DelayedRendering = ({timeout = 500, children}) => {
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
       window.setTimeout(() => setHidden(false), timeout)

        // eslint-disable-next-line
    },[])

    return hidden ? <div className={"delayed-rendering"}><FontAwesomeIcon icon={faSpinner} spin size={'3x'} color={'#133D8D'}/></div> : children;
}

export default DelayedRendering
