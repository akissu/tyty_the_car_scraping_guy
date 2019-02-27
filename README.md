cargurus.com
There is a github project that uses selenium:
https://gist.github.com/yuangaonyc/357ea1ecb86455a0618655fafff34c3f

If you wanna use nodejs:
https://scotch.io/tutorials/scraping-the-web-with-node-js

If you wanna use Python then use:
http://phantomjs.org/

You can infer much from a regular curl call:
curl "https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePageModel&entitySelectingHelper.selectedEntity=d2268&zip=92116" 

professional-penguin% curl "https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePageModel&entitySelectingHelper.selectedEntity=d2268&zip=92116" | grep "itemprop=\"name\""      
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0            <span itemprop="name">2016 Jeep Renegade Trailhawk 4WD</span>
            <span itemprop="name">2016 Jeep Renegade Trailhawk 4WD</span>
            <span itemprop="name">2018 Jeep Renegade Latitude</span>
            <span itemprop="name">2018 Jeep Renegade Latitude</span>
            <span itemprop="name">2016 Jeep Renegade Latitude</span>
            <span itemprop="name">2016 Jeep Renegade Latitude 75th Anniversary</span>
            <span itemprop="name">2017 Jeep Renegade Limited 4WD</span>
            <span itemprop="name">2017 Jeep Renegade Latitude</span>
            <span itemprop="name">2017 Jeep Renegade Latitude</span>
            <span itemprop="name">2017 Jeep Renegade Latitude</span>
            <span itemprop="name">2015 Jeep Renegade Latitude</span>
            <span itemprop="name">2015 Jeep Renegade Latitude</span>
            <span itemprop="name">2016 Jeep Renegade Trailhawk 4WD</span>
            <span itemprop="name">2016 Jeep Renegade Latitude</span>
            <span itemprop="name">2015 Jeep Renegade Sport</span>
100  376k    0  376k    0     0   908k      0 --:--:-- --:--:-- --:--:--  908k

But you can't get the direct links to the listings because the listing id's (ie: 230526314) are resolved via JS.

