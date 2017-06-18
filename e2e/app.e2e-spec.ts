import { HomeApp006Page } from './app.po';

describe('home-app006 App', () => {
  let page: HomeApp006Page;

  beforeEach(() => {
    page = new HomeApp006Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
