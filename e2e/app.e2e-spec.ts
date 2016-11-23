import { WeatherAppNgPage } from './app.po';

describe('weather-app-ng App', function() {
  let page: WeatherAppNgPage;

  beforeEach(() => {
    page = new WeatherAppNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
