import { environment } from '../global/environment';
import { Bookmark } from '../types/bookmark';

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

  /**
   * Get the bookmarks list
   *
   * @returns {Promise<Bookmark[]>}
   * @memberOf BookmarksService
   */
  getAll(): Promise<Bookmark[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(this.resourceEndpoint, { headers: this.headers });
        let json = await response.json() as Bookmark[];
        console.log(json);
        resolve(json);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  create(data: Bookmark): Promise<Bookmark> {
    return new Promise(async (resolve, reject) => {
      try {
        // set id and created date
        data.id = Math.random().toString(36).substring(7);
        data.createdAt = (new Date()).getTime();

        // perform API request
        let response = await fetch(this.resourceEndpoint, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: this.headers,
        });

        let json = await response.json();

        console.log(json);
        resolve(data);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  delete(id: string): Promise<null> {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(`${this.resourceEndpoint}/${id}`, {
          method: 'DELETE',
          headers: this.headers,
        });

        let json = await response.json();

        console.log(json);
        resolve(null);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }
}

export default new BookmarksService();
