    var myLatlng;
    var userLat;
    var userLong;
    
    var map;
    var points;
    var pointsLength;
    var markers = [];
    
    var dogPoints;
    var dogPointsInfo = [];
    var dogLength;
    var dogMarkers = [];
    var dogPointsAddress = [];
    
    var playgroundPoints;
    var playgroundPointsInfo = [];
    var playgroundLength;
    var playgroundMarkers = [];
    var playgroundPointsAddress = [];
    
    
    var poolPoints;
    var poolPointsInfo = [];
    var poolLength;
    var poolMarkers = [];
    var poolPointsAddress = [];
    
    
    var rinkPoints;
    var rinkPointsInfo = [];
    var rinkLength;
    var rinkMarkers = [];
    var rinkPointsAddress = [];
    
    var firePoints;
    var firePointsInfo = [];
    var fireLength;
    var fireMarkers = [];
    var firePointsAddress = [];
    
    var j;
    
    var instaArray = [];
    var instaArrayCount = [];
    
/***********************************************************************************
INITIALIZE FUNCTION
*************************************************************************************/
	function initialize() {
		$('#myModal').foundation('reveal', 'open'); 
      
/***********************************************************************************
GET STUFF FROM XML
*************************************************************************************/
		if (window.XMLHttpRequest)
			{// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
			}else
				{// code for IE6, IE5
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
					}
		xmlhttp.open("GET","locations330.xml",false);
		xmlhttp.send();
		xmlDoc=xmlhttp.responseXML;

/***********************************************************************************
CREATE ARRAY OF LATLONG VALUES FOR MARKERS 
*************************************************************************************/		
		pointsLength = xmlDoc.getElementsByTagName("locationLat").length;
		
		points = [];
		
		for (var i=0;i<pointsLength;i++){
			points.push(new google.maps.LatLng(xmlDoc.getElementsByTagName("locationLat")[i].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("locationLong")[i].childNodes[0].nodeValue));
			}
		
/***********************************************************************************
CREATE ARRAY OF LATLONG VALUES FOR DOG PARK MARKERS 
*************************************************************************************/	
//!DOG MARKERS	
		dogPoints = [];
		
		dogLength = xmlDoc.getElementsByTagName("FacilityType").length;

		for (var p=0;p<dogLength;p++){
		
		if(xmlDoc.getElementsByTagName("FacilityType")[p].childNodes[0].nodeValue=="Leash-Free Area"){
			x=xmlDoc.getElementsByTagName("FacilityType")[p];			
			y=x.parentNode.parentNode.parentNode.childNodes[7].childNodes[0].nodeValue;
			z=x.parentNode.parentNode.parentNode.childNodes[9].childNodes[0].nodeValue;
			a=x.parentNode.parentNode.parentNode.childNodes[3].childNodes[0].nodeValue;
			b=x.parentNode.parentNode.parentNode.childNodes[5].childNodes[0].nodeValue;			
			dogPoints.push(new google.maps.LatLng(y,z));
			dogPointsInfo.push(a);
			dogPointsAddress.push(b);
			}//if end
		}//for end
/***********************************************************************************
CREATE ARRAY OF FOR PLAYGROUND MARKERS
*************************************************************************************/
		playgroundPoints = [];
		
		playgroundLength = xmlDoc.getElementsByTagName("FacilityType").length;

		for (var p=0;p<playgroundLength;p++){
		
		if(xmlDoc.getElementsByTagName("FacilityType")[p].childNodes[0].nodeValue=="Playground"){
			x=xmlDoc.getElementsByTagName("FacilityType")[p];			
			y=x.parentNode.parentNode.parentNode.childNodes[7].childNodes[0].nodeValue;
			z=x.parentNode.parentNode.parentNode.childNodes[9].childNodes[0].nodeValue;
			a=x.parentNode.parentNode.parentNode.childNodes[3].childNodes[0].nodeValue;
			b=x.parentNode.parentNode.parentNode.childNodes[5].childNodes[0].nodeValue;			
			playgroundPoints.push(new google.maps.LatLng(y,z));
			playgroundPointsInfo.push(a);
			playgroundPointsAddress.push(b);
			}//if end
		}//for end
		
		
/***********************************************************************************
CREATE ARRAY OF FOR POOL MARKERS
*************************************************************************************/
		poolPoints = [];
		
		poolLength = xmlDoc.getElementsByTagName("FacilityType").length;
		
		for (var p=0;p<poolLength;p++){
		
		if(xmlDoc.getElementsByTagName("FacilityType")[p].childNodes[0].nodeValue=="Pool-Wading"){
			x=xmlDoc.getElementsByTagName("FacilityType")[p];			
			y=x.parentNode.parentNode.parentNode.childNodes[7].childNodes[0].nodeValue;
			z=x.parentNode.parentNode.parentNode.childNodes[9].childNodes[0].nodeValue;
			a=x.parentNode.parentNode.parentNode.childNodes[3].childNodes[0].nodeValue;
			b=x.parentNode.parentNode.parentNode.childNodes[5].childNodes[0].nodeValue;			
			poolPoints.push(new google.maps.LatLng(y,z));
			poolPointsInfo.push(a);
			poolPointsAddress.push(b);
			}//if end
		}//for end

/***********************************************************************************
CREATE ARRAY OF FOR RINK MARKERS
*************************************************************************************/
		rinkPoints = [];
		
		rinkLength = xmlDoc.getElementsByTagName("FacilityType").length;

		for (var p=0;p<rinkLength;p++){	
			if(xmlDoc.getElementsByTagName("FacilityType")[p].childNodes[0].nodeValue=="Rink-Outdoor"){
				x=xmlDoc.getElementsByTagName("FacilityType")[p];			
				y=x.parentNode.parentNode.parentNode.childNodes[7].childNodes[0].nodeValue;
				z=x.parentNode.parentNode.parentNode.childNodes[9].childNodes[0].nodeValue;	
				a=x.parentNode.parentNode.parentNode.childNodes[3].childNodes[0].nodeValue;		
				b=x.parentNode.parentNode.parentNode.childNodes[5].childNodes[0].nodeValue;			
				
				rinkPoints.push(new google.maps.LatLng(y,z));
				rinkPointsInfo.push(a);
				rinkPointsAddress.push(b);
			}//if end
		}//for end

/***********************************************************************************
CREATE ARRAY OF FOR fire MARKERS
*************************************************************************************/
		firePoints = [];
		
		fireLength = xmlDoc.getElementsByTagName("FacilityType").length;

		for (var p=0;p<fireLength;p++){
		
			if(xmlDoc.getElementsByTagName("FacilityType")[p].childNodes[0].nodeValue=="Firepit"){
				x=xmlDoc.getElementsByTagName("FacilityType")[p];			
				y=x.parentNode.parentNode.parentNode.childNodes[7].childNodes[0].nodeValue;
				z=x.parentNode.parentNode.parentNode.childNodes[9].childNodes[0].nodeValue;
				a=x.parentNode.parentNode.parentNode.childNodes[3].childNodes[0].nodeValue;
				b=x.parentNode.parentNode.parentNode.childNodes[5].childNodes[0].nodeValue;			
	
				firePoints.push(new google.maps.LatLng(y,z));
				firePointsInfo.push(a);
				firePointsAddress.push(b);
	
				}//if end
		}//for end
		
/***********************************************************************************
CREATE ARRAY OF LATLONG VALUES FOR DISTANCE MEASUREMENT
*************************************************************************************/			
		
		var latPoints = [];
		var longPoints = [];
		
		for (var k=0;k<pointsLength;k++){
			latPoints.push(xmlDoc.getElementsByTagName("locationLat")[k].childNodes[0].nodeValue);
			longPoints.push(xmlDoc.getElementsByTagName("locationLong")[k].childNodes[0].nodeValue);
			
		}
		
		var geo_options = {
		enableHighAccuracy: true, // only use if you really think you need best quality
		maximumAge: 0, //best to include to clear out cache
		timeout: 45000 // don't want to waste too much time if problems
		};//geo_options end
      
/***********************************************************************************
GET USER LOCATION
*************************************************************************************/
      if (window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mapLocation,errorCallback,geo_options);
        } else {
        	alert('Your browser does not natively support geolocation.');
        	}

