import { Component, h, State } from '@stencil/core';
import { store } from '@stencil/redux';
import BookmarksService from '../../services/bookmarks'
import { Bookmark } from '../../types/bookmark';

@Component({
  tag: 'app-bookmarks',
  styleUrl: 'app-bookmarks.scss',
  shadow: true,
})
export class AppBookmarks {
  @State() bookmarks: Bookmark[];
  @State() isLoading: boolean;
  @State() error: any;

  loadBookmarks: (...args: any) => any;

  async componentWillLoad() {
    store.mapStateToProps(this, state => {
      const {
        bookmarksReducer: { bookmarks, isLoading, error },
      } = state;

      return {
        bookmarks,
        isLoading,
        error,
      };
    });

    await BookmarksService.getAll();
  }

  search(value) {
    const searchTerm = value.trim();
    BookmarksService.search(searchTerm);
  }

  render() {
    return (
      <div class="app-bookmarks container">
        <div class="row">
          <div class="col-8">
            <div class="row">
              <div class="col-11">
                <input
                  type="search"
                  placeholder="Filter by Tags"
                  class="input search"
                  onInput={(ev: any) => this.search(ev.target.value)}
                />
              </div>
            </div>
            <div class="app-bookmarks-list">
              <ul>
                <li class="row header">
                  <div class="col-5">Name</div>
                  <div class="col-5">Tags</div>
                  <div class="col-2">Actions</div>
                </li>
                {this?.bookmarks?.map((bookmark) =>
                  <app-bookmark bookmark={bookmark}></app-bookmark>
                )}
              </ul>

              { this.bookmarks.length == 0 ? <p>No bookmarks found...</p> : null }
              { this.isLoading ? <p>Loading Data...</p> : null }
              { this.error ? <p>Something went wrong: {this.error}</p> : null }
            </div>
          </div>

          <div class="col-4">
            <h5>Add Bookmark</h5>
            <app-add-bookmark-form></app-add-bookmark-form>
          </div>

        </div>
      </div>
    );
  }
}
