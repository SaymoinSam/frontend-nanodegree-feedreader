/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

// To run the code when the DOM is ready.
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* tests to make sure that the allFeeds variable has been defined
     * and that it is not empty.
     */
    it('all feeds are defined and not empty', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });
    /* loops through each feed in the allFeeds object and
     * ensures it has a URL defined and that the URL is not empty.
     */
    it('all feeds urls are defined and not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeTruthy();
      });
    });
    /* loops through each feed in the allFeeds object and ensures
     * it has a name defined and that the name is not empty.
     */
    it('all feeds names are defined and not empty', function() {
      expect(allFeeds.filter(function(item) {
        return item.name ? item.name.length : false;
      }).length).toBe(allFeeds.length);
    });
  });
  // a test suite named "The menu"
  describe('The menu', function() {
    // ensures the menu element is hidden by default.
    it('the menu element is hidden', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
    // ensures the menu changes visibility when the menu icon is clicked.
    it('the menu changes visibility when the menu icon is clicked', function() {
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });
  // a test suite named "Initial Entries"
  describe('Initial Entries', function() {
    /* ensures when the loadFeed function is called and completes its work,
     * there is at least a single .entry element within the .feed container.
     */
    beforeEach(function(done) {
      loadFeed(0, done);
    });
    it('there is at least a single .entry element within the .feed container', function(done) {
      expect($('.feed .entry').length > 0).toBe(true);
      done();
    });
  });
  /* a test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    /* ensures when a new feed is loaded by the loadFeed function that
     * the content actually changes.
     */
    let oldFeed, newFeed;
    beforeEach(function(done) {
      loadFeed(3, function() {
        oldFeed = $('.feed').html();
        // to restore the first state of the page, and to ensure the code runs async
        loadFeed(0, function() {
          newFeed = $('.feed').html();
          done();
        });
      });
    });

    it('when a new feed is loaded the content actually changes', function(done) {
      expect(oldFeed).not.toBe(newFeed);
      done();
    });
  });
}());
