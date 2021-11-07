import React, {useCallback, useEffect, useState} from "react";
import "./Preborn.css";
import {USER_ROLES} from "../../constants/roles";
import {getSelectedPatient} from "../../utils/tokens";
import NoPatientScreen from "../../common/components/no-patient/NoPatientScreen";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Button, ButtonGroup, Checkbox,
    FormControlLabel, Input, InputAdornment, InputLabel, Radio,
    RadioGroup,
    Tab,
    Tabs, TextField
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import debounce from "lodash.debounce";
import GetAppIcon from '@material-ui/icons/GetApp';
import { jsPDF } from "jspdf";

const Preborn = ({userRole, prebornData, getPrebornData, setPrebornData, exportPrebornData}) => {

    useEffect(() => {
        getPrebornData();

        // eslint-disable-next-line
    }, [])

    /**
     * If page should be rendered or not:
     * In case it's a doctor, a patient should be selected
     * In case it's a patient, info should've been fetched
     * @returns {boolean}
     */
    const shouldRender = () => {
        return ((userRole === USER_ROLES.DOCTOR && getSelectedPatient()) || (userRole === USER_ROLES.PATIENT)) && prebornData
    }

    const isDisabled = () => {
        return userRole !== USER_ROLES.DOCTOR
    }

    return shouldRender() ?
        <PrebornBody reducerPrebornData={prebornData} disabled={isDisabled()}
                     setReducerPrebornData={setPrebornData} exportPrebornData={exportPrebornData}/> : (userRole === USER_ROLES.DOCTOR ?
            <NoPatientScreen/> : null);
}

const PERINATAL_HISTORY = "PERINATAL_HISTORY";
const NEWBORN = "NEWBORN";

