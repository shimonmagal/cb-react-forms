import update from "immutability-helper";
import {
  ADD_ITEM_TO_PREVIEW,
  REMOVE_ITEM_FROM_PREVIEW,
  DRAG_ITEM_IN_PREVIEW,
  SHOW_EDITOR,
  HIDE_EDITOR,
  SUBMIT_EDITOR_STATE
} from "../actions/types";

const initialState = {
  editorVisible: false,
  editorState: {},
  previewItems: [{"id":"Header Text","element":"Header","label":{"blocks":[{"key":"dhv2q","text":"Placeholder Label","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}},{"id":"Label","element":"Label","label":{"blocks":[{"key":"cmv9e","text":"Placeholder Label","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}},{"id":"birthdate","element":"Date","required":false,"label":{"blocks":[{"key":"bolae","text":"Placeholder Label","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},"value":"2020-08-23T13:36:33.929Z","maxDate":null,"minDate":null},{"id":"מספר תעודת זהות","element":"TextInput","required":false,"label":{"blocks":[{"key":"cp3c2","text":"Placeholder Label","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},"value":""}]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_PREVIEW:
      return {
        ...state,
        previewItems: [...state.previewItems, action.payload]
      };

    case REMOVE_ITEM_FROM_PREVIEW:
      return {
        ...state,
        previewItems: state.previewItems.filter(
          item => item.id !== action.payload.id
        )
      };

    case DRAG_ITEM_IN_PREVIEW:
      const { dragIndex, hoverIndex } = action.payload;
      const dragCard = state.previewItems[dragIndex];
      const updatedItems = update(state.previewItems, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
      });
      return {
        ...state,
        previewItems: updatedItems
      };

    case SHOW_EDITOR:
      return {
        ...state,
        editorVisible: true,
        editorState: action.payload.item
      };

    case HIDE_EDITOR:
      return {
        ...state,
        editorVisible: false,
        editorState: {}
      };

    case SUBMIT_EDITOR_STATE:
      const updatedPreviewItems = state.previewItems.map(item => {
        if (item.id === action.payload.state.id) {
          item = { ...action.payload.state };
          return item;
        }
        return item;
      });
      const updatedState = {
        ...state,
        editorState: {},
        editorVisible: false,
        previewItems: [...updatedPreviewItems]
      };
      return { ...updatedState };

    default:
      return state;
  }
};
