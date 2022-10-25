class Tweet {
	private text:string;
	time:Date;
    // new variable that dedicates to the description of the date the tweet was created
    created_at:string;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
        // "Fri Sep 28 23:17:31 +0000 2018"
        this.created_at = tweet_time;
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if (this.text.toLowerCase().includes('just completed') || this.text.toLowerCase().includes('just posted')) { 
            return "completed_event";
        }
        else if (this.text.toLowerCase().includes('right now')) { 
            return "live_event"; 
        }
        else if (this.text.toLowerCase().includes('achieved') || this.text.toLowerCase().includes('met my') || this.text.toLowerCase().includes('set a goal')) { 
            return "achievement"; 
        }
        else { 
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        // user-written text 
        // example -> Just posted a 4.81 mi run - Tuesday postwork run
        if (this.text.toLowerCase().includes(' - ')) { 
            return true; 
        }
        // example -> Just completed a 9.39 km bike with @Runkeeper
        return false;
    }

    get writtenText():string {
        // if the tweet is not user-written
        if(!this.written) {
            return "";
        }
        // if the tweet is user-written
        //TODO: parse the written text from the tweet
        let user_text = this.text.substring(this.text.indexOf('- ') + 2, this.text.indexOf('https'));
        return user_text;
    }
    
    get tweetText():string { 
        return this.text; 
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        // Prof mentioned that there are 16 different types
        if (this.text.toLowerCase().includes(' run ')) { 
            if (this.text.toLowerCase().includes(' ski run ')) { 
                return "ski run";
            }
            else { 
                return "run";
            }
        }
        else if (this.text.toLowerCase().includes(' walk ')) { 
            if (this.text.toLowerCase().includes(' nordic walk ')) { 
                return "nordic walk";
            }
            else { 
                return "walk";
            }
        }
        else if (this.text.toLowerCase().includes(' freestyle ')) { 
            return "freestyle";
        }
        else if (this.text.toLowerCase().includes(' workout ')) { 
            return "workout";
        }
        else if (this.text.toLowerCase().includes(' bike ')) { 
            if (this.text.toLowerCase().includes(' mtn bike ')) { 
                return "mountain bike";
            }
            else {
                return "bike";
            }
        }
        else if (this.text.toLowerCase().includes(' swim ')) { 
            return "swim";
        }
        else if (this.text.toLowerCase().includes(' hike ')) { 
            return "hike";
        }
        else if (this.text.toLowerCase().includes(' yoga practice ')) { 
            return "yoga";
        }
        else if (this.text.toLowerCase().includes(' activity ')) { 
            return "activity";
        }
        else if (this.text.toLowerCase().includes(' snowboard ')) { 
            return "snowboard"; 
        }
        else if (this.text.toLowerCase().includes(' chair ride ')) { 
            return "chair ride"
        }
        else if (this.text.toLowerCase().includes(' row ')) { 
            return "row"; 
        }
        else if (this.text.toLowerCase().includes(' skate ')) { 
            return "skate";
        }
        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        // just completed a - mi // just posted a - mi
        // string.substring(string.indexOf('Just completed a ') + 17, string.indexOf(' km'));
        // string.substring(string.indexOf('Just posted a ') + 14, string.indexOf(' mi'));
        let str_distance = ""; 
        let distance = 0; 
        let str_miles = "";
        let miles = 0; 
        if (this.text.toLowerCase().includes('just completed')) { 
            if (this.text.toLowerCase().includes(' mi ')) { 
                str_distance = this.text.substring(this.text.toLowerCase().indexOf('just completed a ') + 17, this.text.toLowerCase().indexOf(' mi'));
                distance = parseFloat(str_distance);
            }
            else if (this.text.toLowerCase().includes(' km ')) { 
                str_distance = this.text.substring(this.text.toLowerCase().indexOf('just completed a ') + 17, this.text.toLowerCase().indexOf(' km'));
                miles = parseFloat(str_distance);
                miles = miles / 1.609;
                str_miles = miles.toFixed(2);
                distance = parseFloat(str_miles);

            }
        }
        else if (this.text.toLowerCase().includes('just posted')) { 
            if (this.text.toLowerCase().includes(' mi ')) { 
                str_distance = this.text.substring(this.text.toLowerCase().indexOf('just posted a ') + 14, this.text.toLowerCase().indexOf(' mi'));
                distance = parseFloat(str_distance);
            }
            else if (this.text.toLowerCase().includes(' km ')) { 
                str_distance = this.text.substring(this.text.toLowerCase().indexOf('just posted a ') + 14, this.text.toLowerCase().indexOf(' km'));
                miles = parseFloat(str_distance);
                miles = miles / 1.609;
                str_miles = miles.toFixed(2);
                distance = parseFloat(str_miles);
            }
        }
        return distance;
    }

    get day(): string { 
        if (this.created_at.includes('Mon ')) { 
            return "Mon"; 
        }
        else if (this.created_at.includes('Tue ')) { 
            return "Tue"; 
        }
        else if (this.created_at.includes('Wed ')) { 
            return "Wed"; 
        }
        else if (this.created_at.includes('Thu ')) { 
            return "Thu"; 
        }
        else if (this.created_at.includes('Fri ')) { 
            return "Fri"; 
        }
        else if (this.created_at.includes('Sat ')) { 
            return "Sat"; 
        }
        else if (this.created_at.includes('Sun ')) { 
            return "Sun"; 
        }
        return "";
    }

    get clickableLink(): string { 
        // the tweet text 
        let text = this.text;
        // the array to keep the link portion 
        let link_array; 
        // the string that becomes the combination of link_array elements 
        let hyperlink = "";
        // the string to store the clickable link 
        let clickable_link = ""

        // a simple regex expression that checks if it is a URL 
        link_array = this.text.match(/(http|https|ftp):\/\/([^\s]+)/g);
        if (link_array != null) { 
            for (let i = 0; i < link_array.length; i++) { 
                hyperlink += link_array[i].toString(); 
            }
        }
        // make the link in an HTML form 
        let anchor_hyperlink = '<a href="' + hyperlink + '">' + hyperlink + '</a>'; 
        // replace the text with the HTML form so that it is clickable 
        clickable_link = text.replace(hyperlink, anchor_hyperlink);

        return clickable_link; 
    }

    // was not able to use the function, because the function is limited to being called by a Tweet object 
    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        let tableRow = "<tr>"; 
        tableRow += "<td>" + rowNumber + "</td>"; 
        tableRow += "<td>" + this.activityType + "</td>";
        tableRow += "<td>" + this.clickableLink + "</td>";
        tableRow += "</tr>"
        return tableRow;
    }
}