const PrebornBody = ({reducerPrebornData, setReducerPrebornData, disabled, exportPrebornData}) => {
    const [selectedTab, setSelectedTab] = useState(PERINATAL_HISTORY);
    const [prebornData, setPrebornData] = useState(reducerPrebornData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedOnChange = useCallback(debounce((newPrebornData) => {
        setReducerPrebornData(newPrebornData)
    }, 500), [reducerPrebornData])

    const onChange = (value, field) => {
        const newPrebornData = {
            ...prebornData,
            [field]: value
        };
        setPrebornData(newPrebornData);
        debouncedOnChange(newPrebornData);
    }

    const exportCallback = (body) => {
        navigator.clipboard.writeText(body)
        //
        // const doc = new jsPDF()
        //
        // doc.text(body, 10, 10)
        // doc.save('perinatal.pdf');
    }

    return (
        <div className={"preborn-screen"}>
            <Tabs
                value={selectedTab}
                onChange={(e, value) => setSelectedTab(value)}
                indicatorColor="primary"
                textColor="primary"
                orientation="vertical"
            >
                <Tab label="Antecedentes Perinatales" value={PERINATAL_HISTORY}/>
                <Tab label="Recién Nacido" value={NEWBORN}/>
            </Tabs>
            <div className={"preborn-screen-body"}>
                {!disabled && <Button
                    variant="contained"
                    color="default"
                    startIcon={<GetAppIcon />}
                    className={"preborn-export-button"}
                    onClick={() => exportPrebornData(exportCallback)}
                >
                    Exportar datos
                </Button>}
                {selectedTab === PERINATAL_HISTORY && <div className={"preborn-screen-accordions"}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className={"preborn-accordion-icon"}/>}
                            className={"preborn-accordion-summary"}
                        >
                            <span className={"preborn-accordion-summary-text"}>Embarazo</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={"preborn-accordion-body preborn-pregnancy"}>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Controlado</span>
                                    <RadioGroup aria-label="controlado" name="controlled"
                                                value={prebornData.birthControl}
                                                onChange={(event, value) => onChange(value, "birthControl")}>
                                        <FormControlLabel value="CONTROLADO" control={<Radio/>} label="Sí"
                                                          disabled={disabled}/>
                                        <FormControlLabel value="NO_CONTROLADO" control={<Radio/>} label="No"
                                                          disabled={disabled}/>
                                        <FormControlLabel value="CINCO_O_MAS_CONTROLES" control={<Radio/>}
                                                          label="+5 Controles" disabled={disabled}/>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Patologías</span>
                                    <RadioGroup aria-label="patologias" name="pathology"
                                                value={prebornData.pathology}
                                                onChange={(event, value) => onChange(value === "true", "pathology")}>
                                        <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                          disabled={disabled}/>
                                        <FormControlLabel value={false} control={<Radio/>} label="No"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                    {prebornData.pathology && <TextField
                                        label="Especificar"
                                        multiline
                                        rows={4}
                                        value={prebornData.pathologyObservations}
                                        variant="outlined"
                                        disabled={disabled}
                                        onChange={(event) => onChange(event.target.value, "pathologyObservations")}
                                    />}
                                </div>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Serología/Bacteriología</span>
                                    <div className={"serology-body"}>
                                        <div className={"serology-option"}>
                                            <span>VDRL</span>
                                            <RadioGroup aria-label="vdrl" name="vdrl"
                                                        value={prebornData.vdrl} row
                                                        onChange={(event, value) => onChange(value === "true", "vdrl")}>
                                                <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                                  disabled={disabled}/>
                                                <FormControlLabel value={false} control={<Radio/>} label="No"
                                                                  disabled={disabled}/>
                                            </RadioGroup>
                                        </div>
                                        <div className={"serology-option"}>
                                            <span>Toxoplasmosis</span>
                                            <RadioGroup aria-label="toxoplasmosis" name="toxoplasmosis"
                                                        value={prebornData.toxoplasmosis} row
                                                        onChange={(event, value) => onChange(value === "true", "toxoplasmosis")}>
                                                <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                                  disabled={disabled}/>
                                                <FormControlLabel value={false} control={<Radio/>} label="No"
                                                                  disabled={disabled}/>
                                            </RadioGroup>
                                        </div>
                                        <div className={"serology-option"}>
                                            <span>Chagas</span>
                                            <RadioGroup aria-label="chagas" name="chagas"
                                                        value={prebornData.chagas} row
                                                        onChange={(event, value) => onChange(value === "true", "chagas")}>
                                                <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                                  disabled={disabled}/>
                                                <FormControlLabel value={false} control={<Radio/>} label="No"
                                                                  disabled={disabled}/>
                                            </RadioGroup>
                                        </div>
                                        <div className={"serology-option"}>
                                            <span>Hepatitis</span>
                                            <RadioGroup aria-label="hepatitis" name="hepatitis"
                                                        value={prebornData.hepatitis} row
                                                        onChange={(event, value) => onChange(value === "true", "hepatitis")}>
                                                <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                                  disabled={disabled}/>
                                                <FormControlLabel value={false} control={<Radio/>} label="No"
                                                                  disabled={disabled}/>
                                            </RadioGroup>
                                        </div>
                                        <div className={"serology-option"}>
                                            <span>HIV</span>
                                            <RadioGroup aria-label="hiv" name="hiv"
                                                        value={prebornData.hiv} row
                                                        onChange={(event, value) => onChange(value === "true", "hiv")}>
                                                <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                                  disabled={disabled}/>
                                                <FormControlLabel value={false} control={<Radio/>} label="No"
                                                                  disabled={disabled}/>
                                            </RadioGroup>
                                        </div>
                                        <div className={"serology-option"}>
                                            <span>Estreptococo B</span>
                                            <RadioGroup aria-label="estreptococoB" name="estreptococoB"
                                                        value={prebornData.estreptococoB} row
                                                        onChange={(event, value) => onChange(value === "true", "estreptococoB")}>
                                                <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                                  disabled={disabled}/>
                                                <FormControlLabel value={false} control={<Radio/>} label="No"
                                                                  disabled={disabled}/>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className={"preborn-accordion-icon"}/>}
                            className={"preborn-accordion-summary"}
                        >
                            <span className={"preborn-accordion-summary-text"}>Parto</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={"preborn-accordion-body preborn-birth"}>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Lugar</span>
                                    <RadioGroup aria-label="lugar" name="place"
                                                value={prebornData.birthPlace}
                                                onChange={(event, value) => onChange(value, "birthPlace")}>
                                        <FormControlLabel value="INSTITUCIONAL" control={<Radio/>} label="Institucional"
                                                          disabled={disabled}/>
                                        <FormControlLabel value="DOMICILIO" control={<Radio/>} label="Domicilio"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Tipo</span>
                                    <RadioGroup aria-label="tipo" name="type"
                                                value={prebornData.birthType}
                                                onChange={(event, value) => onChange(value, "birthType")}>
                                        <FormControlLabel value="VAGINAL" control={<Radio/>} label="Vaginal"
                                                          disabled={disabled}/>
                                        <FormControlLabel value="CESAREA" control={<Radio/>} label="Cesárea"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Presentación</span>
                                    <RadioGroup aria-label="presentacion" name="presentation"
                                                value={prebornData.birthPresentation}
                                                onChange={(event, value) => onChange(value, "birthPresentation")}>
                                        <FormControlLabel value="CEFALICA" control={<Radio/>} label="Cefálica"
                                                          disabled={disabled}/>
                                        <FormControlLabel value="PODALICA" control={<Radio/>} label="Podálica"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Intervención</span>
                                    <RadioGroup aria-label="intervencion" name="intervention"
                                                value={prebornData.birthIntervention}
                                                onChange={(event, value) => onChange(value, "birthIntervention")}>
                                        <FormControlLabel value="EUTOCITO" control={<Radio/>} label="Eutócito"
                                                          disabled={disabled}/>
                                        <FormControlLabel value="DISTOCITO" control={<Radio/>} label="Distócico"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Fórceps</span>
                                    <RadioGroup aria-label="forceps" name="forceps"
                                                value={prebornData.forceps}
                                                onChange={(event, value) => onChange(value === "true", "forceps")}>
                                        <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                          disabled={disabled}/>
                                        <FormControlLabel value={false} control={<Radio/>} label="No"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                </div>
                                <TextField
                                    label="Observaciones"
                                    multiline
                                    rows={4}
                                    value={prebornData.birthObservations}
                                    variant="outlined"
                                    className="birth-observations-field"
                                    disabled={disabled}
                                    onChange={(event) => onChange(event.target.value, "birthObservations")}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className={"preborn-accordion-icon"}/>}
                            className={"preborn-accordion-summary"}
                        >
                            <span className={"preborn-accordion-summary-text"}>Puerperio</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={"preborn-accordion-body preborn-puerperium"}>
                                <div>
                                    <RadioGroup aria-label="puerperio" name="postpartumPeriod"
                                                value={prebornData.postpartumPeriod}
                                                onChange={(event, value) => onChange(value, "postpartumPeriod")}>
                                        <FormControlLabel value="NORMAL" control={<Radio/>} label="Normal"
                                                          disabled={disabled}/>
                                        <FormControlLabel value="PATOLOGICO" control={<Radio/>} label="Patólogico"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                </div>
                                <TextField
                                    label="Observaciones"
                                    multiline
                                    rows={4}
                                    value={prebornData.postpartumObservations}
                                    variant="outlined"
                                    disabled={disabled}
                                    onChange={(event) => onChange(event.target.value, "postpartumObservations")}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>}
                {selectedTab === NEWBORN && <div className={"preborn-screen-accordions"}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className={"preborn-accordion-icon"}/>}
                            className={"preborn-accordion-summary"}
                        >
                            <span className={"preborn-accordion-summary-text"}>Mediciones</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={"preborn-accordion-body preborn-measurements"}>
                                <div className={"preborn-basic-measurements"}>
                                    <div>
                                        <InputLabel itemID={"gestational-age"} shrink>Edad gestacional</InputLabel>
                                        <Input
                                            value={prebornData.gestationalAge}
                                            onChange={event => {
                                                if (event.target.value >= 0 && event.target.value <= 99) onChange(Number.parseInt(event.target.value), "gestationalAge")
                                            }}
                                            type={"number"}
                                            inputProps={{min: 0, max: 99}}
                                            id={"gestational-age"}
                                            endAdornment={<InputAdornment position="end">Sem</InputAdornment>}
                                            disabled={disabled}
                                            fullWidth
                                        />
                                    </div>
                                    <div>
                                        <InputLabel itemID={"weight"} shrink>Peso</InputLabel>
                                        <Input
                                            value={prebornData.weight}
                                            onChange={event => {
                                                if (event.target.value >= 0 && event.target.value <= 9999) onChange(Number.parseInt(event.target.value), "weight")
                                            }}
                                            type={"number"}
                                            inputProps={{min: 0, max: 9999}}
                                            id={"weight"}
                                            endAdornment={<InputAdornment position="end">g</InputAdornment>}
                                            disabled={disabled}
                                            fullWidth
                                        />
                                    </div>
                                    <div>
                                        <InputLabel itemID={"height"} shrink>Talla</InputLabel>
                                        <Input
                                            value={prebornData.height}
                                            onChange={event => {
                                                if (event.target.value >= 0 && event.target.value <= 999) onChange(Number.parseInt(event.target.value), "height")
                                            }}
                                            type={"number"}
                                            inputProps={{min: 0, max: 999}}
                                            id={"height"}
                                            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                            disabled={disabled}
                                            fullWidth
                                        />
                                    </div>
                                    <div>
                                        <InputLabel itemID={"perimeter"} shrink>Perim. cefálico</InputLabel>
                                        <Input
                                            value={prebornData.perimeter}
                                            onChange={event => {
                                                if (event.target.value >= 0 && event.target.value <= 999) onChange(Number.parseInt(event.target.value), "perimeter")
                                            }}
                                            type={"number"}
                                            inputProps={{min: 0, max: 999}}
                                            id={"perimeter"}
                                            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                            disabled={disabled}
                                            fullWidth
                                        />
                                    </div>
                                    <div>
                                        <InputLabel itemID={"apgar1Score"} shrink>Apgar 1'</InputLabel>
                                        <Input
                                            value={prebornData.apgar1Score}
                                            onChange={event => {
                                                if (event.target.value >= 0 && event.target.value <= 999) onChange(Number.parseInt(event.target.value), "apgar1Score")
                                            }}
                                            type={"number"}
                                            inputProps={{min: 0, max: 10}}
                                            id={"apgar1Score"}
                                            disabled={disabled}
                                            fullWidth
                                        />
                                    </div>
                                    <div>
                                        <InputLabel itemID={"apgar5Score"} shrink>Apgar 5'</InputLabel>
                                        <Input
                                            value={prebornData.apgar5Score}
                                            onChange={event => {
                                                if (event.target.value >= 0 && event.target.value <= 999) onChange(Number.parseInt(event.target.value), "apgar5Score")
                                            }}
                                            type={"number"}
                                            inputProps={{min: 0, max: 10}}
                                            id={"apgar5Score"}
                                            disabled={disabled}
                                            fullWidth
                                        />
                                    </div>
                                </div>
                                {/*<div className={"preborn-apgar-body"}>*/}
                                {/*</div>*/}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className={"preborn-accordion-icon"}/>}
                            className={"preborn-accordion-summary"}
                        >
                            <span className={"preborn-accordion-summary-text"}>Diagnóstico</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={"preborn-accordion-body preborn-diagnosis"}>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Prematurez</span>
                                    <RadioGroup aria-label="prematurez" name="premature"
                                                value={prebornData.premature}
                                                onChange={(event, value) => onChange(value === "true", "premature")}>
                                        <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                          disabled={disabled}/>
                                        <FormControlLabel value={false} control={<Radio/>} label="No"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Ecografía de caderas</span>
                                    <RadioGroup aria-label="ecografia de caderas" name="waistEcography"
                                                value={prebornData.waistEcography}
                                                onChange={(event, value) => onChange(value === "true", "waistEcography")}>
                                        <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                          disabled={disabled}/>
                                        <FormControlLabel value={false} control={<Radio/>} label="No"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Caída del cordón</span>
                                    <RadioGroup aria-label="caida del cordon" name="umbilicalCordFell"
                                                value={prebornData.umbilicalCordFell}
                                                onChange={(event, value) => onChange(value === "true", "umbilicalCordFell")}>
                                        <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                          disabled={disabled}/>
                                        <FormControlLabel value={false} control={<Radio/>} label="No"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Patologías</span>
                                    <RadioGroup aria-label="patologias" name="pathologies"
                                                value={prebornData.pathologies}
                                                onChange={(event, value) => onChange(value === "true", "pathologies")}>
                                        <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                          disabled={disabled}/>
                                        <FormControlLabel value={false} control={<Radio/>} label="No"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                    {prebornData.pathologies && <TextField
                                        label="Especificar"
                                        multiline
                                        rows={4}
                                        value={prebornData.pathologiesObservations}
                                        variant="outlined"
                                        disabled={disabled}
                                        onChange={(event) => onChange(event.target.value, "pathologiesObservations")}
                                    />}
                                </div>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Neonatología</span>
                                    <RadioGroup aria-label="neonatologia" name="neonatology"
                                                value={prebornData.neonatology}
                                                onChange={(event, value) => onChange(value === "true", "neonatology")}>
                                        <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                          disabled={disabled}/>
                                        <FormControlLabel value={false} control={<Radio/>} label="No"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                    {prebornData.neonatology && <TextField
                                        label="Especificar"
                                        multiline
                                        rows={4}
                                        value={prebornData.neonatologyObservations}
                                        variant="outlined"
                                        disabled={disabled}
                                        onChange={(event) => onChange(event.target.value, "neonatologyObservations")}
                                    />}
                                </div>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Estudios realizados</span>
                                    <div className={"preborn-studies-body"}>
                                        <FormControlLabel
                                            value="brainEcography"
                                            control={<Checkbox color="secondary" checked={prebornData.brainEcography}/>}
                                            label="Ecografía cerebral"
                                            labelPlacement="end"
                                            disabled={disabled || prebornData.noStudies}
                                            onChange={(event, checked) => onChange(checked, "brainEcography")}
                                        />
                                        <FormControlLabel
                                            value="fundus"
                                            control={<Checkbox color="secondary" checked={prebornData.fundus}/>}
                                            label="Fondo de ojo"
                                            labelPlacement="end"
                                            disabled={disabled || prebornData.noStudies}
                                            onChange={(event, checked) => onChange(checked, "fundus")}
                                        />
                                        <FormControlLabel
                                            value="cardiology"
                                            control={<Checkbox color="secondary" checked={prebornData.cardiology}/>}
                                            label="Cardiología"
                                            labelPlacement="end"
                                            disabled={disabled || prebornData.noStudies}
                                            onChange={(event, checked) => onChange(checked, "cardiology")}
                                        />
                                        <TextField
                                            label="Otros estudios"
                                            value={prebornData.otherStudies}
                                            variant="outlined"
                                            disabled={disabled || prebornData.noStudies}
                                            onChange={(event) => onChange(event.target.value, "otherStudies")}
                                        />
                                        <FormControlLabel
                                            value="noStudies"
                                            control={<Checkbox color="secondary" checked={prebornData.noStudies}/>}
                                            label="Ninguno"
                                            labelPlacement="end"
                                            disabled={disabled}
                                            onChange={(event, checked) => {
                                                if (checked) {
                                                    const newPrebornData = {
                                                        ...prebornData,
                                                        brainEcography: false,
                                                        fundus: false,
                                                        cardiology: false,
                                                        otherStudies: "",
                                                        noStudies: true
                                                    }
                                                    setPrebornData(newPrebornData);
                                                    debouncedOnChange(newPrebornData);
                                                } else {
                                                    onChange(false, "noStudies")
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className={"preborn-accordion-icon"}/>}
                            className={"preborn-accordion-summary"}
                        >
                            <span className={"preborn-accordion-summary-text"}>Pesquisas</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={"preborn-accordion-body preborn-searches"}>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Endocrino-metabólicas (FEI)</span>
                                    <RadioGroup aria-label="endocrino-metabólicas" name="endocrineMetabolicFEI"
                                                value={prebornData.endocrineMetabolicFEI}
                                                onChange={(event, value) => onChange(value === "true", "endocrineMetabolicFEI")}>
                                        <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                          disabled={disabled}/>
                                        <FormControlLabel value={false} control={<Radio/>} label="No"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                    {prebornData.endocrineMetabolicFEI && <>
                                        <InputLabel itemID={"gestational-age"} shrink>N° de determinaciones</InputLabel>
                                        <Input
                                            value={prebornData.ammountOfDeterminations}
                                            onChange={event => {
                                                if (event.target.value >= 0 && event.target.value <= 99) onChange(Number.parseInt(event.target.value), "ammountOfDeterminations")
                                            }}
                                            type={"number"}
                                            inputProps={{min: 0, max: 99}}
                                            id={"gestational-age"}
                                            disabled={disabled}
                                            fullWidth
                                        />
                                    </>}
                                </div>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Auditiva (OEA)</span>
                                    <RadioGroup aria-label="auditiva" name="auditory"
                                                value={prebornData.auditory}
                                                onChange={(event, value) => onChange(value === "true", "auditory")}>
                                        <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                          disabled={disabled}/>
                                        <FormControlLabel value={false} control={<Radio/>} label="No"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <span className={"preborn-accordion-body-title"}>Visual (reflejo rojo)</span>
                                    <RadioGroup aria-label="visual" name="visualRedReflex"
                                                value={prebornData.visualRedReflex}
                                                onChange={(event, value) => onChange(value === "true", "visualRedReflex")}>
                                        <FormControlLabel value={true} control={<Radio/>} label="Sí"
                                                          disabled={disabled}/>
                                        <FormControlLabel value={false} control={<Radio/>} label="No"
                                                          disabled={disabled}/>
                                    </RadioGroup>
                                </div>
                                <TextField
                                    label="Otras pesquisas"
                                    multiline
                                    rows={4}
                                    value={prebornData.otherSearches}
                                    variant="outlined"
                                    disabled={disabled}
                                    onChange={(event) => onChange(event.target.value, "otherSearches")}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>}
            </div>
        </div>
    )
}

export default Preborn;