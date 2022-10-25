function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	// dictionary of all activities with each respective count value
	let activity_dict = new Object(); 
	activity_dict['ski run'] = {count: 0, distance: 0};
	activity_dict['run'] = {count: 0, distance: 0};
	activity_dict['nordic walk'] = {count: 0, distance: 0};
	activity_dict['walk'] = {count: 0, distance: 0};
	activity_dict['freestyle'] = {count: 0, distance: 0};
	activity_dict['workout'] = {count: 0, distance: 0};
	activity_dict['mountain bike'] = {count: 0, distance: 0};
	activity_dict['bike'] = {count: 0, distance: 0};
	activity_dict['swim'] = {count: 0, distance: 0};
	activity_dict['hike'] = {count: 0, distance: 0};
	activity_dict['yoga'] = {count: 0, distance: 0};
	activity_dict['activity'] = {count: 0, distance: 0};
	activity_dict['snowboard'] = {count: 0, distance: 0};
	activity_dict['chair ride'] = {count: 0, distance: 0};
	activity_dict['row'] = {count: 0, distance: 0};
	activity_dict['skate'] = {count: 0, distance: 0};

	// the total number of activities 
	document.getElementById('numberActivities').innerText = Object.keys(activity_dict).length; 

	// keeps track of the count and total distance of each activity type 
	for (let i = 0; i < tweet_array.length; i++) { 
		if (tweet_array[i].activityType == "ski run") { 
			activity_dict['ski run'].count++;
			activity_dict['ski run'].distance += tweet_array[i].distance; 
		}
		else if (tweet_array[i].activityType == "run") { 
			activity_dict['run'].count++; 
			activity_dict['run'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "nordic walk") { 
			activity_dict['nordic walk'].count++; 
			activity_dict['nordic walk'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "walk") { 
			activity_dict['walk'].count++; 
			activity_dict['walk'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "freestyle") { 
			activity_dict['freestyle'].count++; 
			activity_dict['freestyle'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "workout") { 
			activity_dict['workout'].count++; 
			activity_dict['workout'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "mountain bike") { 
			activity_dict['mountain bike'].count++; 
			activity_dict['mountain bike'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "bike") { 
			activity_dict['bike'].count++; 
			activity_dict['bike'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "swim") { 
			activity_dict['swim'].count++; 
			activity_dict['swim'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "hike") { 
			activity_dict['hike'].count++; 
			activity_dict['hike'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "yoga") { 
			activity_dict['yoga'].count++; 
			activity_dict['yoga'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "activity") { 
			activity_dict['activity'].count++; 
			activity_dict['activity'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "snowboard") { 
			activity_dict['snowboard'].count++; 
			activity_dict['snowboard'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "chair ride") { 
			activity_dict['chair ride'].count++; 
			activity_dict['chair ride'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "row") { 
			activity_dict['row'].count++; 
			activity_dict['row'].distance += tweet_array[i].distance
		}
		else if (tweet_array[i].activityType == "skate") { 
			activity_dict['skate'].count++; 
			activity_dict['skate'].distance += tweet_array[i].distance
		}
	}

	// sorts the dictionary by putting it into a list, that ultimately produces a list of sorted keys 
	let sorted_activities = Object.keys(activity_dict).map(
		(key) => { return [key, activity_dict[key].count]});
	sorted_activities.sort((first, second) => { return first[1] - second[1]});
	let sorted_keys = sorted_activities.map(
		(activity) => { return activity[0]});
	
	// the top 3 most frequent activities 
	document.getElementById('firstMost').innerText = sorted_keys[sorted_keys.length - 1];
	document.getElementById('secondMost').innerText = sorted_keys[sorted_keys.length - 2]; 
	document.getElementById('thirdMost').innerText = sorted_keys[sorted_keys.length - 3]; 
	
	// the dictionary of the top 3 activities with its average distance 
	let topthree_dict = new Object(); 
	topthree_dict[sorted_keys[sorted_keys.length - 1]] = activity_dict[sorted_keys[sorted_keys.length - 1]].distance / activity_dict[sorted_keys[sorted_keys.length - 1]].count; 
	topthree_dict[sorted_keys[sorted_keys.length - 2]] = activity_dict[sorted_keys[sorted_keys.length - 2]].distance / activity_dict[sorted_keys[sorted_keys.length - 2]].count; 
	topthree_dict[sorted_keys[sorted_keys.length - 3]] = activity_dict[sorted_keys[sorted_keys.length - 3]].distance / activity_dict[sorted_keys[sorted_keys.length - 3]].count; 
	
	// the top 3 dictionary is sorted by the average distance
	let sorted_topthree = Object.keys(topthree_dict).map(
		(key) => { return [key, topthree_dict[key]]});
	sorted_topthree.sort((first, second) => { return first[1] - second[1]});
	let sorted_topthreekeys = sorted_topthree.map(
		(topthree) => { return topthree[0]});
    
	// longest average distance 
	document.getElementById('longestActivityType').innerText = sorted_topthreekeys[sorted_topthreekeys.length - 1];
	// shortest average distance 
	document.getElementById('shortestActivityType').innerText = sorted_topthreekeys[0]; 

	// displays when the longest activity occurred more often 
	// the answer was retrieved from the graph 
	document.getElementById('weekdayOrWeekendLonger').innerText = "weekends"; 

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	let first_graph = [];
	let key = ""; 
	for (let i = 0; i < Object.keys(activity_dict).length; i++) { 
		key = Object.keys(activity_dict)[i];
		first_graph.push({'activityType': key, 'count': activity_dict[key].count});
	}

	first_graph.sort((first, second) => (first.count < second.count) ? 1: ((first.count > second.count) ? -1 : 0));

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "width": 400, 
	  "height": 300, 
	  "data": {
	    "values": first_graph
	  },
	  "selection": {
		"pts": {"type": "single", "on": "mouseover"}
	  },
	  //TODO: Add mark and encoding
	  "mark": "point", 
	  "encoding": { 
		// nominal vs ordinal 
		"x": {"field": "activityType", "type": "nominal", "sort": -sorted_keys},
		"y": {"field": "count", "type": "quantitative", "scale": {"type": "log"}},
		"color": { 
			"condition": {
				"selection": "pts",  
				"type": "quantitative"
			},
			"value": "grey"
		}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	let second_graph = [];
	for (let i = 0; i < tweet_array.length; i++) { 
		if (tweet_array[i].activityType == sorted_keys[sorted_keys.length - 1] || 
			tweet_array[i].activityType == sorted_keys[sorted_keys.length - 2] || 
			tweet_array[i].activityType == sorted_keys[sorted_keys.length - 3]) { 
				second_graph.push({'activityType': tweet_array[i].activityType, 'time (day)': tweet_array[i].day, 'distance': tweet_array[i].distance});
			}
	}

	distance_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the distances by day of the week for the three most tweeted-about activities.",
	  "width": 300, 
	  "height": {"step": 50}, 
	  "data": {
	    "values": second_graph
	  },
	  "selection": {
		"pts": {"type": "single", "on": "mouseover"}
	  },
	  "mark": "point", 
	  "encoding": { 
		"x": {"field": "time (day)", "type": "nominal", "sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], 
			"axis": { 
				"labelAngle": 360,
			}
		},
		"y": {"field": "distance", "type": "quantitative"},
		"color": { 
			"field": "activityType",
			"type": "nominal",
			"scale": {
				"domain": ["bike", "run", "walk"]
			},
			"legend": {"title": "activityType"}
		}
	  }
	};

	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});

	distance_vis_aggregated = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the average of distances by day of the week for the three most tweeted-about activities.",
		"width": 300, 
		"height": {"step": 5}, 
		"data": {
		  "values": second_graph
		},
		"selection": {
		  "pts": {"type": "single", "on": "mouseover"}
		},
		"mark": "point", 
		"encoding": { 
		  "x": {"field": "time (day)", "type": "nominal", "sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], 
			  "axis": { 
				  "labelAngle": 360,
			  }
		  },
		  "y": {"field": "distance", "type": "quantitative", "aggregate": "average", "title": "Mean of distance"
		  },
		  "color": { 
			  "field": "activityType",
			  "type": "nominal",
			  "scale": {
				  "domain": ["bike", "run", "walk"]
			  },
			  "legend": {"title": "activityType"}
		  }
		}
	  };

	  vegaEmbed('#distanceVisAggregated', distance_vis_aggregated, {actions:false});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);

	// the aggregated version is not displayed in the beginning
	document.getElementById('distanceVisAggregated').style.display = "none"; 
	// the function that handles the click
	document.getElementById('aggregate').onclick = function() {
		let x = document.getElementById('distanceVis');
		let y = document.getElementById('distanceVisAggregated');
		// if the text of the button is show means
		if (document.getElementById('aggregate').innerText == "Show means") {
			// change it to show all activities
			document.getElementById('aggregate').innerText = "Show all activities";
			// hide non-aggregated
			x.style.display = "none";
			// show aggregated
			y.style.display = "block";
		}
		else if (document.getElementById('aggregate').innerText == "Show all activities") { 
			document.getElementById('aggregate').innerText = "Show means";
			y.style.display = "none";
			x.style.display = "block";
		}
	};

});