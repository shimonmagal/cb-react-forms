import update from "immutability-helper";
import {
  INIT_PREVIEW,
  ADD_ITEM_TO_PREVIEW,
  REMOVE_ITEM_FROM_PREVIEW,
  DRAG_ITEM_IN_PREVIEW,
  SHOW_EDITOR,
  HIDE_EDITOR,
  SUBMIT_EDITOR_STATE, FINALIZE_ITEM
} from "../actions/types";

const initialState = {
  editorVisible: false,
  editorState: {},
  previewItems: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_PREVIEW:
    {
      console.log("here");
      console.log(action.payload);

      return {
        ...state,
        previewItems: action.payload
      }
    }
    case ADD_ITEM_TO_PREVIEW:
      if (state.previewItems.map(x => x.id).includes(action.payload.id))
      {
        alert("This element cannot be added more than once");
        return {...state};
      }

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
      
    case FINALIZE_ITEM:
      return {
        ...state,
        previewItems: state.previewItems.map(
            item => ((item.id !== action.payload.id)? item : {...item, isDragging: false})
        )
      }

    case DRAG_ITEM_IN_PREVIEW:
      const { dragIndex, hoverIndex } = action.payload;
      const dragCard = state.previewItems[dragIndex];
      let dragCard2 = {...dragCard, isDragging: true}
      const updatedItems = update(state.previewItems, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard2]]
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
