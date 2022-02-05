import React, {useState} from "react";
import "./ReadingModalBody.css";
import {EditorState} from "draft-js";
import toast from "react-hot-toast";
import richUtils from "../../../utils/richUtils";
import TextInput from "../../../common/components/inputs/TextInput";
import RichTextEditor from "../../../common/components/rich-text/RichTextEditor";
import {Button} from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import Close from "@material-ui/icons/Close";
import Autocomplete from "../../../common/components/inputs/Autocomplete";

const ReadingModalBody = ({readingCategories, addReading, editReading, uploadImage, readingToEdit, callback}) => {
    const [reading, setReading] = useState(readingToEdit.id ? {...readingToEdit, body: richUtils.textToEditorState(readingToEdit.body)} : {
        title: "",
        body: EditorState.createEmpty(),
        tags: [],
        category: readingToEdit?.category ?? "",
        imgUrl: ""
    })

    const [file, setFile] = useState()

    const saveUploadImage = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (file) {
            const fd = new FormData();
            fd.append("file", file, file.name);
            uploadImage(fd, fileSuccessCallback, fileErrorCallback);
        } else handleSubmitReading("");
    }

    const handleDeleteImage = () => {
        setFile(undefined)
    }

    const fileErrorCallback = () => {
        toast.error("Error cargando imagen");
    }

    const fileSuccessCallback = (url) => {
        handleSubmitReading(url.link);
    }

    const errorCallback = () => {
        toast.error("Error agregando lectura");
    }

    const successCallback = (res) => {
        callback(res);
        toast.success("Lectura agregada exitosamente");
    }

    const handleSubmitReading = (imgUrl) => {
        const submitFn = reading.id ? editReading : addReading;
        submitFn({
            ...reading,
            body: richUtils.parseEditorState(reading.body),
            imgUrl: imgUrl
        }, successCallback, errorCallback)
    }

    return (
        <div className={"reading-modal"}>
            <TextInput label={"Titulo"} value={reading.title} onChange={(title) => setReading({...reading, title})}/>
            <RichTextEditor label={"Cuerpo"} editorState={reading.body}
                            setEditorState={body => setReading({...reading, body})}/>
            <div className={"upload-image-container"}>
                <Button
                    color="default"
                    startIcon={<AttachFile/>}
                    variant="contained"
                    component="label"
                >
                    {file ? file.name : "Cargar imagen"}
                    <input accept="image/*" type="file" hidden onChange={saveUploadImage}/>
                </Button>
                {file && <Button startIcon={<Close/>} onClick={handleDeleteImage}/>}
            </div>
            <div className={"reading-modal-category"}>
                <Autocomplete label={"Categoría"} options={readingCategories.map(option => option.name)}
                              value={reading.category}
                              onChange={category => setReading({...reading, category})}/>
            </div>
            <button onClick={handleUpload} className={`submit-button`}>{reading.id ? "Editar lectura" : "Agregar lectura"}</button>
        </div>
    )
}

export default ReadingModalBody;
