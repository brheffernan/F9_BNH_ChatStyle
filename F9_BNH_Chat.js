console.log("Inside the chat script");


//The below block of code is to edit the inner text that is on the minimized and maximized chat widget.
var F9_target = document.body;
var F9_observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length && mutation.addedNodes[0].className === 'five9-frame') {
      console.log("Mutation detected that Five9 Widget was added", mutation);
      document.getElementsByClassName('five9-text')[0].innerText = "Chat Now";
      document.getElementsByClassName('five9-text')[1].innerText = "Chat";
      F9_observer.disconnect();
    }
  });
});

var config = { attributes: false, childList: true, characterData: false };
F9_observer.observe(F9_target, config);



//Setting a var to hold the fields, which will change depending on whether the user of the site is logged in or not. 
var fields;

//Check if a customer is logged in and if they are follow the actions in the if statement in the brackets below.
if(typeof mw_customer_data === 'undefined'){
	console.log("User Not Logged In");
	fields = {
		"name": {
			"value": "",
			"show": true,
			"label": "Name"
		},
		"email": {
			"value": "",
			"show": true,
			"label": "Email"
		},
		"Caller.PhoneNumber": {
			"value": "",
			"show": true,
			"label": "Phone Number",
			"required": true
		},
		"Caller.Customer Number": {
			"value": "",
			"show": false,
			"label": "Customer Number",
			"required": false
		},
		"UserLocale": {
			"value": "en",
			"show": false
		}
	};
}
//If the customer is not logged in follow the actions within the else brackets below.
else {
	console.log("User Logged In");

	//Ensure all string type data.
	var name = mw_customer_data["agora_customer_firstname"].toString();
	var email = mw_customer_data["agora_customer_email"].toString();
	var customerNum = mw_customer_data["agora_customer_number"].toString();
	fields = {
		"name": {
			"value": name,
			"show": false,
			"label": "Name"
		},
		"email": {
			"value":email,
			"show": false,
			"label": "Email"
		},
		"Caller.PhoneNumber": {
			"value": "",
			"show": true,
			"label": "Phone Number",
			"required": true
		},
		"Caller.Customer Number": {
			"value": customerNum,
			"show": false,
			"label": "Customer Number",
			"required": false
		},
		"UserLocale": {
			"value": "en",
			"show": false
		}
	};
}

//theme = lime-time.css

var options = {
	"rootUrl": "https://app.five9.com/consoles/",
	"type": "chat",
	"title": "Banyan Hill Publishing",
	"tenant": "TCC",
	"profiles": "Chat - Banyan Hill",
	"showProfiles": false,
	"autostart": true,
	"profileLabel": "Chat - Banyan Hill",
	"theme": "/BNH_ChatStyle.css",
	"logo": "https://cdn.banyanhill.com/wp-content/uploads/2014/10/06072331/banyan-logo-New.png",
	"surveyOptions": {
		"showComment": false,
		"requireComment": false
	},
	"fields": fields,
	"playSoundOnMessage": true,
	"allowCustomerToControlSoundPlay": true,
	"showEmailButton": false,
	"hideDuringAfterHours": true,
	"useBusinessHours": true,
	"showPrintButton": true,
	"allowUsabilityMenu": true,
	"enableCallback": false,
	"callbackList": "",
	"allowRequestLiveAgent": false
};

//Launch the widget with the set data options.
Five9SocialWidget.addWidget(options);