THERE'S AN API!
curl 'https://www.cargurus.com/Cars/inventorylisting/ajaxFetchSubsetInventoryListing.action?sourceContext=carGurusHomePageModel' -H 'cookie: CarGurusUserT=y746-68.107.35.90.1547370571677; _ga=GA1.2.1317681896.1547370573; cto_lwid=7ee137b9-bb20-4ff9-8ff9-a1db2d817b77; _gcl_au=1.1.650536976.1547370573; LSW=www02; _fbp=fb.1.1549587937581.141988619; preferredContactInfo=Y2l0eT1TYW4gRGllZ28qcG9zdGFsQ29kZT05MjExNipzdGF0ZT1DQSpjb3VudHJ5PVVTKmhvbWVQb3N0YWxDb2RlPTkyMTE2Kg__; autoFinanceCalculatorData=%7B%22creditScore%22%3A%22GOOD%22%2C%22downPayment%22%3A0%2C%22interestRateApr%22%3A4.4%2C%22loanTermMonths%22%3A60%2C%22salesTaxRate%22%3A0%2C%22tradeInValue%22%3A0%2C%22manualMode%22%3Afalse%7D; __lc.visitor_id.8494063=S1549589211.d03c076d76; ViewVersion=%7B%22en%22%3A%7B%22include%22%3A%22be87a262-e3b8-4cc7-9500-2ee3551dd438%22%2C%22type%22%3A%22IN%22%7D%7D; _gid=GA1.2.180584739.1550301613; pastListingSearches="{@s@:@USED@,@d@:50,@t@:1550293200000,@e@:@d2268@,@y1@:0,@y2@:0,@z@:@92116@,@l@:@en@}/{@s@:@USED@,@d@:50,@t@:1550293200000,@e@:@d290@,@z@:@92116@,@l@:@en@}/{@s@:@USED@,@d@:50,@t@:1550293200000,@e@:@d196@,@z@:@92116@,@l@:@en@}/{@s@:@USED@,@d@:50,@t@:1550293200000,@e@:@d490@,@z@:@92116@,@l@:@en@}/{@s@:@USED@,@d@:100,@t@:1550293200000,@e@:@d2650@,@l@:@en@}/"; lc_sso8494063=1550302102590; JSESSIONID=F66925EF13AD9373A58098CDF59E7954.www02; listingsSinceLastVisit=%7B%22d196%22%3A%7B%22lastVisitDateMs%22%3A1549588265339%2C%22dateMs%22%3A1549588265339%7D%2C%22d490%22%3A%7B%22lastVisitDateMs%22%3A1549588117290%2C%22dateMs%22%3A1549588117290%7D%2C%22d2650%22%3A%7B%22lastVisitDateMs%22%3A1549587934831%2C%22dateMs%22%3A1549587934831%7D%2C%22d290%22%3A%7B%22lastVisitDateMs%22%3A1549589028099%2C%22dateMs%22%3A1549589208802%7D%2C%22d2268%22%3A%7B%22lastVisitDateMs%22%3A1550301714128%2C%22dateMs%22%3A1550307887248%7D%7D; _sp_ses.df9a=*; cargurusGeoLocation=32.7664%3A-117.129%3ASan+Diego%2C+CA; _dc_gtm_UA-4745999-1=1; _gat_UA-4745999-1=1; _gat=1; baseZip_asOf=92116_1550308975420; _sp_id.df9a=745daeae-02ec-4d9d-8a3a-eaf7840eef0b.1547370573.4.1550308981.1550303065.c222b290-1284-4b64-8997-64082d472214' -H 'origin: https://www.cargurus.com' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-US,en;q=0.9' -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/71.0.3578.98 Chrome/71.0.3578.98 Safari/537.36' -H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' -H 'accept: application/json, text/javascript, */*; q=0.01' -H 'referer: https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePageModel&entitySelectingHelper.selecte%20dEntity=d2268&zip=92116' -H 'authority: www.cargurus.com' -H 'x-requested-with: XMLHttpRequest' -H 'dnt: 1' --data 'zip=92116&address=San+Diego%2C+CA&latitude=32.76639938354492&longitude=-117.12899780273438&distance=50&selectedEntity=&entitySelectingHelper.selectedEntity2=&minPrice=&maxPrice=&minMileage=&maxMileage=&transmission=ANY&bodyTypeGroup=&serviceProvider=&page=1&filterBySourcesString=&filterFeaturedBySourcesString=&displayFeaturedListings=true&searchSeoPageType=&inventorySearchWidgetType=AUTO&allYearsForTrimName=false&daysOnMarketMin=&daysOnMarketMax=&vehicleDamageCategoriesRaw=&minCo2Emission=&maxCo2Emission=&vatOnly=false&minEngineDisplacement=&maxEngineDisplacement=&minMpg=&maxMpg=&minEnginePower=&maxEnginePower=&isRecentSearchView=false' --compressed


curl 'https://www.cargurus.com/Cars/inventorylisting/ajaxFetchSubsetInventoryListing.action?sourceContext=carGurusHomePageModel' -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/71.0.3578.98 Chrome/71.0.3578.98 Safari/537.36' --data 'zip=92116&address=San+Diego%2C+CA&latitude=32.76639938354492&longitude=-117.12899780273438&distance=50&selectedEntity=&entitySelectingHelper.selectedEntity2=&minPrice=&maxPrice=&minMileage=&maxMileage=&transmission=ANY&bodyTypeGroup=&serviceProvider=&page=1&filterBySourcesString=&filterFeaturedBySourcesString=&displayFeaturedListings=true&searchSeoPageType=&inventorySearchWidgetType=AUTO&allYearsForTrimName=false&daysOnMarketMin=&daysOnMarketMax=&vehicleDamageCategoriesRaw=&minCo2Emission=&maxCo2Emission=&vatOnly=false&minEngineDisplacement=&maxEngineDisplacement=&minMpg=&maxMpg=&minEnginePower=&maxEnginePower=&isRecentSearchView=false' --compressed


param['selectedEntity'] = 'd2268'; //Is the value of the car


CARS.COM
Server-side Embeds initial json directly into the HTML. I believe it gets deleted once it's processed

https://www.cars.com/for-sale/searchresults.action/?mdId=56807&mkId=20021&rd=100&searchSource=QUICK_FORM&stkTypId=28881&zc=92110
https://www.cars.com/for-sale/searchresults.action/?mdId=56807&mkId=20021&page=1&perPage=100&rd=100&searchSource=PAGINATION&shippable-dealers-checkbox=true&showMore=false&sort=relevance&stkTypId=28881&zc=92110&localVehicles=false

curl 'https://www.cars.com/for-sale/searchresults.action/?mdId=56807&mkId=20021&rd=100&searchSource=QUICK_FORM&stkTypId=28881&zc=92110' -H 'authority: www.cars.com' -H 'cache-control: max-age=0' -H 'upgrade-insecure-requests: 1' -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/71.0.3578.98 Chrome/71.0.3578.98 Safari/537.36' -H 'dnt: 1' -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' -H 'referer: https://www.cars.com/for-sale/searchresults.action/?mdId=56807&mkId=20021&rd=100&searchSource=QUICK_FORM&stkTypId=28881&zc=92110' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-US,en;q=0.9' -H 'cookie: BIGipServercars_sites_www=541136044.21791.0000; rollout=15; akaas_all_abtest=1551511476~rv=65~id=f4bd5d6287d0cd8ca0eea5950428f9b7~rn=fly-pct; _gcl_au=1.1.1502350961.1550346919; _ga=GA1.2.77051686.1550346919; _gid=GA1.2.1479977685.1550346919; Registration=currentUserId:7nu61vFBOYYpEMCXmJkMG9v515MD7dzoiXNHUGxb7V0zzCSC+vG4Dn8LiE18+LZpORJBGBFfu58/8zLi6tD4/Y0N6zdYgESw; returningUser=1550346919410; CarsVisitor=%7B%22pcid%22%3A%22null%22%2C%22pdid%22%3A%221356307350465554225412688016935332%22%7D; BIGipServercars_docker_userprofiles_prd=4248966316.17439.0000; ak_bmsc=A868B02F041934DF632FF54C8C2DC28746BA1B536A7D0000A66A685CD322912B~plS8elwnomyHMwAad7B9pF3brBda6ffXr/KKdW0nABqExgitaxJfweR65KM5xgZ4ETVYYvvle8SRRhoY4FArTertliA/b1ou/BAMim7iCbMxF1EDroOTiv07H3mJ2L8YTm3IVgWUQiN4FGg51PBR2lpqkz/0mUoCXDHNr0ibgPFu7Cw33s/I2+PdRbCbHJMxgMflGrceePBepjeAafMGzXLp7XXMV7jWBLDVXh20WBg8PAIjUN5nsm4r1rzbpRwk2a; WRIgnore=true; BIGipServerapi.inbound=406918316.10531.0000; s_lv_s=First%20Visit; s_fid=56A27C9B16AD7A82-16B4E850C535B497; s_cc=true; _fbp=fb.1.1550346920444.124718596; s_vi=[CS]v1|2E34355405037DCA-4000119320000A02[CE]; di_roxanne[visit_id]=766921571; di_roxanne[visitor_id]=1301509022; BIGipServercars_composite=2604733612.23296.0000; searchByPayment=false; ADRUM=s=1550346937599&r=https%3A%2F%2Fwww.cars.com%2F%3F0; affiliate=national; zipcode=92110; BIGipServercars_docker_rendering_prd=4232189100.15109.0000; BIGipServercars_dockercomposite_configapi_prd=776213676.35875.0000; __sonar__se=35; catRetarget=crossover_compact; stockCert=U|false; SessionInfo=mkid%3D0%7Cmknm%3DJeep%7Cmdid%3D0%7Cmdnm%3DRenegade%7C; zipcode=92110; rd=100; adZoneInfo=92110|sd_south|sandiego; adCatInfo=Jeep|Renegade|crossover_compact; QSI_HistorySession=https%3A%2F%2Fwww.cars.com%2F~1550346920456%7Chttps%3A%2F%2Fwww.cars.com%2Ffor-sale%2Fsearchresults.action%2F%3FmdId%3D56807%26mkId%3D20021%26rd%3D100%26searchSource%3DQUICK_FORM%26stkTypId%3D28881%26zc%3D92110~1550346939703; CarsSidCookie=1355911209652994964858856925277276; s_lv=1550346963297; __CT_Data=gpv=3&ckp=tld&dm=cars.com&apv_355_www06=3&cpv_355_www06=3; _td=376df673-bfbf-4a84-ab95-6a4416fd8fa5; smtrrmkr=636859437693670477%5Ebebb19c8-2432-e911-8185-957ce8afc6e1%5Ebfbb19c8-2432-e911-8185-957ce8afc6e1%5E0%5E68.107.35.90; bm_sv=F2AAAEDC58B9018422C87BC56638EC03~Y6PMCzkmM/tYwSjLlXcEQSwSg3ICxRUe6VB14ZLU+RV6lFEhpmXghP2UG/5TqdROe6VN/kn/sA15Kfx4ftawGuaXeMYD/EmTjprVTFSCRwHSCUOKR9Rbiq+8PzsV+fDNRTXXcBMX5dIG5WvRjGIZNH864M7dDs2IrjLN/Y+Lxdw=' --compressed | grep -A1 initial-data

curl 'https://www.cars.com/for-sale/searchresults.action/?mdId=56807&mkId=20021&rd=100&searchSource=QUICK_FORM&stkTypId=28881&zc=92110' --compressed | grep -A1 initial-data


AUTOTRADER.COM
https://www.autotrader.com/cars-for-sale/searchresults.xhtml?makeCodeList=JEEP&modelCodeList=JEEPRENEG&zip=92103

https://www.autotrader.com/cars-for-sale/vehicledetails.xhtml?listingId=505967271

