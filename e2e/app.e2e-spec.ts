import { UadPage } from './app.po';

describe('uad App', () => {
  let page: UadPage;

  beforeEach(() => {
    page = new UadPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
