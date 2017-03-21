$(document).ready(function () {
    $('#date').combodate(
        {
            minYear: 2017,
            maxYear: 2018
        }
    );
    $('#start').combodate({
        firstItem: 'name', //show 'hour' and 'minute' string at first item of dropdown
        minuteStep: 15
    });
    // $('#interval').combodate({
    //     firstItem: 'name', //show 'hour' and 'minute' string at first item of dropdown
    //     minuteStep: 15
    // });
    $('#end').combodate({
        firstItem: 'name', //show 'hour' and 'minute' string at first item of dropdown
        minuteStep: 15
    });
    // input references
    // var date = $("#date").val();
    // var start = $("#start").val();
    // var interval = $("#interval").val();
    // var end = $("#end").val();

    // check for any empty input
    function validateInput() {
        // initialize boolean to return
        var isEmpty = false;
        // check for empty input
        $("input.validate").each(function () {
            console.log($(this).val());
            if ($(this).val() === "") {
                isEmpty = true;
            }
        });
        return isEmpty;
    }

    // reset all the inputs
    function resetInput() {
        $("#date").combodate('setValue', null);
        $("#start").val("");
        $("#interval").combodate('setValue', null);
        $("#end").combodate('setValue', null);
    }

    // on submit button click
    $("#create_new").on("click", function () {
        var c_date = $("#date").combodate('getValue');
        var date = moment(c_date, "DD-MM-YYYY").format("YYYY-MM-DD");

        console.log(date);
        //var date = f_date.format("YYYY-MM-DD");
        var start = $("#start").combodate('getValue');
        // var interval = $("#interval").combodate('getValue');
        var interval = $("#interval").val();
        var end = $("#end").combodate('getValue');
        console.log(date);
        console.log(start);
        console.log(interval);
        console.log(end);
        // validate input
        var isEmpty = validateInput();
        if (date === "" || start === "" || interval === "" || end === "") {
            alert("Please fill out all fields");
        } else {
            // create the restaurant object
            var resv = {
                date: date,
                start: start,
                interval: interval,
                end: end,
                restaurantId: localStorage.resId
            };
            // reset
            //resetInput();
            calRESV(resv);
            // post ajax call to create a new restaurant
            // $.post("/api/resv/create", resv, function () {
            //     getRESV();
            // });
        }
    });
    // get all the reservations that belong to the resId
    function getRESV() {
        $.get("/api/resv/get/" + localStorage.resId, function (data) {
            //console.log(data);
            createRESV(data);
        });
    }

    function getRESVbyReserved() {
        $.get("/api/resv/getresvd/" + localStorage.resId, function (data) {
            //console.log(data);
            createRESVDisplay(data);
            
        });
    }

    function createRESVDisplay(resv){
        var table = $('<table class="table table-hover">')
        var thead = $('<thead>');
        var row = $('<tr>');
        var th = $('<th>');
        th.text('DATE');
        row.append(th);
        var th = $('<th>');
        th.text('TIME');
        row.append(th);
        var th = $('<th>');
        th.text('NAME');
        row.append(th);
        var th = $('<th>');
        th.text('PHONE');
        row.append(th);
        thead.append(row);
        table.append(thead);
        var tbody = $('<tbody>');
        
        for (i in resv){
            var tr = $('<tr>');
            console.log(resv[i]);
            var td = $('<td>');
            td.text(resv[i].date);
            tr.append(td);
            var td = $('<td>');
            td.text(resv[i].time);
            tr.append(td);
            var td = $('<td>');
            td.text(resv[i].name);
            tr.append(td);
            var td = $('<td>');
            td.text(resv[i].phone);
            tr.append(td);
            tbody.append(tr);
            
        }
        table.append(tbody);
        $('#resv-display').html(table);

    }

    function calRESV(resv) {
        // data
        console.log(resv);
        var t_date = resv.date;
        var t_start = resv.start;
        var t_interval = resv.interval;
        var t_end = resv.end;

        // moment data            
        var m_start = moment(t_start, "hh:mm");
        var m_interval = parseInt(t_interval);
        var m_end = moment(t_end, "hh:mm");
        var m_diff = m_end.diff(m_start, "minutes");
        var m_time = m_start;

        for (num = 0; num <= m_diff; num += m_interval) {
            if (num > 0) {
                m_time = m_start.add(m_interval, "minutes");
            }
            var f_time = m_time.format("hh:mm a");
            var RESV = {
                date: resv.date,
                time: f_time,
                restaurantId: resv.restaurantId
            }
            console.log(RESV);
            cb(RESV);
            function cb(resv) {
                $.post("/api/resv/create", resv, function (data) {
                    getRESV();
                    //console.log(data);
                });

            }

        }
        // post ajax call to create a new restaurant

    }

    // create the list of reservations
    function createRESV(req) {
        var div = $('<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">');

        var resv_date = "";
        var init = false;
        for (i in req) {
            // data
            var a1 = i;
            var a2 = req.length - 1;
            var resv_id = req[i].id;
            var resv_time = req[i].time;
            var current_date = req[i].date;
            var reserved = req[i].reserved;
            var div1 = $('<div class="panel panel-default">');

            // create new tags if different date
            if (resv_date !== current_date) {
                resv_date = req[i].date;
                if (init) {
                    div3.append(div4);
                    div1.append(div2);
                    div1.append(div3);
                    div.append(div1);
                }

                // html tags
                var heading = "heading" + resv_date;
                var aria = "collapse" + resv_date;
                // var div1 = $('<div class="panel panel-default">');
                var div2 = $('<div class="panel-heading" role="tab">');
                div2.attr("id", heading);
                var h4 = $('<h4 class="panel-title">');
                var aTag = $('<a role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" >');
                aTag.text(resv_date);
                aTag.attr("href", "#" + aria);
                aTag.attr("aria-controls", aria);
                var div3 = $('<div class="panel-collapse collapse" role="tabpanel">');
                div3.attr("id", aria);
                div3.attr("aria-labelledby", heading);
                var div4 = $('<div class="panel-body">');
                h4.append(aTag);
                div2.append(h4);
                // div1.append(div2);
                init = true;
            }
            var btn = $('<a class="btn btn-default btn-route" role="button"  data-target=".bs-example-modal-sm">');
            btn.text(resv_time);
            btn.attr('resv-id', resv_id);
            btn.attr('resv-time', resv_time);
            btn.attr('resv-date', current_date);
            if(reserved){
                btn.attr('disabled', true);
            }else{
                btn.attr('data-toggle', 'modal');
            }
            div4.append(btn);
            if (parseInt(a1) === parseInt(a2)) {
                div3.append(div4);
                div1.append(div2);
                div1.append(div3);
                div.append(div1);
            }
        }
        $("#reservation-list").html(div);
        $('.bs-example-modal-sm').modal('hide');
    }
    // This function updates a todo in our database
    function updateRESV(resv) {
        $.ajax({
            method: "PUT",
            url: "/api/resv/put",
            data: resv
        })
            .done(function () {
                getRESV();
                getRESVbyReserved();
                // $('.btn-route[resv-id=' + localStorage.resvId + ']').attr("disabled", true);
                // $('.btn-route[resv-id=' + localStorage.resvId + ']').attr("data-toggle", "");
            });
    }


    $(document.body).on("click", ".btn-route", function () {
        var time = $(this).attr('resv-time');
        var date = $(this).attr('resv-date');
        var id = $(this).attr('resv-id');
        localStorage.setItem('resvId', id);
        //console.log(data);
        $('.modal-title').text('RESV ' + date + " " + time);
    });
    $(document.body).on("click", "#submit_resv", function () {
        var name = $("#customer-name").val();
        var phone = $("#customer-number").val();
        var resv = {
            name: name,
            phone: phone,
            reserved: true,
            id: localStorage.resvId
        }
        $("#customer-name").val("");
        $("#customer-number").val("");
        updateRESV(resv);

    });
    getRESV();
    getRESVbyReserved();


});
    //     function calRESV(resv) {
    //     // data
    //     console.log(resv);
    //     var t_date = resv.date;
    //     var t_start = resv.start;
    //     var t_interval = resv.interval;
    //     var t_end = resv.end;

    //     // moment data            
    //     var m_start = moment(t_start, "hh:mm");
    //     var m_interval = parseInt(t_interval);
    //     var m_end = moment(t_end, "hh:mm");
    //     var m_diff = m_end.diff(m_start, "minutes");
    //     var m_time = m_start;

    //     var resv_array = [];

    //     for (num = 0; num <= m_diff; num += m_interval) {
    //         if (num > 0) {
    //             m_time = m_start.add(m_interval, "minutes");
    //         }
    //         var f_time = m_time.format("hh:mm a");
    //         var RESV = {
    //             date: resv.date,
    //             time: f_time,
    //             restaurantId: resv.restaurantId
    //         }
    //         console.log(RESV);
    //         resv_array.push(RESV);
    //     }
    //     // post ajax call to create a new restaurant
    //     $.post("/api/resv/create", { resv_array }, function (data) {
    //         //getRESV();
    //         console.log(data);
    //     });
    // }

        // create the list of reservations
    // function createRESV(req) {
    //     var div = $('<div class="panel-body">');
    //     for (i in req) {
    //         // data
    //         console.log(req[i]);
    //         var resv_id = req[i].id;
    //         var resv_date = req[i].date;
    //         var t_start = req[i].start;
    //         var t_interval = req[i].interval;
    //         var t_end = req[i].end;

    //         // moment data            
    //         var m_start = moment(t_start, "hh:mm");
    //         var m_interval = parseInt(t_interval);
    //         var m_end = moment(t_end, "hh:mm");
    //         var m_diff = m_end.diff(m_start, "minutes");
    //         var m_time = m_start;

    //         // html tags
    //         var heading = "heading" + resv_id;
    //         var aria = "collapse" + resv_id;
    //         var div1 = $('<div class="panel panel-default">');
    //         var div2 = $('<div class="panel-heading" role="tab">');
    //         div2.attr("id", heading);
    //         var h4 = $('<h4 class="panel-title">');
    //         var aTag = $('<a role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" >');
    //         aTag.text(resv_date);
    //         aTag.attr("href", "#" + aria);
    //         aTag.attr("aria-controls", aria);
    //         var div3 = $('<div class="panel-collapse collapse in" role="tabpanel">');
    //         div3.attr("id", aria);
    //         div3.attr("aria-labelledby", heading);
    //         var div4 = $('<div class="panel-body">');
    //         div2.append(aTag);
    //         div1.append(div2);

    //         var ul = $("<ul class='list-group'>");
    //         for (num = 0; num <= m_diff; num += m_interval) {
    //             if (num > 0) {
    //                 m_time = m_start.add(m_interval, "minutes");
    //             }
    //             var f_time = m_time.format("hh:mm a");
    //             var f_id = m_time.format("HH:mm");

    //             var btn = $('<a class="btn btn-default btn-route" role="button">');
    //             btn.text(f_time);
    //             btn.attr('reservation-id', resv_id);
    //             btn.attr('time-id', f_id);
    //             div4.append(btn);
    //             m_start = m_time;
    //         }
    //         div3.append(div4);
    //         div2.append(div3);
    //         div1.append(div2);
    //         div.append(div1);
    //     }
    //     $("#accordion").html(div);
    // }