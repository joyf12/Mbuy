/*
 * @Author: zhengwei
 * @Date:   2016-11-23 23:23:00
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-24 20:31:18
 */

'use strict';
$(function() {
    setCategoryTitle();

    function setCategoryTitle() {
        $.ajax({
            url: "http://192.168.45.27:9090/api/getcategorytitle",
            success: function(data) {
                var html = template("categoryTitleTmp", data);
                $("#category > .panel-group").html(html);
                var categoryTitle = $("#category > .panel-group > .panel-default > .panel-heading > h4 > a");
                // console.log(categoryTitle);
                categoryTitle.on("click", function(e) {
                    // 如果使用attr获取属性值的方式要加data-
                    // console.log($(this).attr("data-titleid"));
                    // 如果是使用data方法获取自定义属性的方式不需要加data-
                    // console.log($(this).data("titleid"));
                    var titleId = $(this).data("titleid");
                    $.ajax({
                        url: "http://192.168.45.27:9090/api/getcategory?titleid=" + titleId,
                        success: function(data) {
                            // console.log(data);
                            var html = template("categoryTmp", data);
                            //要将模板放到 当前点击元素对应的panel-body里面
                            // console.log(e.target);
                            var panelBody = $(e.target).parent().parent().parent().find(".panel-collapse").find('.panel-body');
                            panelBody.html(html);
                            var categoryList = panelBody.find('.row > div');
                            var count = categoryList.length % 3 || 3;
                            panelBody.find(".row > div:nth-last-child(-n+" + count + ")").css("border-bottom", "0");
                        }
                    })
                });
            }
        })
    }
})
