import React, {useEffect, useState} from 'react';
import "./Readings.css";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import richUtils from "../../utils/richUtils";
import ReadOnlyRichText from "../../common/components/rich-text/ReadOnlyRichText";
import {InputAdornment, TextField} from "@material-ui/core";
import {Search} from "@material-ui/icons";

const Readings = ({categories, getReadingCategories, getReadingsByCategory}) => {
    const [searchFilter, setSearchFilter] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        getReadingCategories();

        // eslint-disable-next-line
    }, [])

    return (
        <div className={"readings-screen"}>
            <div className={"readings-screen-sidebar"}>
                <TextField
                    placeholder="Buscar..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search/>
                            </InputAdornment>
                        ),
                    }}
                    value={searchFilter}
                    onChange={e => setSearchFilter(e.target.value)}
                />
                <div className={"readings-header"}>
                    <span>Lecturas recomendadas</span>
                </div>
                <div className={"sidebar-categories-list"}>

                    {categories && categories
                        .map(category => (
                            <div
                                className={`sidebar-category${selectedCategory?.id === category.id ? ' selected' : ''}`}
                                key={category.id} onClick={() => setSelectedCategory(category)}>
                                <span className={"sidebar-category-name"}>{category.name}</span>
                                {selectedCategory?.id === category.id &&
                                <FontAwesomeIcon icon={faChevronRight} className={"selected-category-arrow"}/>}
                            </div>)
                        )}
                </div>
            </div>
            <div className={"readings-screen-body"}>
                {selectedCategory ? <SelectedCategoryBody selectedCategory={selectedCategory}
                                                          getReadingsByCategory={getReadingsByCategory}
                                                          searchFilter={searchFilter}/> :
                    <div className={"no-selected-category-container"}><span>Seleccione una categoría<br/> para ver lecturas</span>
                    </div>}
            </div>
        </div>
    )
}


const SelectedCategoryBody = ({selectedCategory, getReadingsByCategory, searchFilter}) => {
    const [readings, setReadings] = useState([]);
    const [selectedReading, setSelectedReading] = useState(null);

    useEffect(() => {
        getReadingsByCategory(selectedCategory.id, (res) => setReadings(res));
        setSelectedReading(null);

        // eslint-disable-next-line
    }, [selectedCategory.id])

    return selectedReading ?
        <div className={"reading-details-container"}>
            <div className={"reading-header"}><span>{selectedReading.title}</span></div>
            <div className={"reading-body"}>
                <ReadOnlyRichText editorState={richUtils.textToEditorState(selectedReading.body)}/>
            </div>
            {/*<p className={"reading-body"}>{selectedReading.body}</p>*/}
        </div> :
        <div className={"selected-category-body"}>
            {readings.filter(reading => reading.title.toLowerCase().includes(searchFilter.toLowerCase())).map((reading, index) => (
                <div className={"reading-card-container"}>
                    <div className={"reading-card"} onClick={() => setSelectedReading(reading)}>
                        <img src={reading.imgUrl}
                             className={"reading-card-image"} alt={"reading"}/>
                        <div className={"reading-card-header"}><span>{reading.title}</span></div>
                    </div>
                </div>
            ))}
        </div>
}

export default Readings;
