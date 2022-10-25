// a global array that keeps track of all user-written tweets 
var written_array = []; 

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	 
	for (let i = 0; i < tweet_array.length; i++) { 
		// if the tweet is user-written, 
		if (tweet_array[i].written) { 
			written_array.push({activityType: tweet_array[i].activityType, 
			tweetText: tweet_array[i].tweetText, clickableLink: tweet_array[i].clickableLink});
		}
	}
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	// the value of the search box becomes the text of the search text 
	document.getElementById('searchText').innerText = document.getElementById('textFilter').value;
	let searchText = document.getElementById('searchText').innerText;

	// an array to hold all the values to display that match the searched text 
	let searched_array = []; 
	if (searchText != "") { 
		for (let i = 0; i < written_array.length; i++) { 
			if (written_array[i].tweetText.toLowerCase().includes(searchText)) {
				searched_array.push(written_array[i]);
			}
		}
	}

	// the count becomes the length of the searched array 
	document.getElementById('searchCount').innerText = searched_array.length; 

	// the table to occupy the rows 
	let table = document.getElementById('tweetTable');
	// empties the table 
	while(table.firstChild) { 
		table.removeChild(table.firstChild);
	}
	if (searchText == "") { 
		while(table.firstChild) { 
			table.removeChild(table.firstChild);
		}
	}

	// adds appropriate rows and column cells 
	for (let i = 0; i < searched_array.length; i++) { 
		let tableRow = table.insertRow(); 
		let tweetNum = tableRow.insertCell(0);
		let activityType = tableRow.insertCell(1); 
		let clickableLink = tableRow.insertCell(2);
		tweetNum.innerHTML = i + 1;
		activityType.innerHTML = searched_array[i].activityType;
		clickableLink.innerHTML = searched_array[i].clickableLink;
	}
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	document.getElementById('textFilter').addEventListener("keypress", addEventHandlerForSearch);
	loadSavedRunkeeperTweets().then(parseTweets);
});