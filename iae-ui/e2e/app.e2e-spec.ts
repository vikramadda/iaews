import { IaeUiPage } from './app.po';

describe('iae-ui App', () => {
  let page: IaeUiPage;

  beforeEach(() => {
    page = new IaeUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
