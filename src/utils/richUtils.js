import {convertFromRaw, convertToRaw, EditorState} from 'draft-js';

const richUtils = {
    /**
     * Converts editor state (draft-js) to rich text string
     * @param state: Editor state. reference: https://draftjs.org/docs/api-reference-editor-state/
     */
    parseEditorState: (state) => JSON.stringify(convertToRaw(state._immutable.currentContent)),
    textToEditorState: (text) => {
        try {
            return EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
        } catch (e) {
            return EditorState.createWithText(text);
        }
    }
}

export default richUtils;