import { Actions } from '../actions';
import { environment } from '../global/environment';
import { Bookmark } from '../types/bookmark';
import { store } from '@stencil/redux';

class BookmarksService {

  /**
   * @type {string}
   * @private
   */
  private resourceEndpoint = `${environment.apiUrl}/bookmarks`;

  /**
   * This property could live in a HttpClient or so,
   * but since we have no more services consuming http,
   * makes no sense to move outside.
   *
   * @type {{'Content-Type': string}}
   * @private
   */
  private headers = {
    'Content-Type': 'application/json'
  };

  private storeInstance;

  private bookmarks: Bookmark[] = [];

  constructor() {
    this.storeInstance = store.getStore();
  }

  private resetBookmarks(): void {
    this.bookmarks = [...this.storeInstance.getState().bookmarksReducer.bookmarks];
  }

  private sort(bookmarks: Bookmark[]) {
    return bookmarks.sort((a, b) => b.createdAt - a.createdAt)
  }

  /**
   * Get the bookmarks list
   *
   * @returns {Promise<Bookmark[]>}
   * @memberOf BookmarksService
   */
  getAll(): Promise<Bookmark[]> {
    return new Promise(async (resolve, reject) => {
      try {
        this.storeInstance.dispatch({
          type: Actions.LOAD_BOOKMARKS_BEGIN
        });

        let response = await fetch(this.resourceEndpoint, { headers: this.headers });
        let data = await response.json() as Bookmark[];
        data = this.sort(data);

        this.storeInstance.dispatch({
          type: Actions.LOAD_BOOKMARKS_SUCCESS,
          payload: data
        });

        this.resetBookmarks();
        resolve(data);
      } catch (error) {
        this.storeInstance.dispatch({
          type: Actions.LOAD_BOOKMARKS_FAILURE,
          payload: error
        });
        reject(error);
      }
    });
  }

  /**
   * Create new Bookmark
   *
   * @param {Bookmark} bookmark
   * @returns {Promise<Bookmark>}
   */
  create(bookmark: Bookmark): Promise<Bookmark> {
    return new Promise(async (resolve, reject) => {
      try {
        // set id and created date
        bookmark.id = Math.random().toString(36).substring(7);
        bookmark.createdAt = (new Date()).getTime();

        await fetch(this.resourceEndpoint, {
          method: 'POST',
          body: JSON.stringify(bookmark),
          headers: this.headers,
        });

        this.storeInstance.dispatch({
          type: Actions.CREATE_BOOKMARK,
          payload: bookmark
        });

        this.resetBookmarks();
        resolve(bookmark);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  /**
   * Delete a bookmark with given ID
   * @param {string} id
   * @returns {Promise<null>}
   */
  delete(id: string): Promise<null> {
    return new Promise(async (resolve, reject) => {
      try {
        await fetch(`${this.resourceEndpoint}/${id}`, {
          method: 'DELETE',
          headers: this.headers,
        });

        this.storeInstance.dispatch({
          type: Actions.DELETE_BOOKMARK,
          payload: id
        });

        this.resetBookmarks();
        resolve(null);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  /**
   * Search bookmarks by tags filtering by given term
   *
   * @param {string} term
   */
  search(term: string): void {
    try {
      if(!term) {
        this.storeInstance.dispatch({
          type: Actions.LOAD_BOOKMARKS_SUCCESS,
          payload: this.bookmarks,
        });
      }

      const bookmarks = this.bookmarks.filter((bookmark) => bookmark.tags.toLowerCase().search(term) > -1);
      this.storeInstance.dispatch({
        type: Actions.SEARCH_BOOKMARKS,
        payload: bookmarks,
      });

      return;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new BookmarksService();
