/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not empty.
         */
        it('all feeds are defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: loops through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is not empty.
         */
        it('all feeds urls are defined and not empty', function() {
            expect(allFeeds.filter(function(item) {
              return item.url ? item.url.length : false;
            }).length).toBe(allFeeds.length);
        });
        /* TODO: loops through each feed in the allFeeds object and ensures
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
        // TODO: ensures the menu element is hidden by default.
        it('the menu element is hidden', function() {
            expect(document.body.className.indexOf('menu-hidden') > -1).toBe(true);
        });
        // TODO: ensures the menu changes visibility when the menu icon is clicked.
        it('the menu changes visibility when the menu icon is clicked', function() {
            isHidden = $('.menu-icon-link').click() && document.body.className.indexOf('menu-hidden') === -1;
            isNotHidden = $('.menu-icon-link').click() && document.body.className.indexOf('menu-hidden') > -1;
            expect(isHidden).toBe(true);
            expect(isNotHidden).toBe(true);
        });
    });
    //TODO: a test suite named "Initial Entries"
    describe('Initial Entries', function() {
        /* TODO: ensures when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('there is at least a single .entry element within the .feed container', function(done) {
            expect($('.feed').children().length > 0).toBe(true);
            done();
        });
    });
    /* TODO: a test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: ensures when a new feed is loaded by the loadFeed function that
         * the content actually changes.
         */
        let oldHtml;
        beforeEach(function(done) {
            oldHtml = $('.feed').html();
            loadFeed(3, done);
        });

        it('when a new feed is loaded the content actually changes', function(done) {
            expect(oldHtml !== $('.feed').html()).toBe(true);
            done();
        });
    });
}());
