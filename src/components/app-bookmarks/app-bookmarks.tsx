import { Component, h } from '@stencil/core';
import BookmarksService from '../../services/bookmarks'

@Component({
  tag: 'app-bookmarks',
  styleUrl: 'app-bookmarks.scss',
  shadow: true,
})
export class AppBookmarks {
  async componentWillLoad() {
    let bookmarks = await BookmarksService.getAll();
    console.log(bookmarks);
  }

  render() {
    return (
      <div class="app-bookmarks container">
        <dir className="row">
          <div class="col-8">

            <ul>
              <li>Item</li>
              <li>Item</li>
              <li>Item</li>
              <li>Item</li>
              <li>Item</li>
            </ul>
          </div>

          <div class="col-4">
            <h5>Add Bookmark</h5>
            <app-add-bookmark-form></app-add-bookmark-form>
          </div>

        </dir>
      </div>
    );
  }
}
