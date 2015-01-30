var chai = require('chai'),
    expect = chai.expect;

module.exports = {
    baseUrl: "https://www.1stdibs.com",

    searchBar: "input[type=text][name=q]",

    searchResults: "ul#ui-id-1",

    url: function(client) {
        client.url("https://www.1stdibs.com");
    },

    verifyVisible: function(client, element) {
        client.isVisible(element, function(err, isVisible) {
                expect(err).to.be.undefined();
                expect(isVisible).to.be.true();
            })
    }
};
