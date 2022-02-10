import React, {useEffect, useState} from 'react';
import "./Readings.css";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import richUtils from "../../utils/richUtils";
import ReadOnlyRichText from "../../common/components/rich-text/ReadOnlyRichText";
import {
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import Modal from 'react-modal';
import {AddCircle, CheckCircle, CheckCircleOutline, Search} from "@material-ui/icons";
import {USER_ROLES} from "../../constants/roles";
import {MODAL_STYLE} from "../../constants/modal";
import ReadingModalBody from "./reading-modal/ReadingModalBody";

const Readings = ({
                      disableReading,
                      enableReading,
                      userRole,
                      categories,
                      getReadingCategories,
                      getReadingsByCategory,
                      addReading,
                      editReading,
                      uploadImage
                  }) => {
    const [searchFilter, setSearchFilter] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalInfo, setModalInfo] = useState({open: false});

    useEffect(() => {
        getReadingCategories();

        // eslint-disable-next-line
    }, [])

    const closeModal = () => {
        setModalInfo({open: false});
    }

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
                {modalInfo.open && <Modal isOpen={true} onRequestClose={closeModal} style={MODAL_STYLE}>
                    <ReadingModalBody addReading={addReading} callback={modalInfo.callback}
                                      readingToEdit={modalInfo.readingToEdit}
                                      editReading={editReading} readingCategories={categories}
                                      uploadImage={uploadImage}/>
                </Modal>}
                {selectedCategory ? <SelectedCategoryBody selectedCategory={selectedCategory}
                                                          getReadingsByCategory={getReadingsByCategory}
                                                          searchFilter={searchFilter} userRole={userRole}
                                                          disableReading={disableReading} enableReading={enableReading}
                                                          setModalInfo={setModalInfo}
                                                          getCategories={getReadingCategories}/> :
                    <div className={"no-selected-category-container"}><span>Seleccione una categoría<br/> para ver lecturas</span>
                    </div>}
            </div>
        </div>
    )
}


const SelectedCategoryBody = ({
                                  disableReading,
                                  enableReading,
                                  userRole,
                                  selectedCategory,
                                  getReadingsByCategory,
                                  searchFilter,
                                  setModalInfo,
                                  getCategories
                              }) => {
    const [readings, setReadings] = useState([]);
    const [selectedReading, setSelectedReading] = useState(null);

    useEffect(() => {
        getReadingsByCategory(selectedCategory.id, (res) => setReadings(res));
        setSelectedReading(null);

        // eslint-disable-next-line
    }, [selectedCategory.id])

    const changeActiveCallback = (readingId, active) => {
        setReadings(readings.map(reading => {
            if (reading.id === readingId) return {...reading, active};
            return reading;
        }))
    }

    return selectedReading && userRole !== USER_ROLES.ADMIN ?
        <div className={"reading-details-container"}>
            <div className={"reading-header"}><span>{selectedReading.title}</span></div>
            <div className={"reading-body"}>
                <ReadOnlyRichText editorState={richUtils.textToEditorState(selectedReading.body)}/>
            </div>
        </div> :
        userRole === USER_ROLES.ADMIN ? <div className={"readings-table-container"}>
                <Table className={'readings-table'}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"left"} className={"readings-table-name-cell"}><span
                                className={"readings-table-header-text"}>Título</span></TableCell>
                            <TableCell align={"left"} className={"readings-table-name-cell"}><span
                                className={"readings-table-header-text"}>Visible</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {readings.filter(reading => reading.title.toLowerCase().includes(searchFilter.toLowerCase())).map(reading => (
                            <TableRow className={`readings-table-row`}
                                      onClick={() => setModalInfo({
                                          open: true, readingToEdit: reading, callback: (readingEdited) => {
                                              setModalInfo({open: false});
                                              setReadings(readingEdited.category !== selectedCategory.name ?
                                                  readings.filter(tempReading => tempReading.id !== readingEdited.id) :
                                                  readings.map(tempReading => {
                                                      if (tempReading.id === readingEdited.id) return readingEdited;
                                                      return tempReading;
                                                  })
                                              );
                                              getCategories();
                                          }
                                      })}>
                                <TableCell
                                    className={"readings-table-cell readings-table-name-cell"}>{reading.title}</TableCell>
                                <TableCell className={"readings-table-cell"}>
                                    <IconButton component="span" size={"small"} onClick={e => {
                                        if (reading.active) disableReading(reading.id, () => changeActiveCallback(reading.id, false));
                                        else enableReading(reading.id, () => changeActiveCallback(reading.id, true));
                                        e.stopPropagation();
                                    }} className={reading.active ? 'checked-icon' : 'unchecked-icon'}>
                                        {reading.active ? <CheckCircle/> : <CheckCircleOutline/>}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <IconButton className={"add-reading-icon-container"} onClick={() => {
                    setModalInfo({
                        open: true, readingToEdit: {category: selectedCategory.name}, callback: (newReading) => {
                            setModalInfo({open: false});
                            newReading.category === selectedCategory.name && setReadings([...readings, newReading]);
                            getCategories();
                        }
                    })
                }
                }><AddCircle fontSize={"large"}
                             className={'add-reading-icon'}/></IconButton>
            </div> :
            <div className={"selected-category-body"}>
                {readings.filter(reading => reading.title.toLowerCase().includes(searchFilter.toLowerCase())).map((reading, index) => (
                    <div className={"reading-card-container"}>
                        <div className={"reading-card"} onClick={() => setSelectedReading(reading)}>
                            <img src={reading.imgUrl}
                                 className={"reading-card-image"} alt={"reading"}/>
                            <div className={"reading-card-header"}>
                                <span>{reading.title}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
}

export default Readings;
