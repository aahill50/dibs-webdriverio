var webdriverio = require('webdriverio'),
    selenium = require('selenium-standalone'),
    chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    expect = chai.expect,
    should = chai.should(),
    homepage = require('./pages/homepage'),
    clientOptions = {
        desiredCapabilities: {
            browserName: 'chrome'
        }
    };

chai.use(chaiAsPromised);

selenium.start(function(err, child) {
    selenium.child = child;
});

describe("1stdibs", function() {
    this.timeout(10000);
    var client = {};

    beforeEach(function(done) {
        client = webdriverio.remote(clientOptions);
        client
            .pause(300)
            .init(done)
    });

    it('title should contain "1stdibs"', function(done) {
        client
            .url('http://www.1stdibs.com')
            //.title(function(err, res) {
            //    expect(res.value).to.contain('1stdibs');
            //})
            .title().then(function(res) {
                expect(res.value).to.contain("1stdibs");
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
