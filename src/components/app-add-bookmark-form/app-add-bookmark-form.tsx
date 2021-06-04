import { Component, h, State } from '@stencil/core';
import BookmarksService from '../../services/bookmarks'

@Component({
  tag: 'app-add-bookmark-form',
  styleUrl: 'app-add-bookmark-form.scss',
  shadow: true,
})
export class AppAddBookmarkForm {
  @State() formControls = {
    name: null,
    link: null,
    tags: null,
  };

  updateFormValue(controlName, value) {
    this.formControls = {
      ...this.formControls,
      [controlName]: value
    };
  }

  async addBookmark(event) {
    event.preventDefault();
    await BookmarksService.create(this.formControls);
    this.formControls = { name: null, link: null, tags: null };
  }

  render() {
    return (
      <div class="app-add-bookmark-form">
        <form onSubmit={(event) => this.addBookmark(event)}>
          <div class="row">
            <div class="col-8">
              <label htmlFor="name">Name</label>
              <input type="text" class="input" id="name" required value={this.formControls.name} onInput={(ev: any) =>
                this.updateFormValue("name",
                  ev.target.value)
              } />
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <label htmlFor="link">Link</label>
              <input type="url" class="input" id="link" required value={this.formControls.link} onInput={(ev: any) =>
                this.updateFormValue("link",
                  ev.target.value)
              } />
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <label htmlFor="tags">Tags</label>
              <input type="text" class="input" id="tags" value={this.formControls.tags} onInput={(ev: any) =>
                this.updateFormValue("tags",
                  ev.target.value)
              } />
            </div>
          </div>
          <div class="row">
            <div class="col-9">
              <button type="submit">Add Bookmark</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
