/* 
// first test

// spec.js
describe('Protractor Demo App', function() {
  it('should add one and two', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
    element(by.model('first')).sendKeys(1);
    element(by.model('second')).sendKeys(2);

    element(by.id('gobutton')).click();

    expect(element(by.binding('latest')).getText()).
        toEqual('5'); // This is wrong! Works for '3'
  });
}); 
*/


/*
// second test

// spec.js
describe('Protractor Demo App', function () {
  var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var latestResult = element(by.binding('latest'));

  // fill in browser.get with desired site to test
  beforeEach(function () {
    browser.get('http://juliemr.github.io/protractor-demo/');
  });

  it('should have a title', function () {
    expect(browser.getTitle()).toEqual('Super Calculator');
  });

  it('should add one and two', function () {
    firstNumber.sendKeys(1);
    secondNumber.sendKeys(2);

    goButton.click();

    expect(latestResult.getText()).toEqual('3');
  });

  it('should add four and six', function () {
    // Fill this in.
    firstNumber.sendKeys(4);
    secondNumber.sendKeys(6);

    goButton.click();

    expect(latestResult.getText()).toEqual('10');
  });

  it('should read the value from an input', function () {
    firstNumber.sendKeys(1);
    expect(firstNumber.getAttribute('value')).toEqual('1');
  });
});
*/

// third test

// spec.js
describe('Protractor Demo App', function() {
  var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var operator = element(by.model('operator'));
  var latestResult = element(by.binding('latest'));
  var history = element.all(by.repeater('result in memory'));

  function add(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    goButton.click();
  }

  beforeEach(function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
  });

  // = testcase
  it('should have a history', function() {
    add(1, 2);
    add(3, 4);

    expect(history.count()).toEqual(2);

    add(5, 6);

    expect(history.count()).toEqual(3);
  });

  it('should contain given first and last queries', function() {
    add(1, 2);
    add(3, 4);

    expect(history.last().getText()).toContain('1 + 2');
    expect(history.first().getText()).toContain('3 + 4');
  });

  it('should change between mathmatecal operators', function () {
    firstNumber.sendKeys(10);
    operator.$('[value="DIVISION"]').click();
    secondNumber.sendKeys(2);
    goButton.click();
    expect(latestResult.getText()).toEqual('5');
  })
});