/**
 * Created by sureshadhikari on 12/16/2016.
 */
"use strict";
var getresult = (function () {

    var callajax = function () {
        $.ajax("http://localhost:8080/Online%20Dictionary/DictServlet", {
            "type": "post",
            dataType: 'json',
            "data": {
                "searchkey": $("#search").val()
            }
        })
                .done(function (data) {

                    $("#content").empty();
                    $.each(data, function (i, item) {
                        var li = $("<li><a></a></li>");
                        $("#content").append(li);
                        if (item.wordtype === "") {
                            $(li).text(item.definition);

                        } else {
                            $(li).text("(" + item.wordtype + ") :: " + item.definition);
                        }
                    });

                })
                .fail(function (errMsg) {
                    alert(errMsg);
                });
    };

    return {
        result: function () {
            callajax();
        }
    };
})();

$(document).ready(function () {
    $("#btnsearch").click(getresult.result);
    $("#search").keyup(function () {
       
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "http://localhost:8080/Online%20Dictionary/AutoSearch",
            data: {
                "searchkey": $("#search").val()
            },
            success: function (data) {
                var availableTags = [];
                $.each(data, function (i, item) {
                   availableTags.push(item.word);
                });
                $("#search").autocomplete({
                    source: availableTags
                });
               
            }
        });
    });
    
});