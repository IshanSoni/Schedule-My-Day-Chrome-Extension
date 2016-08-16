
window.onload = function() {
   
}; 

document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('add_button');
    // onClick's logic below:
    link.addEventListener('click', function() {
        loop();
    });
});

var now = new Date();
var events = [];
var eventNames = [];
var eventAMPM = [];

function pmConverter(s) {
	if (s === "PM") {
		if(document.getElementById("hour").value !== "12") {
		     return +document.getElementById("hour").value + +12;
	}
		else return 12;
	}
	else {
		return (+document.getElementById("hour").value)%12;
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
     
     document.getElementById("form").reset();	
     document.getElementById("add_button").value = "Add";
     document.getElementById("add_button").onclick = function() {
     	loop();
     }; 
     
     setInterval(function() {
   	 for(var i = 0; i < events.length; i++) {
      if(now.getHours() === events[i].getHours() && now.getMinutes() === events[i].getMinutes()) {
      	document.getElementById(i.toString()).innerHTML = "Task Completed";
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
   	  editEntries(this);
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
           body: eventNames[i],
             }) 
         }
      	
        events.splice(i, 1);
        eventNames.splice(i,1);
      }
      else {
      	now = new Date();
      } }
   }, 1000);

}