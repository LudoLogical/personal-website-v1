var segments = $("#segments").children(".segment");

segments.each(function(i){
    $("#" + segments.eq(i).attr("id") + "head").click(function(){
        if (segments.eq(i).css("display") === "none") {
            
            segments.each(function(j){
            
                if (segments.eq(j).attr("id") != segments.eq(i).attr("id") && segments.eq(j).css("display") != "none") {
                    segments.eq(j).toggle();
                }
                
            });

            segments.eq(i).toggle();
            centralize();
            
        }
    });
    
});