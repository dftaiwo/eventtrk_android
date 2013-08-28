var serverUrl = 'http://localhost/thinking/eventtrkserver/index.php';
var eventsData = {}

if (window.location.hostname != 'localhost') {

}
if (typeof(console) == "undefined") {
        window.console = {
                log: function() {
                }
        };
}

var isBlackberry = false;

if (typeof(blackberry) != 'undefined' && typeof(blackberry.invoke) != 'undefined') {
        isBlackberry = true;
}

var activeView = '#dashboard';
$().ready(function() {

        $(window).on('hashchange', function() {
                handleBrowserStateChange();
        });

        goToPage("#dashboard");

        pullUpcomingEvents();
});



function pullUpcomingEvents() {

        var postData = {
                action: 'list',
        };
        $.ajax({
                url: serverUrl,
                data: JSON.stringify(postData),
                type: "POST",
                cache: false,
                crossDomain: true,
                dataType: 'json',
                success: function(responseData) {
                        displayUpcomingEvents(responseData);
                },
                error: function(xhr, errorType, error) {
                        alert("Unable to complete request.\n" + error + "\n Please try again");
                }
        });
}

function displayUpcomingEvents(responseData){
        
        console.log('Displaying Events',responseData);
        var upcomingDirectives = {
        Event:{
                event_teaser:{
                        html:function(){
                                
                                teaser =  '<a href="#singleEvents" onclick="viewEvent('+this.id+');">'+this.description.substr(0,100)+'</a>';
                                eventsData[this.id] = this;
                                return teaser;
                        }
                }
        }
        };
        
           $('#eventsList').render(responseData, upcomingDirectives);
        
}


function handleBrowserStateChange( ) {

        var fullPageId = window.location.hash;

        if (!fullPageId || fullPageId == '#')
                return;

        console.log('New Page', fullPageId);

        if (fullPageId == '#singleEvents' || fullPageId == '#upcomingEvents') { //this is a hack
//                fullPageId = "#upcomingEvents";

        }
        $(activeView).hide();
        activeView = fullPageId;
        $(fullPageId).show();

}
function clearCreateForm() {
        $('#createEventForm').find("input[type=text], textarea").val("");
}

function postEvent() {

        //Assuming validation has been done
        var postData = $('#createEventForm').serialize();
        $('#btnCreateEvent').attr('disabled', true);
        $('#btnCreateEvent').attr('value', 'Please wait...');
        $.ajax({
                url: serverUrl,
                data: postData,
                type: "POST",
                cache: false,
                crossDomain: true,
                dataType: 'json',
                success: function(data) {

                        console.log('response', data);
                        clearCreateForm();
                        alert("Event Saved");
                        $('#btnCreateEvent').attr('disabled', null);
                        $('#btnCreateEvent').attr('value', 'Post Event');
                        goToPage('#upcomingEvents');
                },
                error: function(xhr, errorType, error) {
                        $('#btnCreateEvent').attr('disabled', null);
                        $('#btnCreateEvent').attr('value', 'Post Event');
                        alert("Unable to save.\n" + error + "\n Please try again");
                }
        });
        return false;
}

function goToPage(pageId) {
        location.href = pageId;
}

function viewEvent(eventId){
        
        eventInfo = eventsData[eventId];
        console.log('eventInfo',eventInfo);
         var upcomingDirectives = {
        registration:{
                        html:function(){

                                if(this.registration_link){
                                        return   '<a onclick="launchExternalPage(\''+this.registration_link+'\');">'+this.registration_link+'</a>';
                                }

                        }
                }
            
        };
        
           $('#singleEvents').render(eventInfo, upcomingDirectives);
          
}

function launchExternalPage(pageUrl){
        if (isBlackberry) {
                var args = new blackberry.invoke.BrowserArguments(pageUrl);
                blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
        } else {
                newwindow = window.open(pageUrl, 'name', 'height=400,width=600');
                if (window.focus) {
                        newwindow.focus()
                }
        }
        return false;
}