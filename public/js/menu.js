$(document).ready(function () {
    // Getting a reference to the input field where user adds a new item
    var appNameInput = $("#apetizer");
    var appInfoInput = $("#appDesc");
    var appPriceInput = $("#appPrice");
    var appCateInput = $("#category")
    var applist = $(".applist");
    var app;
    var resId = localStorage.resId;
    // Adding an event listener for when the form is submitted
    $(document).on("submit", "#app", handleFormSubmit);
    $(document).on("click", "button.delete", deleteItem);
    //$(document).on("click", "button.Update", updateItem);
    $(document).one("click", ".new-item", editTodo);
    $(document).on("keyup", ".new-item", finishEdit);
    //$("#save").on('click', function(){
    //finishEdit();
    // })

    $("#menu").on('click', function () {
        getStart();
    });

    // A function for handling what happens when the form to create a new apetizer is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the apetizer if we are missing a name, info, or price
        if (!appNameInput.val().trim() || !appInfoInput.val().trim() || !appPriceInput.val()) {
            return;
        }
        // Constructing a newStart object to hand to the database
        var start = {
            Name: appNameInput
                .val(),
            Info: appInfoInput
                .val(),
            Price: appPriceInput.val(),
            Category: appCateInput.val(),
            restaurantId: resId
        };
        console.log(start);
        $.post("/api/menu", start, function () {
            getStart();
        });
    }

    // This function grabs todos from the database and updates the view
    function getStart() {
        $.get("/api/menu/" + resId, function (data) {
            console.log("Start");
            app = data;
            console.log(data);
            initializeRows();
        });
    }

    // This function resets the items displayed with new items from the database
    function initializeRows() {
        applist.empty();
        $("#app")[0].reset();
        var appToAdd = [];
        for (var i = 0; i < app.length; i++) {
            appToAdd.push(createNewRow(app[i]));
        }
        applist.append(appToAdd);
    }

    // This function constructs a appetizer row
    function createNewRow(app) {
        var newInputRow = $("<li>");
        newInputRow.addClass("list-group-item new-item");
        var newSpan = $("<span>");
        newSpan.html(app.Name + "<br>" + app.Info + "<br>" + app.Price + "<br>" + app.Category);
        newInputRow.append(newSpan);
        var newInput = $("<input>");
        newInput.attr("type", "Name");
        newInput.addClass("edit");
        newInput.css("display", "none");
        newInputRow.append(newInput);
        var newInput2 = $("<input>");
        newInput2.attr("type", "Info");
        newInput2.addClass("edit2");
        newInput2.css("display", "none");
        newInputRow.append(newInput2);
        var newInput3 = $("<input>");
        newInput3.attr("type", "Price");
        newInput3.addClass("edit3");
        newInput3.css("display", "none");
        newInputRow.append(newInput3);
        var newInput4 = $("<input>");
        newInput4.attr("type", "Category");
        newInput4.addClass("edit4");
        newInput4.css("display", "none");
        newInputRow.append(newInput4);
        var newDeleteBtn = $("<button>");
        newDeleteBtn.addClass("delete btn btn-default");
        newDeleteBtn.text("Remove");
        newDeleteBtn.data("id", app.id);
        // var newUpdateBtn = $("<button>");
        // newUpdateBtn.addClass("update btn btn-default");
        // newUpdateBtn.text("Update");
        // newUpdateBtn.data("id", app.id);
        //newInputRow.append(newUpdateBtn);
        newInputRow.append(newDeleteBtn);
        newInputRow.data("app", app);

        return newInputRow;
    }

    // This function deletes a todo when the user clicks the delete button
    function deleteItem() {
        var id = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/menu/" + id
        })
            .done(function () {
                applist.empty();
                getStart();
            });
    }

    // This function updates a todo in our database
    function updateItem(item) {
        $.ajax({
            method: "PUT",
            url: "/api/menu",
            data: item
        })
            .done(function () {
                getStart();
                $(document).one("click", ".new-item", editTodo);
            });
    }

    // This function handles showing the input box for a user to edit a item
    function editTodo() {
        var currentItem = $(this).data("app");
        $(this)
            .children()
            .hide();
        $(this)
            .children("input.edit")
            .val(currentItem.Name);
        $(this)
            .children("input.edit2")
            .val(currentItem.Info);
        $(this)
            .children("input.edit3")
            .val(currentItem.Price);
        $(this)
            .children("input.edit4")
            .val(currentItem.Category);
        $(this)
            .children("input.edit")
            .show();
        $(this)
            .children("input.edit2")
            .show();
        $(this)
            .children("input.edit3")
            .show();
        $(this)
            .children("input.edit4")
            .show();
        $(this)
            .children("input.edit")
            .focus();
        $(this)
            .children("input.edit2")
            .focus();
        $(this)
            .children("input.edit3")
            .focus();
        $(this)
            .children("input.edit4")
            .focus();
    }

    // This function starts updating a item in the database if a user hits the
    // "Enter Key" While in edit mode
    function finishEdit(event) {
        var updatedItem;
        if (event.key === "Enter") {
            updatedItem = {
                id: $(this)
                    .data("app")
                    .id,
                Name: $(this)
                    .children("input")
                    .val()
                    .trim(),
                Info: $(this)
                    .children("input.edit2")
                    .val()
                    .trim(),
                Price: $(this)
                    .children("input.edit3")
                    .val(),
                Category: $(this)
                    .children("input.edit4")
                    .val(),
                restaurantId: resId
            };
            $(this).blur();
            updateItem(updatedItem);
            console.log(updatedItem);
        }
    }

    //The Main View of the menu
    //reload page after closing add on window to display items
    $("#save").on("click", function() {
        location.reload();
    });
    //run these functions on start up
    starter();
    chicken();
    steak();

    //appetizer plates
    function starter() {
        $.get("/api/menu/"+ resId, function(data) {
            var ul = $("<ul>");
            for (i in data) {
                var li = $("<li>");
                var a = data[i].Category;
                if (a === "Appetizer") {
                    // console.log(data[i]);
                    li.html("<strong>" + data[i].Name + "</strong>" + "<br>" + data[i].Info + "<br>" + data[i].Price);
                    ul.append(li);
                    $("#starter").append(ul);
                }
                //console.log("Start display");
                //app = data;
                //console.log(data[0]);
                //displayData(data);
            }
        });
    };

    //chicken plates
    function chicken() {
        $.get("/api/menu/"+ resId, function(data) {
            var ul = $("<ul>");
            for (i in data) {
                var li = $("<li>");
                var a = data[i].Category;
                if (a === "Chicken") {
                    // console.log(data[i]);
                    li.html("<strong>" + data[i].Name + "</strong>" + "<br>" + data[i].Info + "<br>" + data[i].Price);
                    ul.append(li);
                    $("#chicken").append(ul);
                }
            }
        });
    };

    //Steak plates
    function steak() {
        $.get("/api/menu/"+ resId, function(data) {
            var ul = $("<ul>");
            for (i in data) {
                var li = $("<li>");
                var a = data[i].Category;
                if (a === "Steak") {
                    // console.log(data[i]);
                    li.html("<strong>" + data[i].Name + "</strong>" + "<br>" + data[i].Info + "<br>" + data[i].Price);
                    ul.append(li);
                    $("#steak").append(ul);
                }
            }
        });
    };

    //Adding picture for appetizer
    $(function() {
        $('#inTag').on('change', function() {

            // get file and pull attributes
            var input = $(this)[0];
            var file = input.files[0];
            // $('h4').show();
            // $('#file-info').append("<li>Name: " + file.name + "</li>");
            // $('#file-info').append("<li>Type: " + file.type + "</li>");          

            // load file into preview pane
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imgTag').attr('src', e.target.result);
            }
            reader.readAsDataURL(file);

        });
    });

    //Adding picture for chicken
    $(function() {
        $('#inTag2').on('change', function() {

            // get file and pull attributes
            var input = $(this)[0];
            var file = input.files[0];
            // $('h4').show();
            // $('#file-info').append("<li>Name: " + file.name + "</li>");
            // $('#file-info').append("<li>Type: " + file.type + "</li>");          

            // load file into preview pane
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imgTag2').attr('src', e.target.result);
            }
            reader.readAsDataURL(file);

        });
    });

    //Adding picture steak
    $(function() {
        $('#inTag3').on('change', function() {

            // get file and pull attributes
            var input = $(this)[0];
            var file = input.files[0];
            // $('h4').show();
            // $('#file-info').append("<li>Name: " + file.name + "</li>");
            // $('#file-info').append("<li>Type: " + file.type + "</li>");          

            // load file into preview pane
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imgTag3').attr('src', e.target.result);
            }
            reader.readAsDataURL(file);

        });
    });    



});