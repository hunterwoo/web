/**
 * Created by Administrator on 2016/5/8 0008.
 */

$(function () {
    createParticle({
        type           : 'polygon',
        '_id'          : 'section_1_canvas',
        "onclickTarget": $(".main_cell"),
        getSideLength  : function () {
            return 4;
        },
        getRadius      : function () {
            return Math.random() * Math.random() * Math.random() * 200
        },
        getInitialAngle: function () {
            return 0
        }
    });

    var $ele = $('.sub-head-line span');
    var textArray = ["Front End Developer", "Front End Developer", "Front End Developer", "Front End Developer"];
    new TxtRotate($ele[0], textArray, 1000);
})