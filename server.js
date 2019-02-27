var express = require('express');
var fs = require('fs');
var request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var app     = express();
var results = {}
var site = {};

function param_builder(dict) {
  str = '';
  for(k in dict) {
   str += '&' + k + '=' + dict[k]
  }
  return str;
}

site['cargurus.com'] = {
  url : {},
  param : {},
  f : null
};
site['cargurus.com'].url.query = 'https://www.cargurus.com/Cars/inventorylisting/ajaxFetchSubsetInventoryListing.action?';
site['cargurus.com'].url.view = 'https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?';
site['cargurus.com'].param = {
  zip : '92103',
  address : 'San+Diego%2C+CA',
  distance : '1000',
  selectedEntity : 'd2268',
  'entitySelectingHelper.selectedEntity2' : '',
  minPrice : '',
  maxPrice : '',
  minMileage : '',
  maxMileage : '',
  transmission : 'ANY',
  bodyTypeGroup : '',
  serviceProvider : '',
  page : '1',
  filterBySourcesString : '',
  filterFeaturedBySourcesString : '',
  displayFeaturedListings : 'true',
  searchSeoPageType : '',
  inventorySearchWidgetType : 'AUTO',
  allYearsForTrimName : 'true',
  daysOnMarketMin : '',
  daysOnMarketMax : '',
  vehicleDamageCategoriesRaw : '',
  minCo2Emission : '',
  maxCo2Emission : '',
  vatOnly : 'false',
  minEngineDisplacement : '',
  maxEngineDisplacement : '',
  minMpg : '',
  maxMpg : '',
  minEnginePower : '',
  maxEnginePower : '',
  isRecentSearchView : 'false'
}

site['cargurus.com'].f = function (pg_n, callback) {
  console.log('page ' + pg_n);
  site['cargurus.com'].param['page'] = '' + pg_n;
  param_str = param_builder(site['cargurus.com'].param);
  request(site['cargurus.com'].url.query + param_str, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    var j = JSON.parse(body);
    var r = '';
    var c = '';
    /*
    for(k in j) {
      r += k + '<br>';
    }
    */
    callback(j.listings);
    for(var i = 0; i < j.listings.length; i++) {
      if(j.listings[i].makeName.toUpperCase() == 'JEEP') {
        if(j.listings[i].modelName.toUpperCase() == 'RENEGADE') {
          c = site['cargurus.com'].url.view + '#listing=' + j.listings[i].id;
          r += c + '<br>';
          console.log(c);
        }
      }
    }
    //callback(r);
  });
}


site['cars.com'] = {
  url : {},
  param : {},
  f : null
};
site['cars.com'].url.query = 'https://www.cars.com/for-sale/searchresults.action/?';
site['cars.com'].url.view = 'https://www.cars.com/vehicledetail/detail/' + '/overview/'
site['cars.com'].param = {
  mdId : '56807',
  mkId : '20021',
  page : '1',
  perPage : '100',
  rd : '100',
  searchSource : 'PAGINATION',
  'shippable-dealers-checkbox' : 'true',
  showMore : 'false',
  sort : 'relevance',
  stkTypId : '28881',
  zc : '92110',
  localVehicles : 'false'
}
site['cars.com'].f = function (pg_n, callback) {
  console.log('page ' + pg_n);
  site['cars.com'].param['page'] = '' + pg_n;
  param_str = param_builder(site['cars.com'].param);
  var options = {
      url: site['cars.com'].url.query + param_str,
      //url: 'https://www.cars.com/for-sale/searchresults.action',
      headers: {
        'Host' : 'www.cars.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
        'Accept' : '*/*'
    }
  };
  console.log(site['cars.com'].url.query + param_str);
  request(options, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);

    //TODO: Do a linear search rather than splitting
    var a = body.split('\n');
    var aa = -1;
    var j = null;
    for(var i = 0; i < a.length; i++) {
      if(a[i].indexOf('id=\"initial-data\"') > -1) {
        aa = i;
      }
    }

    if(aa > -1) {
      console.log('CARS.COM JSON Found!');
      j = JSON.parse(a[aa+1]);
    }

    callback(j.listings);
    /*
    var r = '';
    var c = '';
    for(k in j) {
      r += k + '<br>';
    }
    callback(j.listings);
    for(var i = 0; i < j.listings.length; i++) {
      if(j.listings[i].makeName.toUpperCase() == 'JEEP') {
        if(j.listings[i].modelName.toUpperCase() == 'RENEGADE') {
          c = site['cargurus.com'].url.view + '#listing=' + j.listings[i].id;
          r += c + '<br>';
          console.log(c);
        }
      }
    }
    */
  });
}




site['autotrader.com'] = {
  url : {},
  param : {},
  f : null
};
site['autotrader.com'].url.query = 'https://www.autotrader.com/cars-for-sale/searchresults.xhtml?';
site['autotrader.com'].url.view = 'https://www.autotrader.com/cars-for-sale/vehicledetails.xhtml?listingId='
site['autotrader.com'].param = {
  'searchRadius' : '100',
  'makeCodeList' : 'JEEP',
  'modelCodeList' : 'JEEPRENEG',
  'zip' : '92103',
  'transmissionCodes' : 'MAN',
  'maxMileage' : '150000',
  'maxPrice' : '20000',
  'sortBy' : 'relevance',
  'numRecords' : '100',
  'firstRecord' : '0',
}
site['autotrader.com'].f = function (pg_n, callback) {
  console.log('page ' + pg_n);
  param_str = param_builder(site['autotrader.com'].param);
  var options = {
      url: site['autotrader.com'].url.query + param_str,
      headers: {
        'Host' : 'www.autotrader.com' ,
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
        'Accept' : '*/*'
    }
  };
  console.log(site['autotrader.com'].url.query + param_str);
  request(options, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    
    var a = body.indexOf('mountRoot(');
    var aa = body.indexOf(');</script>', a);
    var j = JSON.parse(body.substring(a + 'mountRoot('.length, aa));
    var c = null;
    var h = '<head>';
    h += '<style>';
    h += '.cell { margin: 40px; }';
    h += '</style>';
    h += '</head>';
    h += '<html>';
    h += '<h1>Auto Trader</h1>';

    for(var c in j.inventory) {
      c = j.inventory[c];
      h += '<div class="cell">';
      h += 'id: ' + c.id;
      h += '<br>';
      h += '<a href="https://www.autotrader.com/cars-for-sale/vehicledetails.xhtml?listingId=' + c.id + '">Listing Link</a>';
      h += '<br>';
      h += '<img src="' + c.images.sources[0].src + '" width="200">';
      h += '<br>';
      h += 'price: ' + c.pricingDetail.primary;
      h += '<br>';
      h += 'specs: ' + JSON.stringify(c.specifications);
      h += '</div>';
    }

    h += '</html>';
    callback(h);
  });
}





app.get('/scrape', function(req, res){
  //site['cargurus.com'].f(1, function(data) {
  //site['cars.com'].f(1, function(data) {
  site['autotrader.com'].f(1, function(data) {
    res.send(data);
  });
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
