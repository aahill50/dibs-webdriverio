'use strict';

var chai = require('chai');
var expect = chai.expect;

module.exports = {
    baseUrl: "https://www.1stdibs.com/furniture/more-furniture-collectibles/sculptures/cat/id-f_409934/",

    itemDescription: "p.item-description",

    itemDetails: "div.item-data",

    itemAttributes:[
    "PRICE",
    "PLACE OF ORIGIN",
    "DATE OF MANUFACTURE",
    "PERIOD",
    "MATERIALS AND TECHNIQUES",
    "MATERIALS NOTES",
    "CONDITION",
    "WEAR",
    "HEIGHT",
    "WIDTH",
    "DEPTH" ],

    url: function(client) {
        client.url(this.baseUrl);
        return client;
    },

    verifyVisible: function(client, element) {
        client.isVisible(element, function(err, isVisible) {
            expect(err).to.be.undefined();
            expect(isVisible).to.be.true();
        });
        return client;
    },

    verifyItemDetails: function(client) {
        var pdp = this;
        client.getText(pdp.itemDetails, function(err,resultText) {
            expect(err).to.be.undefined();
            pdp.itemAttributes.forEach(function(attr) {
                expect(resultText).to.contain(attr);
            });
        });
        return this;
    }
};