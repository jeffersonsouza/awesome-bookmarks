import { Bookmark } from './bookmark';

export interface BookmarksState {
  bookmarks: Bookmark[];
  loading: boolean;
  error: any;
}
