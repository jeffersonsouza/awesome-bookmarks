import {
  CreateBookmarkAction,
  DeleteBookmarkAction,
  LoadBookmarksBeginAction,
  LoadBookmarksFailureAction,
  LoadBookmarksSuccessAction, SearchBookmarksAction,
} from '../types/actions';

export type ActionTypes =
  CreateBookmarkAction |
  DeleteBookmarkAction |
  LoadBookmarksBeginAction |
  LoadBookmarksSuccessAction |
  LoadBookmarksFailureAction |
  SearchBookmarksAction;

export enum Actions {
  LOAD_BOOKMARKS_BEGIN = 'LOAD_BOOKMARKS_BEGIN',
  LOAD_BOOKMARKS_SUCCESS = 'LOAD_BOOKMARKS_SUCCESS',
  LOAD_BOOKMARKS_FAILURE = 'LOAD_BOOKMARKS_FAILURE',
  CREATE_BOOKMARK = 'CREATE_BOOKMARK',
  DELETE_BOOKMARK = 'DELETE_BOOKMARK',
  SEARCH_BOOKMARKS = 'SEARCH_BOOKMARKS',
}
