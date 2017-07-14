var clicks = 0;

function createReminder(){
	clicks += 1;

	var reminder = document.createElement("div");
	reminder.className = "classReminder";
	reminder.id = "idReminder" + clicks;
	document.body.appendChild(reminder);

	var rDescription = document.createElement("input");
	rDescription.className = "descFieldsClass";
	rDescription.id = "descFields" + clicks;
	rDescription.setAttribute("type", "text");

	var rDone = document.createElement("button");
	rDone.className = "doneButtonClass";
	rDone.id = "doneButton" + clicks;
	var doneText = document.createTextNode("Done");
	rDone.appendChild(doneText);

	var rDelete = document.createElement("button");
	rDelete.className = "deleteButtonClass";
	rDelete.id = "deleteButton" + clicks;
	var deleteText = document.createTextNode("Delete");
	rDelete.appendChild(deleteText);

	document.getElementById(reminder.id).appendChild(rDescription);
	document.getElementById(reminder.id).appendChild(rDone);
	document.getElementById(reminder.id).appendChild(rDelete);

	document.getElementById(rDone.id).addEventListener("click", function(){
		var inputField = document.getElementById(rDescription.id).value;
		enterDescription(inputField, document.getElementById(rDescription.id), document.getElementById(rDone.id), document.getElementById(reminder.id))
	}); 

	document.getElementById(rDelete.id).addEventListener("click", function(){
		var divToDelete = document.getElementById(reminder.id);
		divToDelete.remove();
	});
}

function enterDescription(fieldInput, fieldToDelete, buttonToDelete, divToEnter){		
	var inputParagraph = document.createElement("p");
	inputParagraph.style.fontFamily = "georgia";
	inputParagraph.style.position = "absolute";
	inputParagraph.style.left = "10px";
	var inputBuffer = document.createTextNode(fieldInput);
	inputParagraph.appendChild(inputBuffer);
	
	fieldToDelete.remove();
	buttonToDelete.remove();
	divToEnter.appendChild(inputParagraph);
}

document.getElementById("addReminder").addEventListener("click", createReminder);


