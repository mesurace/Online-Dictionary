/**
 * Created by sureshadhikari on 12/16/2016.
 */
"use strict";
var getresult = (function () {

    var callajax = function () {
        $.ajax("http://localhost:8080/OnlineDictionary/DictServlet", {
            "type": "post",
            dataType: 'json',
            "data": {
                "searchkey": $("#search").val()
            }
        })
                .done(function (data) {
                    $("#content").empty();
                    $("#content").removeClass("redtext");
                    if (data.length) {
                        $("#text").html($("#search").val().toUpperCase());
                        $.each(data, function (i, item) {
                            if (item.wordtype === "") {
                                $("#content").append($("<li> " + item.definition + "</li>"));

                            } else {
                                $("#content").append($("<li><span>(" + item.wordtype + ")</span> :: " + item.definition + "</li>"));
                            }
                        });
                    } else {
                        $("#text").empty();
                        $("#content").html("<p>No result found</p>").addClass("redtext");
                        ;

                    }

                })
                .fail(function (errMsg) {
                    alert(errMsg);
                }).always(function () {
            $("#loader").hide();
        });
        $("#loader").show();
    };

    var callautosearch = function () {
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "http://localhost:8080/OnlineDictionary/AutoSearch",
            data: {
                "searchkey": $("#search").val()
            },
            success: function (data) {
                var availableTags = [];
                $.each(data, function (i, item) {
                    availableTags.push(item.word);
                });
                $("#search").autocomplete({
                    autoFocus: true,
                    source: availableTags,
                    select: function (event, ui) {
                        callajax();
                        return false;
                    }

                });

            }
        });
    };

    return {
        result: function () {
            $("#text").empty();
            if ($("#search").val().length === 0) {
                $("#content").empty();
                $("#content").html("Please enter a text to search!!!");
                $("#content").addClass("redtext");
            } else {
                callajax();
            }
        },
        autosearch: function () {
            callautosearch();
        },
        enterpress: function (e) {
            var key = e.which;
            if (key === 13)
            {
                e.preventDefault();
                getresult.result();
            }
        }
    };
})();

$(document).ready(function () {
    $("#btnsearch").click(getresult.result);
    $("#search").keyup(getresult.autosearch);
    $('#search').keypress(getresult.enterpress);
});