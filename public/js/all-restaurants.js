$(document).ready(function(){

getAllRestaurants();






});

function getAllRestaurants() {
    $.ajax({
            url: "/api/allRes/",
            type: "GET",
            dataType: "json",
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
            }
        })
        .done(function (data) {
            data.forEach(function (restaurant) {

                var newButton = $("<a>");
                // basic button classes
                newButton.addClass("btn btn-default btn-block btn-lg");
                newButton.addClass("resButton");
                newButton.text(restaurant.name);
                // add the route to restaurant page
                var currentURL = window.location.origin;
                newButton.attr("href", currentURL+ "/" +restaurant.id);                

                $("#restaurantDisplayArea").append(newButton);
            });

           
        });


}