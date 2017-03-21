var testData = [{
    body: "it was okay",
    createdAt: "2017-03-10T02:13:10.000Z",
    id: 1,
    name: "dude",
    rate: 4,
    restaurantId: 1,
    updatedAt: "2017-03-10T02:13"
}];

module.exports = testData;

function testajax(){
    $.ajax({
        url: "/api/review/1",
        type: "GET",
        dataType: "json",
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
        }
    })
    .done(function (data) {

            
        });
}


       