/***********************************************************************************
POPULATE MAP WITH MARKERS 
*************************************************************************************/
  			
		function mapLocation(position){
  			
	  		myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
	  		/* myLatlng = new google.maps.LatLng(43.70675, -79.398322); */
	  		
	  		userLat = position.coords.latitude;
	  		userLong = position.coords.longitude; 

			/*
			userLat = 43.70675; 
			userLong = -79.398322; 
			*/
	  		
	        var mapOptions = {
	          center: myLatlng,
	          zoom: 13,
	          mapTypeId: google.maps.MapTypeId.ROADMAP
	        };
	  
	        map = new google.maps.Map(document.getElementById("map-canvas"),
	            mapOptions);
	
	        var userMarker = new google.maps.Marker({
		        position: myLatlng,
		        map: map,
		        title:"You are Here!",
		    }); 
		    
		    userMarker.setAnimation(google.maps.Animation.BOUNCE);  
		    
            for(var j=0;j<pointsLength;j++){
          
	            var parkInfowindow = new google.maps.InfoWindow({
		        });
	            
	            var parkMarker = new google.maps.Marker({
		            position: points[j],
			        map: map
	            });
	            
	            markers.push(parkMarker);  
	            var locationName = xmlDoc.getElementsByTagName("LocationName")[j].childNodes[0].nodeValue;
	            var locationAddress = xmlDoc.getElementsByTagName("Address")[j].childNodes[0].nodeValue;
	
	            var instaTag=locationName.replace(/\s+/g, "");
			    instaTag = instaTag.replace(/\./g, "");
			    instaTag = instaTag.replace(/-/g, "");
			    instaTag = instaTag.replace(/'/g, "");
			    instaTag = instaTag.replace(/\(/g, "");
			    instaTag = instaTag.replace(/\)/g, "");
			    instaTag = instaTag.replace(/\//g, "");
			    instaTag = instaTag.replace(/\&/g, "");
			    var m = "\'"+instaTag+"\'";
			    var p = "\'"+locationName+"\'";
			    var q = "\'"+locationAddress+"\'";
			    
			    var link = "<a onclick=\"tabButtonClick(" + m + ',' +  p+ ',' + q + ")\">"+ locationName + "</a>";                   
	           // var link = "<a href=\"#anchor\" onclick=\"tabButtonClick(" + m + ',' +  p+ ',' + q + ")\">"+ locationName + "</a>";
	            
	            parkMarker.html = link + '<br>' + xmlDoc.getElementsByTagName("Address")[j].childNodes[0].nodeValue;
	            
	            google.maps.event.addListener(parkMarker, 'click', function() {
			    parkInfowindow.setContent(this.html);
			    parkInfowindow.open(map,this);
			    });
	            
	            }//for loop end
            
/***********************************************************************************
DISTANCE RESULTS USING HAVERSINE
*************************************************************************************/
//!parks by distance 


			var myLocationLat = position.coords.latitude;
			var myLocationLong = position.coords.longitude;

			/*
var myLocationLat = 43.70675;
			var myLocationLong = -79.398322;
*/			
			
			var jsonDistanceObjectArray = [];
			
			for (var l=0; l<pointsLength; l++){
			
				Number.prototype.toRad = function() {
					return this * Math.PI / 180;
					}
																		
				var lat2toFloat = parseFloat(latPoints[l]); 
				var lon2toFloat = parseFloat(longPoints[l]); 
				var lat2 = lat2toFloat; 
				var lon2 = lon2toFloat; 
				var lat1 = myLocationLat; 
				var lon1 = myLocationLong; 
				
				var R = 6371; // km 
				var x1 = lat2-lat1;
				var dLat = x1.toRad();  
				var x2 = lon2-lon1;
				var dLon = x2.toRad();  
				var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
				                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
				                Math.sin(dLon/2) * Math.sin(dLon/2);  
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
				var d = R * c;

				var dRounded = Math.round( d * 10 ) / 10;				
				jsonDistanceObjectArray.push({ "name" : xmlDoc.getElementsByTagName("LocationName")[l].childNodes[0].nodeValue, "address" : xmlDoc.getElementsByTagName("Address")[l].childNodes[0].nodeValue, "distance": dRounded+" km"});

				var target = document.getElementById('nearby'); 
				} //for l loop end 
					
/***********************************************************************************
SORTING JAVASCRIPT
*************************************************************************************/

			var sort_by = function(field, reverse, primer){
				var key = function (x) {return primer ? primer(x[field]) : x[field]};
						return function (a,b) {
							var A = key(a), B = key(b);
							return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];                  
							}
						}
			// Sort by distance closest to farthest
			jsonDistanceObjectArray.sort(sort_by('distance', true, parseInt));
			var u1 = document.getElementById('u1');
			for (var i=0; i<4; i++) {
				u1.innerHTML += '<li>'+jsonDistanceObjectArray[i].name + '<br>' +  jsonDistanceObjectArray[i].address+ '<br>' +'<p id="pNearby"><a class="small button">'+jsonDistanceObjectArray[i].distance+'</a></p>'+ '<br>' + '</li>';  
			}
/***********************************************************************************
MAP LOCATION END 
*************************************************************************************/  
		    }//mapLocation end 

/***********************************************************************************
INITIALIZE FUNCTION END 
*************************************************************************************/		    
      }//initialize end 

