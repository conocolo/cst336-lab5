$(document).ready(function() {
    $(".favoriteIcon").on("click", function() {
        var imageURL = $(this).prev().attr("src");

        if ($(this).attr("src") == "img/fav_off.png") {
            $(this).attr("src", "img/fav_on.png");
            updateFavorite("add", imageURL); //insert a new record
        } else {
            $(this).attr("src", "img/fav_off.png");
            updateFavorite("del", imageURL); //delete record from db
        }
    });

    // Favorites page fav functionality
    $("#favorites").on("click", function(e) {
        var className = $(e.target).prop('class');
        if (className == 'favoriteIcon') {
            var imageURL = $(e.target).prev().attr("src");
            if ($(e.target).attr("src") == "img/fav_off.png") {
                $(e.target).attr("src", "img/fav_on.png");
                updateFavorite("add", imageURL); //insert a new record
            } else {
                $(e.target).attr("src", "img/fav_off.png");
                updateFavorite("del", imageURL); //delete record from db
            }
        }
    });

    $(".keywordLink").on("click", function(){
        //alert($(this).text().trim());
        $.ajax({
            method: "get",
            url:    "/api/displayFavorites",
            data:   {
                      keyword: $(this).text().trim()
                    },
            success: function(rows, status) {
                $("#favorites").html("");
                rows.forEach(function(row, i){
                    if (i%4 == 0)
                        $("#favorites").append("<br>");
                    $("#favorites").append("<img class='image' src='"+row.imageURL + "' width=150 height=150>");
                    $("#favorites").append("<img class='favoriteIcon' src='img/fav_on.png'></img>");
                    
                });
            }

        });
    });
    function updateFavorite(action, imageURL) {
        $.ajax({
            method: "get",
            url:    "/api/updateFavorites",
            data:   {imageURL: imageURL,
                      keyword: $("#keyword").val(),
                      action: action
                    }

        });
    }
});