import { Actions } from '../actions';
import { Bookmark } from './bookmark';

export interface LoadBookmarksBeginAction {
  type: Actions.LOAD_BOOKMARKS_BEGIN;
}

export interface LoadBookmarksSuccessAction {
  type: Actions.LOAD_BOOKMARKS_SUCCESS;
  payload: Bookmark[];
}

export interface SearchBookmarksAction {
  type: Actions.SEARCH_BOOKMARKS;
  payload: Bookmark[];
}

export interface LoadBookmarksFailureAction {
  type: Actions.LOAD_BOOKMARKS_FAILURE;
  payload: any;
}

export interface CreateBookmarkAction {
  type: Actions.CREATE_BOOKMARK;
  payload: Bookmark;
}

export interface DeleteBookmarkAction {
  type: Actions.DELETE_BOOKMARK;
  payload: string;
}
