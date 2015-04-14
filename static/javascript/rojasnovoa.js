$(window).on("load", function(){

    $("a").on("click", function(){
        var ref = $(this).attr("href"),
            $toElement = $(ref),
            toPosition = $toElement.position().top;

        $("body, html").animate({
            scrollTop: toPosition
        }, 800);


    });
});