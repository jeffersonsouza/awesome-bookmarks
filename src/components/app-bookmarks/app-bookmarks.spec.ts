import { AppBookmarks } from './app-bookmarks';

describe('Bookmarks List', () => {
  it('bootstrap', () => {
    expect(new AppBookmarks()).toBeTruthy();
  });
});
