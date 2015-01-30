var chai = require('chai'),
    expect = chai.expect;

module.exports = {
    baseUrl: "https://www.1stdibs.com",

    searchBar: "input[type=text][name=q]",

    searchResults: "ul#ui-id-1",

    url: function(client) {
        client.url("https://www.1stdibs.com");
        return client;
    },

    verifyVisible: function(client, element) {
        client.isVisible(element, function(err, isVisible) {
            expect(err).to.be.undefined();
            expect(isVisible).to.be.true();
        });
        return client;
    },

    search: function(client, searchTerm) {
        client.setValue(this.searchBar, searchTerm);
        return client;
    },

    doValidSearch: function(client, searchTerm) {
        this.search(client, searchTerm)
            .waitForVisible(this.searchResults, 5000, function(err, isVisible) {
                expect(err).to.be.undefined();
                expect(isVisible).to.be.true();
            });
        this.verifyVisible(client, this.searchResults);
        return client;
    },

    doInvalidSearch: function(client, searchTerm) {
        this.search(client, searchTerm)
            .waitForVisible(this.searchResults, 2000, function(err, isVisible) {
                expect(err).to.not.be.undefined();
                expect(isVisible).to.be.false();
            });
        return client;
    }
};
