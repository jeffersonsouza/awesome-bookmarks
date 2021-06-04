import { Component, h } from '@stencil/core';
import { store } from '@stencil/redux';
import { configureStore } from '../../store/index';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  componentWillLoad() {
    store.setStore(configureStore({}));
  }

  render() {
    return (
      <div class="container">
        <header>
          <h1>Bookmarks</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-bookmarks" exact={true} />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
