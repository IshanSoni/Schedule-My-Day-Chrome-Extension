
window.onload = function() {
   
};

var now = new Date();
var events = [];
var eventNames = [];

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
  document.getElementById("minute").value = events[index].getMinutes();
  
  
  document.getElementById("add_button").value = "Modify";
  document.getElementById("add_button").onclick = function() {
     events[index].setHour(pmConverter(document.getElementById("AM/PM").value));
     events[index].setMinutes(document.getElementById("minute").value);
     eventNames[index] = document.getElementById("task_name").value; 
 } 
} 

function loop() {
   var then = new Date(now.getYear(), now.getMonth(), 
                       now.getDate(), 
                       pmConverter(document.getElementById("AM/PM").value), 
                       document.getElementById('minute').value)
   events.push(then);
   eventNames.push(document.getElementById("task_name").value);
   
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
        events.splice(i, 1);
        eventNames.splice(i,1);
      }
      else {
      	now = new Date();
      } }
   }, 1000);

}