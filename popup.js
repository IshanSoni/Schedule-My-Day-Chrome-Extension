var now = new Date();
var events = [];
var eventNames = [];
var eventAMPM = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("add_button").onclick = function() {
     	document.getElementById("add_button").onclick = function() {
        $("#form").attr('class', 'hide');
        $("#remove_button").attr('class', 'hide');
     	loop();
      }
      $("#form").attr('class', 'show');
      $("#remove_button").attr('class', 'inline');
    }
    
    document.getElementById("remove_button").onclick = function() {
      document.getElementById("form").reset();		
      $("#form").attr('class', 'hide');
      $("#remove_button").attr('class', 'hide');
      document.getElementById("add_button").onclick = function() {
     	document.getElementById("add_button").onclick = function() {
        $("#form").attr('class', 'hide');
        $("#remove_button").attr('class', 'hide');
     	loop();
      }
      $("#form").attr('class', 'show');
      $("#remove_button").attr('class', 'inline');
    }
    }
    
}); 

document.addEventListener('DOMContentLoaded', function() {
    
   //localStorage.clear(); 
    
   if(localStorage.length !== 0) { 
	eventNames = JSON.parse(localStorage.getItem("eventNames"));
	eventAMPM = JSON.parse(localStorage.getItem("eventAMPM")); 
	
	for(var j = 0; j < eventNames.length; j++) {
    	events.push(new Date());
    	events[j].setTime(localStorage[j]);
    } 
	
	
	for(var i = 0; i < eventNames.length; i++) {
		var ul = document.getElementById("add");
        var li = document.createElement("li");
        li.setAttribute("id", i.toString());
        li.appendChild(document.createTextNode(eventNames[i]));
        ul.appendChild(li);
        li.onclick = function() {
          $("#form").attr('class', 'show');
          $("#remove_button").attr('class', 'inline');
          editEntries(this);
        }
	} 
	
	setInterval(function() {
   	for(var i = 0; i < events.length; i++) {
      if(now.getHours() === events[i].getHours() && now.getMinutes() === events[i].getMinutes()) {
      	document.getElementById(i.toString()).innerHTML = "Task Completed";
      	
      if (Notification.permission !== "granted")
        Notification.requestPermission();
      else {
        var notification = new Notification('Notification title', {
           //icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
           body: eventNames[i]
           });
         }
      	
        events.splice(i, 1);
        eventNames.splice(i,1);
      }
      else {
      	now = new Date();
      } }
    }, 1000);
	
	} 
});  

document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
}); 


function pmConverter(s) {
	if (s === "PM") {
		if(document.getElementById("hour").value !== "12") {
		     return (+document.getElementById("hour").value + +12)%24;
	}
		else return 12;
	}
	else {
		if(document.getElementById("hour").value !== "0") {
		     return (+document.getElementById("hour").value)%12;
		}
		else return 12;
	} 
}

function editEntries(li) {
  var index = eventNames.indexOf(li.innerText);	
  document.getElementById("task_name").value = eventNames[index];
  document.getElementById("hour").value = events[index].getHours();
  document.getElementById("hour").value = pmConverter(document.getElementById("AM/PM").value);
  document.getElementById("minute").value = events[index].getMinutes();
  document.getElementById("AM/PM").value = eventAMPM[index];
  
  
  document.getElementById("add_button").value = "Modify";
  document.getElementById("add_button").onclick = function() {
     events[index].setHours(pmConverter(document.getElementById("AM/PM").value));
     events[index].setMinutes(document.getElementById("minute").value);
     eventNames[index] = document.getElementById("task_name").value;  
     eventAMPM[index] = document.getElementById("AM/PM").value;
     
     for(var j = 0; j < events.length; j++) {
    	localStorage[j.toString()] = events[j].getTime();
     } 
   
     localStorage.setItem("eventNames", JSON.stringify(eventNames));
     localStorage.setItem("eventAMPM", JSON.stringify(eventAMPM));
     
     $("#form").attr('class', 'hide'); 
     $("#remove_button").attr('class', 'hide');
     document.getElementById("form").reset();	
     document.getElementById("add_button").value = "+ Add";
     document.getElementById("add_button").onclick = function() {
        document.getElementById("add_button").onclick = function() {
          $("#form").attr('class', 'hide');
          $("#remove_button").attr('class', 'hide');
     	  loop();
         }
        $("#form").attr('class', 'show');
        $("#remove_button").attr('class', 'inline');
    }
     
     setInterval(function() {
   	 for(var i = 0; i < events.length; i++) {
      if(now.getHours() === events[i].getHours() && now.getMinutes() === events[i].getMinutes()) {
      	document.getElementById(i.toString()).innerHTML = "Task Completed";
      	
      	if (Notification.permission !== "granted")
           Notification.requestPermission();
        else {
           var notification = new Notification('Notification title', {
           //icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
           body: eventNames[i]
             }); 
         }
      	
        events.splice(i, 1);
        eventNames.splice(i,1);
      }
      else {
      	now = new Date();
      } }
     }, 1000);
   
 }; 
} 

function loop() {	
	
   var then = new Date(now.getYear(), now.getMonth(), 
                       now.getDate(), 
                       pmConverter(document.getElementById("AM/PM").value), 
                       document.getElementById('minute').value)
   events.push(then);
   eventNames.push(document.getElementById("task_name").value);
   eventAMPM.push(document.getElementById("AM/PM").value)
   
   var ul = document.getElementById("add");
   var li = document.createElement("li");
   li.setAttribute("id", events.length-1);
   li.appendChild(document.createTextNode(document.getElementById("task_name").value));
   ul.appendChild(li);
   li.onclick = function() {
   	  $("#form").attr('class', 'show');
      editEntries(this);
   }
   
   for(var j = 0; j < events.length; j++) {
    	localStorage[j.toString()] = events[j].getTime();
   } 
   
   localStorage.setItem("eventNames", JSON.stringify(eventNames));
   localStorage.setItem("eventAMPM", JSON.stringify(eventAMPM));
   
   document.getElementById("add_button").onclick = function() {
     	document.getElementById("add_button").onclick = function() {
        $("#form").attr('class', 'hide');
        $("#remove_button").attr('class', 'hide');
     	loop();
      }
      $("#form").attr('class', 'show');
      $("#remove_button").attr('class', 'inline');
   } 
   
   document.getElementById("form").reset();	
  
   setInterval(function() {
   	for(var i = 0; i < events.length; i++) {
      if(now.getHours() === events[i].getHours() && now.getMinutes() === events[i].getMinutes()) {
      	document.getElementById(i.toString()).innerHTML = "Task Completed";
      	
      if (Notification.permission !== "granted")
        Notification.requestPermission();
      else {
        var notification = new Notification('Notification title', {
           //icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
           body: eventNames[i]
           });
         }
      	
        events.splice(i, 1);
        eventNames.splice(i,1);
      }
      else {
      	now = new Date();
      } }
   }, 1000);

}