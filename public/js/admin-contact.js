$(document).ready(function(){    

    getResContactInfo();

    $("#editHoursButton").on("click", function(e){
        e.preventDefault();
        $("#editHoursModal").modal('toggle');
    });

    $("#saveHours").on("click", function(){
        var newHours = $("#hourModalBody").val();
        var hoursObject = {
            hour: newHours
        };
        saveHours(hoursObject);
    });

    $("#editContactButton").on("click", function(){
        $("#editContactModal").modal('toggle');
    });

});

function getResContactInfo(){

 $.ajax({
         url: "/api/contactInfo/" + localStorage.userId + "/" + localStorage.resId,
         type: "GET",
         dataType: "json",
         error: function (jqXHR, textStatus, errorThrown) {
             console.log(jqXHR.responseText);
         }
     })
     .done(function (data) {
        $("#addArea").text(data.address);
        $("#phoneArea").text(data.phone);
        $("#emailArea").text(data.email);
        $("#hoursArea").text(data.hour);
        $("#hourModalBody").text(data.hour);

         console.log(data);
     });
}

function saveHours(hoursObject){
 $.ajax({
         url: "/api/saveHours/" + localStorage.resId + "/" + localStorage.userId,
         type: "POST",
         data: hoursObject,
         dataType: "json",
         error: function (jqXHR, textStatus, errorThrown) {
             console.log(jqXHR.responseText);
         }
     })
     .done(function (data) {
        $("#editHoursModal").modal('toggle');
        getResContactInfo();
        
     });


}