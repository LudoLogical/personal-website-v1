$("nav p").hover(function(){
    $(this).parent().prev().animate({width: 'toggle'}, 300);
});
$("h2 a").mouseenter(function () {
    $(this).css({outline: '0 solid yellow'}).animate({
        'outlineWidth': '2px'
    }, 50);
}).mouseleave(function () {
     $(this).animate({
        'outlineWidth': '0'
    }, 50);
});