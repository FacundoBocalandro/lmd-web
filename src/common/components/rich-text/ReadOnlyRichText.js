import React from "react";
import {Editor} from "draft-js";

const ReadOnlyRichText = ({editorState}) => {
    return (
        <Editor
            editorState={editorState}
            readOnly={true}
            onChange={() => {
            }}/>
    );
}

export default ReadOnlyRichText;
