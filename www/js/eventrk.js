if (window.location.hostname == 'localhost') {

} else {

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
        
        location.href="#dashboard";
        
        showUpcomingEvents();
});



function showUpcomingEvents(){
        
}

function handleBrowserStateChange( ) {
        
        var fullPageId = window.location.hash;
        
        if (!fullPageId || fullPageId == '#')
                return;

        console.log('New Page', fullPageId);
        
        if (fullPageId == '#singleEvents' || fullPageId=='#upcomingEvents') { //this is a hack
//                fullPageId = "#upcomingEvents";
                
        } 
        $(activeView).hide();
        activeView = fullPageId;
        $(fullPageId).show();

}

function postEvent(){
        return false;
}