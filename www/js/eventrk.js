var serverUrl = 'http://localhost/thinking/eventtrkserver/index.php';
if (window.location.hostname != 'localhost') {

}
if (typeof(console) == "undefined") {
        window.console = {
                log: function() {
                }
        };
}



var activeView = '#dashboard';
$().ready(function() {

        $(window).on('hashchange', function() {
                handleBrowserStateChange();
        });

        location.href = "#dashboard";

        showUpcomingEvents();
});



function showUpcomingEvents() {

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
                success: function(data) {
                        console.log('response', data);
                }
        });



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
function clearCreateForm(){
        $('#createEventForm').find("input[type=text], textarea").val("");
}
function postEvent() {
        
        //Assuming validation has been done
        var postData = $('#createEventForm').serialize();
                   clearCreateForm();
                   return;
        console.log(postData);
        $.ajax({
                url: serverUrl,
                data:  postData ,
                type: "POST",
                cache: false,
                crossDomain: true,
                dataType: 'json',
                success: function(data) {
                        
                        console.log('response', data);
                        alert("Event Saved");
              
                },
                        error:function(xhr, errorType, error){
                                alert("Unable to save.\n"+error + "\n Please try again");
                        }
        });
        return false;
}