/***********************************************************************************
ADD MAP LISTENER
*************************************************************************************/		    
      
      google.maps.event.addDomListener(window, 'load', initialize);

/***********************************************************************************
ERROR CALLBACK
*************************************************************************************/		          
      function errorCallback(error) {
        // There was a problem getting the location
      }

//!BUTTONCLICKS
/***********************************************************************************
BUTTON CLICKS
*************************************************************************************/		      

	// Sets the map on all markers in the array.
	function setAllMap(map) {
		for (var r = 0; r < markers.length; r++) {
		  markers[r].setMap(map);
		}
		
		for (var s = 0; s < dogMarkers.length; s++) {
		  dogMarkers[s].setMap(map);
		}
		
		for (var s = 0; s < playgroundMarkers.length; s++) {
		  playgroundMarkers[s].setMap(map);
		}
		
		for (var s = 0; s < poolMarkers.length; s++) {
		  poolMarkers[s].setMap(map);
		}
		
		for (var s = 0; s < rinkMarkers.length; s++) {
		  rinkMarkers[s].setMap(map);
		}
		
		for (var s = 0; s < fireMarkers.length; s++) {
		  fireMarkers[s].setMap(map);
		}	
	}
//!dog button 
	function dogButtonClick(){
		setAllMap(null);
	
		for(var s=0;s<dogPoints.length;s++){
	
		var dogInfowindow = new google.maps.InfoWindow({
		});
		
		var dogMarker = new google.maps.Marker({
		    position: dogPoints[s],
		    map: map
		});
		dogMarkers.push(dogMarker);
		
		var instaTag=dogPointsInfo[s].replace(/\s+/g, "");
		instaTag = instaTag.replace(/\./g, "");
		instaTag = instaTag.replace(/-/g, "");
		instaTag = instaTag.replace(/'/g, "");
		instaTag = instaTag.replace(/\(/g, "");
		instaTag = instaTag.replace(/\)/g, "");
		instaTag = instaTag.replace(/\//g, "");
		instaTag = instaTag.replace(/\&/g, "");
		console.log(instaTag);
	
		var m = "\'"+instaTag+"\'";
		var p = "\'"+dogPointsInfo[s]+"\'";
		var q = "\'"+dogPointsAddress[s]+"\'";
		console.log(dogPointsAddress);
		
		var link = "<a onclick=\"tabButtonClick(" + m + ',' +  p+ ',' + q + ")\">"+ dogPointsInfo[s] +"</a>";
			
		dogMarker.html = link + "<br>" + dogPointsAddress[s];
		
		google.maps.event.addListener(dogMarker, 'click', function() {
		dogInfowindow.setContent(this.html);
		dogInfowindow.open(map,this);
		});
		}//for end
	}//dogButtonClick end

//!playground button click      
	function playgroundButtonClick(){
		setAllMap(null); 
		
		for(var s=0;s<playgroundPointsInfo.length;s++){
		
			var playgroundInfowindow = new google.maps.InfoWindow({
			});
			            
			var playgroundMarker = new google.maps.Marker({
			position: playgroundPoints[s],
			map: map
			});
			
			playgroundMarkers.push(playgroundMarker);
			
			var instaTag=playgroundPointsInfo[s].replace(/\s+/g, "");
			instaTag = instaTag.replace(/\./g, "");
			instaTag = instaTag.replace(/-/g, "");
			instaTag = instaTag.replace(/'/g, "");
			instaTag = instaTag.replace(/\(/g, "");
			instaTag = instaTag.replace(/\)/g, "");
			instaTag = instaTag.replace(/\//g, "");
			instaTag = instaTag.replace(/\&/g, "");
			console.log(instaTag);
			
			var m = "\'"+instaTag+"\'";
			var p = "\'"+playgroundPointsInfo[s]+"\'";
			var q = "\'"+playgroundPointsAddress[s]+"\'";
			
			var link = "<a onclick=\"tabButtonClick(" + m + ',' +  p+ ',' + q + ")\">"+ playgroundPointsInfo[s] +"</a>";
			
			playgroundMarker.html = link + "<br>" + playgroundPointsAddress[s];
			
			google.maps.event.addListener(playgroundMarker, 'click', function() {
			playgroundInfowindow.setContent(this.html);
			playgroundInfowindow.open(map,this);
			});
		}//for loop endconso
	}
//!pool button click      
	function poolButtonClick(){
	setAllMap(null);
		      
	for(var s=0;s<poolLength;s++){
	
		var poolInfowindow = new google.maps.InfoWindow({
		});
		
		var poolMarker = new google.maps.Marker({
		    position: poolPoints[s],
		    map: map
		});
		poolMarkers.push(poolMarker);
		
		var instaTag=poolPointsInfo[s].replace(/\s+/g, "");
		instaTag = instaTag.replace(/\./g, "");
		instaTag = instaTag.replace(/-/g, "");
		instaTag = instaTag.replace(/'/g, "");
		instaTag = instaTag.replace(/\(/g, "");
		instaTag = instaTag.replace(/\)/g, "");
		instaTag = instaTag.replace(/\//g, "");
		instaTag = instaTag.replace(/\&/g, "");
		console.log(instaTag);
		
		var m = "\'"+instaTag+"\'";
		var p = "\'"+poolPointsInfo[s]+"\'";
		var q = "\'"+poolPointsAddress[s]+"\'";
		
		var link = "<a onclick=\"tabButtonClick(" + m + ',' +  p+ ',' + q + ")\">"+ poolPointsInfo[s] +"</a>";
		
		poolMarker.html = link + "<br>" + poolPointsAddress[s];
		
		google.maps.event.addListener(poolMarker, 'click', function() {
		poolInfowindow.setContent(this.html);
		poolInfowindow.open(map,this);
		});
		}//for end
	}
//!rink button click      
	function rinkButtonClick(){
	setAllMap(null);
	for(var s=0;s<rinkLength;s++){
	
		var rinkInfowindow = new google.maps.InfoWindow({
		});
		
		var rinkMarker = new google.maps.Marker({
		position: rinkPoints[s],
		map: map
		});
		rinkMarkers.push(rinkMarker);
		
		var instaTag=rinkPointsInfo[s].replace(/\s+/g, "");
		instaTag = instaTag.replace(/\./g, "");
		instaTag = instaTag.replace(/-/g, "");
		instaTag = instaTag.replace(/'/g, "");
		instaTag = instaTag.replace(/\(/g, "");
		instaTag = instaTag.replace(/\)/g, "");
		instaTag = instaTag.replace(/\//g, "");
		instaTag = instaTag.replace(/\&/g, "");
		console.log(instaTag);
		
		var m = "\'"+instaTag+"\'";
		var p = "\'"+rinkPointsInfo[s]+"\'";
		var q = "\'"+rinkPointsAddress[s]+"\'";
		
		var link = "<a onclick=\"tabButtonClick(" + m + ',' +  p+ ',' + q + ")\">"+ rinkPointsInfo[s] +"</a>";
		
		rinkMarker.html = link + "<br>" +rinkPointsAddress[s];
		
		google.maps.event.addListener(rinkMarker, 'click', function() {
		rinkInfowindow.setContent(this.html);
		rinkInfowindow.open(map,this);
		});
		}
	}
//!fire button click      
	function fireButtonClick(){
	setAllMap(null);
	
	for(var s=0;s<fireLength;s++){
		
		var fireInfowindow = new google.maps.InfoWindow({
		});
		
		var fireMarker = new google.maps.Marker({
		position: firePoints[s],
		map: map
		});
		fireMarkers.push(fireMarker);
		
		var instaTag=firePointsInfo[s].replace(/\s+/g, "");
		instaTag = instaTag.replace(/\./g, "");
		instaTag = instaTag.replace(/-/g, "");
		instaTag = instaTag.replace(/'/g, "");
		instaTag = instaTag.replace(/\(/g, "");
		instaTag = instaTag.replace(/\)/g, "");
		instaTag = instaTag.replace(/\//g, "");
		instaTag = instaTag.replace(/\&/g, "");
		console.log(instaTag);
		
		var locationAddress = xmlDoc.getElementsByTagName("Address")[s].childNodes[0].nodeValue;
		
		var m = "\'"+instaTag+"\'";
		var p = "\'"+firePointsInfo[s]+"\'";
		var q = "\'"+firePointsAddress[s]+"\'";
		
		var link = "<a onclick=\"tabButtonClick(" + m + ',' +  p+ ',' + q + ")\">"+ firePointsInfo[s] +"</a>";
		
		fireMarker.html = link + "<br>" +firePointsAddress[s];
		
		google.maps.event.addListener(fireMarker, 'click', function() {
		fireInfowindow.setContent(this.html);
		fireInfowindow.open(map,this);
		});
		}
	}
//!instaAnchor      
	function allButtonClick(){
		setAllMap(null);
		alert("hi");
		initialize();
	}      
      
	function tabButtonClick(instaTag, parkName, parkAddress) {
	var myVar=setInterval(function(){myTimer()},1000);
	function myTimer()
		{	
		fakeClick(event, document.getElementById('link'))
		clearInterval(myVar);
		}	  
	$("#anchor").empty();
	$("#anchor").append('<h4>'+parkName+'</h4>');
	$("#anchor").append('<a href="http://maps.google.com/maps?saddr='+userLat + ',' + userLong + '&daddr='+parkAddress+ ',Toronto,Canada' + '" target="_blank"><p>'+parkAddress+ ' (click for directions)' + '</p></a>'); 	
			    
	var tag = instaTag;
	var count = 6;
	var access_token = '22033045.ea9028a.eec94286a2e049429fe51c3fbc95db20';
	var access_parameters = {access_token:access_token};	//this creates a JSON Object
	
	function grabImages(access_parameters) {  
		var instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count='+ count;
		$.getJSON(instagramUrl, access_parameters, onDataLoaded);
		}
	
	function onDataLoaded(instagram_data) {  
		if(instagram_data.meta.code == 200) {
			var photos = instagram_data.data;
			if(photos.length > 0) {
				for (var key in photos ){
					var photo = photos[key];
					$("#anchor").append('<div class="instaPic"><img src ="' + photo.images.low_resolution.url +'"></div>');
					}
					}
					else {
						$("#anchor").append('<div><img src="cat.jpg"></div>');
	
						}
						}else{
							var error = data.meta.error_message;
							}
							}
	grabImages(access_parameters);
	}//tabbuttonend
