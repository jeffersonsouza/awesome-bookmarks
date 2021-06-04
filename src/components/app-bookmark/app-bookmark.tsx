import { Component, h, Prop } from '@stencil/core';
import BookmarksService from '../../services/bookmarks'
import { Bookmark } from '../../types/bookmark';

@Component({
  tag: 'app-bookmark',
  styleUrl: 'app-bookmark.scss',
  shadow: true,
})
export class AppBookmark {
  @Prop() bookmark: Bookmark;

  async removeBookmark() {
    if(confirm('Are you sure that you want to delete this bookmark?')) {
      await BookmarksService.delete(this?.bookmark?.id)

      return;
    }
  }

  render() {
    return (
      <li class="row">
        <div class="col-5">
          <a href={this?.bookmark?.link} target="_blank">{this?.bookmark?.name}</a>
        </div>
        <div class="col-5">
          {this?.bookmark?.tags}
        </div>
        <div class="col-2">
          <button onClick={() => this.removeBookmark()}>delete</button>
        </div>
      </li>
    );
  }
}
