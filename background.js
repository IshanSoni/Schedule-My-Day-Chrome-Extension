//background script
//checks for event timings and sets off the alarm+notification

    var now = new Date();
    var events = [];
    var eventNames = [];
    var eventAMPM = [];
    var audio = new Audio('reminder.mp3');
    
    //gets events from local storage upon startup
   if(localStorage.length !== 0) {
	eventNames = JSON.parse(localStorage.getItem("eventNames"));
	eventAMPM = JSON.parse(localStorage.getItem("eventAMPM")); 
	
	for(var j = 0; j < eventNames.length; j++) {
    	events.push(new Date());
    	events[j].setTime(localStorage[j]);
    } 	
 } 
 
   //alarm system. removes events upon completetion, plays notifications and sound
   setInterval(function() {
    if(events.length !== 0) {
   	for(var i = 0; i < eventNames.length; i++) {
      if(now.getHours() === events[i].getHours() && now.getMinutes() === events[i].getMinutes()) {
  
      if (Notification.permission !== "granted")
        Notification.requestPermission();
      else {
           var notification = new Notification(eventNames[i], {
           icon: 'reminder.jpg',
           body: "Please rate this app if you enjoy it :)"
           });
         }
      	audio.play();
      	
      	notification.onclose = function() { 
      		audio.pause(); 
      		audio.currentTime = 0;
      		};
      	
      	//add rating link	
      	/*notification.onclick = function(event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.open('http://www.mozilla.org', '_blank');
          }; */
      	
        events.splice(i, 1);
        eventNames.splice(i,1);
        eventAMPM.splice(i,1);
        
        for(var j = 0; j < events.length; j++) {
    	  localStorage[j.toString()] = events[j].getTime();
        } 
   
        localStorage.setItem("eventNames", JSON.stringify(eventNames));
        localStorage.setItem("eventAMPM", JSON.stringify(eventAMPM));
      }
      else {
      	//alert("hi");
      	now = new Date();
      } }
      }
      
      eventNames = JSON.parse(localStorage.getItem("eventNames"));
	  eventAMPM = JSON.parse(localStorage.getItem("eventAMPM")); 
	
	  for(var j = 0; j < eventNames.length; j++) {
    	events.push(new Date());
    	events[j].setTime(localStorage[j]);
      } 
      
   }, 1000); 
   
 
  
    