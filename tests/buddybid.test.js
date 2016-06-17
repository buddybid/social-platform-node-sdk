var should = require('should');
const BuddyBid = require('../lib/buddybid');
var BB = null;


describe('BuddyBid Social Platform API', function() {

    beforeEach(function(done) {

        BB = new BuddyBid({ baseEndpoint:'dev-tim-backend.internal.buddybid.com:3000',
                            ownerId: '56a687ce13e2df0875b457e1',
                            apiKey:'98a80d3638be5623be4a559b8f96a398'});

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

        it('patch is a function.', function(done) {
            BB.delete.should.be.type('function');
            done();
        });

        it('delete is a function.', function(done) {
            BB.post.should.be.type('function');
            done();
        });

        /*it('get request', function(done) {
            BB.get('/owner/56a687ce13e2df0875b457e1', function(err, body) {
                done();
            });

        });*/
        
        
    });


    afterEach(function(done) {

        done();
    });
});





