var webdriverio = require('webdriverio'),
    selenium = require('selenium-standalone'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    homepage = require('./pages/homepage'),
    clientOptions = {
        desiredCapabilities: {
            browserName: 'chrome'
        }
    };

describe("1stdibs - Global Search", function() {
    this.timeout(10000);
    var client = {};

    before(function(done) {
        selenium.start(function(err, child) {
            selenium.child = child;
            client = webdriverio.remote(clientOptions);
            client.call(done);
        });
    });

    beforeEach(function(done) {
        client.init(done)
    });

    it('should have a search input field', function(done) {
        client
            .url('http://www.1stdibs.com')
            .isVisible(homepage.searchBar, function(err, isVisible) {
                expect(isVisible).to.be.true();
            })
            .call(done)
    });

    it('should show search results when a valid search term is entered', function(done) {
        client
            .url('http://www.1stdibs.com')
            .setValue(homepage.searchBar, "gold")
            .waitForVisible(homepage.searchResults, 1000)
            .isVisible(homepage.searchResults, function(err, isVisible) {
                expect(err).to.be.undefined();
                expect(isVisible).to.be.true();
            })
            .getText(homepage.searchResults, function(err, res) {
                expect(err).to.be.undefined();
                expect(res).to.contain("gold");
                expect(res).to.contain("POPULAR SEARCHES");
                expect(res).to.contain("DEALERS");
            })
            .call(done)
    });

    it('should not show search results when an invalid search term is entered', function(done) {
        client
            .url('http://www.1stdibs.com')
            .setValue(homepage.searchBar, "kjhsahjkads")
            .waitForVisible(homepage.searchResults, 1000, function(err, isVisible) {
                expect(err).to.not.be.undefined();
                expect(isVisible).to.be.false();
            })
            .call(done)
    });

    afterEach(function(done) {
        client.end(done);
    });

    after(function(done) {
        selenium.child.kill();
        client.call(done);
    })
});
