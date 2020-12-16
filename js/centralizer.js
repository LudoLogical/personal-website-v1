var centralize = function () {
    var space = $(window).height();
    if ($(document).height() - $('#centralizer').height() > space) {
        $('#centralizer').height(0);
    } else {
        var difference = space - ($('#container').height() + 2*parseInt($('#container').css('padding-top')) - $('#centralizer').height());
        $('#centralizer').height(Math.min(difference, 100));
    }
}

$(window).resize(function(){
    centralize();
    
});

centralize();