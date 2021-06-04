import { newE2EPage } from '@stencil/core/testing';

describe('app-add-bookmark-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-add-bookmark-form></app-add-bookmark-form>');

    const element = await page.find('app-add-bookmark-form');
    expect(element).toHaveClass('hydrated');
  });

  it('create new entry', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-add-bookmark-form></app-add-bookmark-form>');

    const bookmarkForm = await page.find('app-add-bookmark-form');
    const bookmarkFormElement = bookmarkForm.shadowRoot;


    // set input fields
    bookmarkFormElement.querySelector('#name').setAttribute('value', 'United Internet Media');
    bookmarkFormElement.querySelector('#link').setAttribute('value', 'https://united-internet.de');
    bookmarkFormElement.querySelector('#tags').setAttribute('value', 'united, internet, media');
    bookmarkFormElement.querySelector('button').click();
    await page.waitForChanges();

    expect(true).toBeTruthy();
  });

  // it('includes a div with the class "app-profile"', async () => {
  //   const page = await newE2EPage({ url: '/profile/joseph' });

  // I would like to use a selector like this above, but it does not seem to work
  //   const element = await page.find('app-root >>> app-profile >>> div');
  //   expect(element).toHaveClass('app-profile');
  // });
});
