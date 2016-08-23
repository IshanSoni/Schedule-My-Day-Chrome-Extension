var now = new Date();
var events = [];
var eventNames = [];
var eventAMPM = [];

//sets onclick events for add button, X button, and modify button
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
    
    addEventListener("unload", function (event) {
      alert("yes");
    }, true);
    
}); 

//gets events from localstorage and sets them as lists on popup
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
	
	} 
});  

//checks if notification is available on the browser
document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in this version. Upgrade Chrome.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
}); 

//function to convert 24 hour time into 12 hour
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

//this function handles modifications when user modifies an entry
function editEntries(li) {
	
  var index = eventNames.indexOf(li.innerText);	
  document.getElementById("task_name").value = eventNames[index];
  document.getElementById("hour").value = events[index].getHours();
  document.getElementById("hour").value = pmConverter(document.getElementById("AM/PM").value);
  document.getElementById("minute").value = events[index].getMinutes();
  document.getElementById("AM/PM").value = eventAMPM[index];
  
  document.getElementById("remove_button").value = "Delete";	
  document.getElementById("remove_button").onclick = function() {
  	
  	var myList = document.getElementById(index.toString());
    myList.innerHTML = '';
  	
  	events.splice(index, 1);
    eventNames.splice(index, 1);
    
    for(var j = 0; j < events.length; j++) {
    	localStorage[j.toString()] = events[j].getTime();
    } 
   
    localStorage.setItem("eventNames", JSON.stringify(eventNames));
    localStorage.setItem("eventAMPM", JSON.stringify(eventAMPM));
    
    document.getElementById("form").reset();
    document.getElementById("add_button").value = "+ Add";		
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
     
 }; 
} 

//adds an event to the list
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
   	  $("#remove_button").attr('class', 'inline');
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
  
}