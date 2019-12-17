/* 30,96,81 2015-12-04 15:36:32 */
$(function() {
    $.extend({
        brand: function(main, sub, btn, json) {
            var tempHTML = [ "<li>选品牌</li>" ], temp_id = [], temp_name = [];
            for (var obj in json) {
                for (var val in json[obj]["id"]) {
                    if (typeof json[obj]["id"][val] == "string") {
                        temp_id.push(json[obj]["id"][val]);
                        temp_name.push(json[obj]["name"][val]);
                    }
                }
                tempHTML.push('<li class="sgroup">' + obj.toUpperCase() + "</li>");
                for (var i = 0, len = temp_id.length; i < len; i++) {
                    var json_id = temp_id[i];
                    var json_name = temp_name[i];
                    tempHTML.push('<li class="noption" value="' + json_id + '">' + json_name + "</li>");
                }
                temp_id = [], temp_name = [];
            }
            $(main).append(tempHTML.join(""));
            var brandTitle = $("[node-type=brandTitle]", $(".searchCars"));
            var typeTitle = $("[node-type=typeTitle]", $(".searchCars"));
            $("[node-type=brand]", $(".searchCars")).on("click", function() {
                $(main).show();
                $(sub).hide();
                return false;
            });
            $("[node-type=type]", $(".searchCars")).on("click", function() {
                if (!!$(sub).attr("disabled") && $(sub).attr("disabled") === "disabled") {
                    return false;
                }
                $(sub).show();
                $(main).hide();
                return false;
            });
            $(main).on("click", "li:not(.sgroup)", function(e) {
                var tempHTML = [], temp_id = [], temp_name = [];
                var _target = e.target;
                var pid = $(_target).attr("value");
                $(sub).empty().removeAttr("disabled").append("<li>选车型</li>");
                brandTitle.text($(_target).text());
                $.getJSON("http://data.auto.sina.com.cn/car_compare_new/ajax/getSubs2search.php?bid=" + pid + "&callbk=?", function(json) {
                    json = eval(json);
                    for (var obj in json) {
                        for (var val in json[obj]) {
                            if (json[obj][val]["subid"] != 0) {
                                temp_id.push(json[obj][val]["subid"]);
                                temp_name.push(json[obj][val]["subname"]);
                            }
                        }
                        if (temp_id.length == 0) {
                            tempHTML.push('<li value="">暂无相关在产车型</li>');
                        } else {
                            tempHTML.push('<li class="sgroup" > ' + json[obj]["f"]["subname"] + "</li>");
                            for (var i = 0, len = temp_id.length; i < len; i++) {
                                var json_id = temp_id[i];
                                var json_name = temp_name[i];
                                tempHTML.push('<li class="noption"value="' + json_id + '">' + json_name + "</li>");
                            }
                        }
                        temp_id = [], temp_name = [];
                    }
                    $(sub).append(tempHTML.join(""));
                    if ($(sub).children().length === 1) {
                        $(sub).attr("disabled", "disabled");
                    }
                });
                $(main).attr("value", pid);
                $(main).hide();
                typeTitle.text("选车型");
                e.stopPropagation();
            });
            $(sub).on("click", "li:not(.sgroup)", function(e) {
                var _target = e.target;
                var pid = $(_target).attr("value");
                typeTitle.text($(_target).text());
                $(sub).attr("value", pid).hide();
                e.stopPropagation();
            });
            $("body").on("click", function(e) {
                $(sub).hide();
                $(main).hide();
            });
            if (btn && btn != "") $(btn).click(function() {
                var subid = $(sub).attr("value"), bid = $(main).attr("value"), url='http://data.auto.sina.com.cn/';
                if (bid != "选品牌" && bid != "" && bid !== "0" && !!bid) {
                    if (subid != "选车型" && subid != "" && subid !== "0" && !!subid) {
                        url += subid + "/"+'?indexflag=sinahome&bid='+bid +'&subid=' +subid;
                    } else {
                        url +=  '?indexflag=sinahome&bid='+bid;
                    }
                } else {
                     url +=  '?indexflag=sinahome';
                }
                window.open(url);
                return false;
            });
        }
    });
    $("#J_tType").attr("disabled", "disabled");
    $.getJSON("http://data.auto.sina.com.cn/car_compare_new/ajax/getBrands2searchNew.php?callbk=?", function(brands) {
        $.brand("#J_tBrand", "#J_tType", "#J_searchType", brands);
    });
});