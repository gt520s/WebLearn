import $ from "jquery"
import '../asset/1.css'

$(function () {
    $('.box').click(function () {
        $(this).addClass('active');
    })
})