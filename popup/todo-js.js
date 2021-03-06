var clicks;
var clicksBuffer;
var storageInput;
var storageInputReminderID;
var storageInputReminderHTML;

/*
localStorage.removeItem("storageInput");
localStorage.removeItem("storageInputReminderID");
localStorage.removeItem("storageInputReminderHTML");
console.log("Success");
*/


if (localStorage.getItem("storageInput")) {
	storageInput = JSON.parse(localStorage.getItem("storageInput"));
	storageInputReminderID = JSON.parse(localStorage.getItem("storageInputReminderID"));
	storageInputReminderHTML = JSON.parse(localStorage.getItem("storageInputReminderHTML"));

	for (x = 0;  x < Object.keys(storageInputReminderID).length; x++) {
		(function (x) {
			storageInputReminderIDArray = Object.values(storageInputReminderID);
			storageInputReminderHTMLArray = Object.values(storageInputReminderHTML);

			reminderToAppend = document.createElement("div");
			reminderToAppend.innerHTML = storageInputReminderHTMLArray[x];
			reminderToAppend.id = storageInputReminderIDArray[x];
			reminderToAppend.className = "classReminder";

			document.body.appendChild(reminderToAppend);

			document.getElementById(storageInputReminderIDArray[x]).firstChild.addEventListener("click", function(){
				var reminderToDelete = document.getElementById(storageInputReminderIDArray[x]);

				for (var i in storageInputReminderID) {
					if (storageInputReminderID[i] == reminderToDelete.id) {
						delete storageInputReminderID[i];
						console.log(storageInputReminderID);
					}
				}

				for (var y in storageInputReminderHTML) {
					if (storageInputReminderHTML[y] == reminderToDelete.innerHTML) {
						delete storageInputReminderHTML[y];
						console.log(storageInputReminderHTML);
					}
				}

				reminderToDelete.remove();
				storageInput.numOfClicks -= 1;

				localStorage.setItem("storageInput", JSON.stringify(storageInput));
				localStorage.setItem("storageInputReminderID", JSON.stringify(storageInputReminderID));
				localStorage.setItem("storageInputReminderHTML", JSON.stringify(storageInputReminderHTML));
			});

		}(x));
	}

	clicksBuffer = storageInput.numClicksBuffer;
	clicks = storageInput.numOfClicks;

} else {
	clicksBuffer = 0;
	clicks = 0;
	storageInput = {};
	storageInputReminderID = {};
	storageInputReminderHTML = {};
}


function createReminder(){
	clicksBuffer += 1;

	var reminder = document.createElement("div");
	reminder.className = "classReminder";
	reminder.id = "idReminder" + clicksBuffer;
	document.body.appendChild(reminder);

	var rDescription = document.createElement("input");
	rDescription.className = "descFieldsClass";
	rDescription.id = "descFields" + clicksBuffer;
	rDescription.setAttribute("type", "text");

	var rDone = document.createElement("button");
	rDone.className = "doneButtonClass";
	rDone.id = "doneButton" + clicksBuffer;
	var doneText = document.createTextNode("Done");
	rDone.appendChild(doneText);

	var rDelete = document.createElement("button");
	rDelete.className = "deleteButtonClass";
	rDelete.id = "deleteButton" + clicksBuffer;
	var deleteText = document.createTextNode("Delete");
	rDelete.appendChild(deleteText);

	document.getElementById(reminder.id).appendChild(rDescription);
	document.getElementById(reminder.id).appendChild(rDone);
	document.getElementById(reminder.id).appendChild(rDelete);

	document.getElementById(rDone.id).addEventListener("click", function(){
		var inputField = document.getElementById(rDescription.id).value;
		enterDescription(inputField, document.getElementById(rDescription.id), document.getElementById(rDone.id), document.getElementById(reminder.id), document.getElementById(rDelete.id));
	}); 

	document.getElementById(rDelete.id).addEventListener("click", function(){
		var divToDelete = document.getElementById(reminder.id);
		divToDelete.remove();
	});
}

function enterDescription(fieldInput, fieldToDelete, buttonToDelete, divToEnter, buttonToChangeID){		
	var inputParagraph = document.createElement("p");
	inputParagraph.style.fontFamily = "georgia";
	inputParagraph.style.position = "absolute";
	inputParagraph.style.left = "10px";
	var inputBuffer = document.createTextNode(fieldInput);
	inputParagraph.appendChild(inputBuffer);
	
	fieldToDelete.remove();
	buttonToDelete.remove();
	divToEnter.appendChild(inputParagraph);
	
	clicks += 1;
	storageInput.numOfClicks = clicks;
	storageInput.numClicksBuffer = clicksBuffer;
	buttonToChangeID.id = "deleteButton" + clicks;
	divToEnter.id = "idReminder" + clicks;

	storageInputReminderID["reminderID" + clicks] = divToEnter.id;
	storageInputReminderHTML["reminderInnerHTML" + clicks] = divToEnter.innerHTML;
	localStorage.setItem("storageInput", JSON.stringify(storageInput));
	localStorage.setItem("storageInputReminderID", JSON.stringify(storageInputReminderID));
	localStorage.setItem("storageInputReminderHTML", JSON.stringify(storageInputReminderHTML));
	
}

document.getElementById("addReminder").addEventListener("click", createReminder);
