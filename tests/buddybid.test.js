var should = require('should');
const BuddyBid = require('../lib/buddybid');
var BB = null;


describe('BuddyBid Social Platform API', function() {

    beforeEach(function(done) {
        BB = new BuddyBid({ baseEndpoint:'dev-jake.internal.buddybid.com:3000',
                            ownerId: '598a71e294a3cb1057000001',
                            apiKey:'249321bacd60f54feb79ab57a776ea22'});
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

        it('get function returns Promise', function(done) {
            (BB.get() instanceof Promise).should.be.true();
            done();
        });

        it('put function returns Promise', function(done) {
            (BB.put() instanceof Promise).should.be.true();
            done();
        });

        it('delete function returns Promise', function(done) {
            (BB.delete() instanceof Promise).should.be.true();
            done();
        });

        it('post function returns Promise', function(done) {
            (BB.post() instanceof Promise).should.be.true();
            done();
        });
    });

    describe('Request Methods', function () {
        it('GET request', function(done) {
            BB.get('/owner/598a71e294a3cb1057000001', function(err, body) {
                should.not.exists(err);
                done();
            });
        });

        it('PUT request ', function(done) {
            BB.get('/listing/by/reference/1450849', function (err, data) {
                const listing = data;
                listing.title = 'modified using Callback';
                BB.put('/listing/' + listing.listingId, listing, function (err, data) {
                    done();
                });
            });
        });

        it('GET request using Promise', function(done) {
            BB.get('/owner/598a71e294a3cb1057000001').then(data => {
                should.exists(data);
                done();
            });
        });

        it('PUT request using Promise', function(done) {
            BB.get('/listing/by/reference/1450849').then(data => {
                const listing = data;
                listing.title = 'modified using Promise';
                BB.put('/listing/' + listing.listingId, listing).then(data => {
                    done();
                });
            });
        });
    });

    afterEach(function(done) {
        done();
    });
});





