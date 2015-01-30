var webdriverio = require('webdriverio'),
    selenium = require('selenium-standalone'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    homepage = require('./pages/homepage.js'),
    productDetailPage = require('./pages/pdp'),
    clientOptions = {
        desiredCapabilities: {
            browserName: 'chrome'
        }
    };

selenium.start(function(err, child) {
    selenium.child = child;
});

describe("1stdibs.com", function() {
    this.timeout(10000);
    var client = {};

    before(function(done) {
        client = webdriverio.remote(clientOptions);
        client
            .pause(300)
            .init(done)
    });

    after(function(done) {
        client
            .end(done)
            .then(function() {
                selenium.child.kill();
            });
    });

    describe("Global Search", function() {
        it('should have a search input field', function(done) {
            homepage.url(client);
            homepage.verifyVisible(client, homepage.searchBar);

            client.call(done);
        });

        it('should autocomplete when a valid search term is entered', function(done) {
            homepage.url(client);
            homepage.doValidSearch(client, "gold");
            client.call(done);
        });

        it('should not autocomplete when an invalid search term is entered', function(done) {
            homepage.url(client);
            homepage.doInvalidSearch(client, "kjhsahjkads");
            client.call(done);
        });
    });

    describe("Product Detail Page", function() {
        it('should contain an item description', function(done) {
            client
                .url(productDetailPage.baseUrl)
                .isVisible(productDetailPage.itemDescription, function(err, isVisible) {
                    expect(err).to.be.undefined();
                    expect(isVisible).to.be.true();
                })
                .call(done)
        });

        it('should contain item details', function(done) {
            client
                .url(productDetailPage.baseUrl)
                .isVisible(productDetailPage.itemDetails, function(err, isVisible) {
                    expect(err).to.be.undefined();
                    expect(isVisible).to.be.true();
                })
                .getText(productDetailPage.itemDetails, function(err,resultText) {
                    expect(err).to.be.undefined();
                    productDetailPage.itemAttributes.forEach(function(attr) {
                        expect(resultText).to.contain(attr);
                    });
                })
                .call(done)
        });

        it('should fail', function() {
            expect(4).to.equal(4);
            expect(4).to.equal(5); //It will skip the remaining assertions in this test due to failure
            expect(4).to.equal(4);
        });

        it('should be pending');
        it('should be pending too');
        it('should also be pending');

        it('should pass', function() {
            expect(4).to.equal(4);
        });

        it('should execute this test', function() {
            expect(true).to.be.ok();
        })
    });
});