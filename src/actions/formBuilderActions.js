import uuid from "uuid/v4";
import addPropsToItem from './addPropsToItem';
import {
  INIT_PREVIEW,
  ADD_ITEM_TO_PREVIEW, 
  REMOVE_ITEM_FROM_PREVIEW, 
  DRAG_ITEM_IN_PREVIEW,
    FINALIZE_ITEM,
  SHOW_EDITOR,
  HIDE_EDITOR,
  SUBMIT_EDITOR_STATE
} from "./types";

export const initPreview = defaultItems => {
  return {
    type: INIT_PREVIEW, 
    payload: defaultItems 
  }
}

export const addItem = (wholeItem, toReturn) => {
  let id = wholeItem.name;

  if (!wholeItem.unique)
  {
      id = uuid();
  }

  let element = wholeItem.key
  const props = addPropsToItem(element);
  const item = { id, element, ...props };
  
  if (toReturn)
  {
      toReturn.push(item);
  }
  
  return { 
    type: ADD_ITEM_TO_PREVIEW, 
    payload: item 
  };
};

export const removeItem = id => (
  { 
    type: REMOVE_ITEM_FROM_PREVIEW, 
    payload: { 
      id 
    } 
  }
);


export const finalizeItem = id => (
    {
        type: FINALIZE_ITEM,
        payload: {
            id
        }
    }
);

export const dragItem = (dragIndex, hoverIndex) => (
  { 
    type: DRAG_ITEM_IN_PREVIEW, 
    payload: { 
      dragIndex, 
      hoverIndex 
    } 
  }
);

export const showEditor = item => (
  { 
    type: SHOW_EDITOR, 
    payload: { 
      item 
    } 
  }
);

export const hideEditor = () => (
  { 
    type: HIDE_EDITOR 
  }
);

export const submitEditorState = (state) => (
  { 
    type: SUBMIT_EDITOR_STATE, 
    payload: { 
      state 
    } 
  }
);