import { Actions, ActionTypes } from "../actions/index";
import { Bookmark } from '../types/bookmark';
import { BookmarksState } from '../types/states';

const getInitialState = () => {
  return {
    bookmarks: [] as Bookmark[],
    loading: false,
    error: null
  };
};

const bookmarksReducer = (state: BookmarksState = getInitialState(), action: ActionTypes) => {
  switch (action.type) {
    case Actions.CREATE_BOOKMARK: {
      return {
        bookmarks: [action.payload, ...state.bookmarks],
        loading: false,
        error: null,
      };
    }

    case Actions.DELETE_BOOKMARK: {
      const bookmarks = state.bookmarks.filter((bookmark) => bookmark.id != action.payload)

      return {
        bookmarks: bookmarks,
        loading: true,
        error: null,
      };
    }

    case Actions.LOAD_BOOKMARKS_BEGIN: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case Actions.LOAD_BOOKMARKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        bookmarks: action.payload,
      };
    }

    case Actions.LOAD_BOOKMARKS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

    case Actions.SEARCH_BOOKMARKS: {
      return {
        ...state,
        loading: false,
        bookmarks: action.payload,
      };
    }

    default:
      return state;
  }
};

export default bookmarksReducer;
