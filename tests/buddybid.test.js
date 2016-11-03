var should = require('should');
const BuddyBid = require('../lib/buddybid');
var BB = null;


describe('BuddyBid Social Platform API', function() {

    beforeEach(function(done) {
        BB = new BuddyBid({ baseEndpoint:'dev-jake.internal.buddybid.com:3000',
                            ownerId: '5750ff93a235aeb11ac21e27',
                            apiKey:'a9895957bb5e2749ad1401745c557ff3'});
        done();
    });

    describe('BB instance', function () {
        it('bb should be function', function (done) {
            BuddyBid.should.be.type('function');
            done();
        });

        it('should init buddybid api lib', function (done) {
            BB.should.be.type('object');
            done();
        });

        it('request is a function.', function(done) {
            BB.request.should.be.type('function');
            done();
        });

        it('get is a function.', function(done) {
            BB.put.should.be.type('function');
            done();
        });

        it('post is a function.', function(done) {
            BB.get.should.be.type('function');
            done();
        });

        it('put is a function.', function(done) {
            BB.delete.should.be.type('function');
            done();
        });

        it('delete is a function.', function(done) {
            BB.post.should.be.type('function');
            done();
        });
    });

    describe('Request Methods', function () {
        it('GET request', function(done) {
            BB.get('/owner/5750ff93a235aeb11ac21e27', function(err, body) {
                should.not.exists(err);
                done();
            });
        });

        it('DELETE request', function(done) {
            BB.delete('/users/57510d0dc4197d101b754da8/watchlist/581a8e1168e897850de8ea6d', function(err, body) {
                should.not.exists(err);
                done();
            });
        });
    });

    afterEach(function(done) {
        done();
    });
});





