import { newE2EPage } from '@stencil/core/testing';

describe('app-bookmark-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-bookmarks></app-bookmarks>');

    const element = await page.find('app-bookmarks');
    expect(element).toHaveClass('hydrated');
  });

  it('Check for bookmarks entries', async () => {
    const page = await newE2EPage({ url: '/' });

    const list = await page.find('app-root >>> app-bookmarks >>> ul');
    console.log(list.shadowRoot.querySelectorAll('app-bookmark').length);

    expect(list.shadowRoot.querySelectorAll('app-bookmark').length).toBeGreaterThan(0);
  });

  it('Search', async () => {
    const page = await newE2EPage({ url: '/' });

    const input = await page.find('app-root >>> app-bookmarks >>> input');
    input.setAttribute('value', 'app');
    await page.waitForChanges();

    const list = await page.find('app-root >>> app-bookmarks >>> ul');
    console.log(list.shadowRoot.querySelectorAll('app-bookmark'));

    expect(list.shadowRoot.querySelectorAll('app-bookmark').length).toBe(1);
  });

});
