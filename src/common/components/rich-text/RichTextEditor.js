import React from "react";
import {Editor, RichUtils} from "draft-js";
import "./RichTextEditor.css";
import {faBold, faCode, faItalic, faStrikethrough, faUnderline} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const RichTextEditor = ({editorState, setEditorState, label}) => {

    const handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(
            editorState,
            command
        );
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    };

    const inlineStyleButtons = [
        {
            icon: faBold,
            style: 'BOLD',
            value: 'bold'
        },

        {
            icon: faItalic,
            style: 'ITALIC',
            value: 'italic'
        },

        {
            icon: faUnderline,
            style: 'UNDERLINE',
            value: 'underline'
        },

        {
            icon: faStrikethrough,
            style: 'STRIKETHROUGH',
            value: 'strikethrough'
        },

        {
            icon: faCode,
            style: 'CODE',
            value: 'code'
        }
    ];

    return (
        <div className="rich-text-editor input-container">
            {label && <span className={"input-label"}>{label}</span>}
            <div className="rich-text-editor-input">
                <Editor
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={value => setEditorState(value)}
                />
            </div>
            <div className="rich-text-editor-buttons">
                {inlineStyleButtons.map((button) => <button
                    onMouseDown={() => setEditorState(RichUtils.toggleInlineStyle(editorState, button.style))}
                    className={"rich-text-editor-button"}><FontAwesomeIcon icon={button.icon}/></button>)}
            </div>
        </div>
    );
}

export default RichTextEditor;
