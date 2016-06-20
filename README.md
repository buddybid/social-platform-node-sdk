# BuddyBid Social Platform Node SDK

*More information about BuddyBId Social Commerce visit [BuddyBid Commerce Everywhere](https://www.buddybid.com)*

*API Documentation information [BuddyBid Social Commerce API Documentation](https://buddybid.co/api/documentation/)*


```javascript
const BuddyBid = require('../lib/buddybid');
var BB = new BuddyBid({ baseEndpoint:'your-shop.buddybid.co',
                            ownerId: '56a687ce13e2df0875b457e1',
                            apiKey:'98a80d3638be5623be4a559b8f96a398'});
                            
BB.get('/owner/56a687ce13e2df0875b457e1', function(err, body) {
  console.log(body);
});                                                      
```