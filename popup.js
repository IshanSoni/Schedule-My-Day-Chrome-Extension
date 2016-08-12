
window.onload = function() {
   
};

var now = new Date();
var events = [];

function add() {
	
}

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

function loop() {
  
   var then = new Date(now.getYear(), now.getMonth(), 
                       now.getDate(), 
                       pmConverter(document.getElementById("AM/PM").value), 
                       document.getElementById('minute').value)
   events.push(then);
  
   setInterval(function() {
   	for(var i = 0; i < events.length; i++) {
      if(now.getHours() === events[i].getHours() && now.getMinutes() === events[i].getMinutes()) {
      	var ul = document.getElementById("add");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode("Done"));
        ul.appendChild(li);
        events.splice(i, 1);
      }
      else {
      	now = new Date();
      } }
   }, 1000);

}