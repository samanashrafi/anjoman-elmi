/*!

=========================================================
* Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

"use strict";
function convert(a) {
    return ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'][a];
}
function walkNode(node) {
    if (node.nodeType == 3) {
        // Do your replacement here
        node.data = node.data.replace(/\d/g, convert);
    }

    // Also replace text in child nodes
    for (var i = 0; i < node.childNodes.length; i++) {
        walkNode(node.childNodes[i]);
    }
}

walkNode(document.getElementsByTagName('body')[0]);
$(document).ready(function () {

    // Collapse navigation
    $('.navbar-main .collapse').on('hide.bs.collapse', function () {
        var $this = $(this);
        $this.addClass('collapsing-out');
    });

    $('.navbar-main .collapse').on('hidden.bs.collapse', function () {
        var $this = $(this);
        $this.removeClass('collapsing-out');
    });

    $('.navbar-main .dropdown').on('hide.bs.dropdown', function () {
        var $this = $(this).find('.dropdown-menu');

        $this.addClass('close');

        setTimeout(function () {
            $this.removeClass('close');
        }, 200);

    });

    // Headroom - show/hide navbar on scroll
    // if($('.headroom')[0]) {
    //     var headroom  = new Headroom(document.querySelector("#navbar-main"), {
    //         offset: 300,
    //         tolerance : {
    //             up : 30,
    //             down : 30
    //         },
    //     });
    //     headroom.init();
    // }

    // Datepicker
    $('.datepicker')[0] && $('.datepicker').each(function () {
        $('.datepicker').datepicker({
            disableTouchKeyboard: true,
            autoclose: false
        });
    });

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Popover
    $('[data-toggle="popover"]').each(function () {
        var popoverClass = '';
        if ($(this).data('color')) {
            popoverClass = 'popover-' + $(this).data('color');
        }
        $(this).popover({
            trigger: 'focus',
            template: '<div class="popover ' + popoverClass + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        })
    });

    // Additional .focus class on form-groups
    $('.form-control').on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    // NoUI Slider
    if ($(".input-slider-container")[0]) {
        $('.input-slider-container').each(function () {

            var slider = $(this).find('.input-slider');
            var sliderId = slider.attr('id');
            var minValue = slider.data('range-value-min');
            var maxValue = slider.data('range-value-max');

            var sliderValue = $(this).find('.range-slider-value');
            var sliderValueId = sliderValue.attr('id');
            var startValue = sliderValue.data('range-value-low');

            var c = document.getElementById(sliderId),
                d = document.getElementById(sliderValueId);

            noUiSlider.create(c, {
                start: [parseInt(startValue)],
                connect: [true, false],
                //step: 1000,
                range: {
                    'min': [parseInt(minValue)],
                    'max': [parseInt(maxValue)]
                }
            });

            c.noUiSlider.on('update', function (a, b) {
                d.textContent = a[b];
            });
        })
    }

    if ($("#input-slider-range")[0]) {
        var c = document.getElementById("input-slider-range"),
            d = document.getElementById("input-slider-range-value-low"),
            e = document.getElementById("input-slider-range-value-high"),
            f = [d, e];

        noUiSlider.create(c, {
            start: [parseInt(d.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
            connect: !0,
            range: {
                min: parseInt(c.getAttribute('data-range-value-min')),
                max: parseInt(c.getAttribute('data-range-value-max'))
            }
        }), c.noUiSlider.on("update", function (a, b) {
            f[b].textContent = a[b]
        })
    }


    // When in viewport
    $('[data-toggle="on-screen"]')[0] && $('[data-toggle="on-screen"]').onScreen({
        container: window,
        direction: 'vertical',
        doIn: function () {
            //alert();
        },
        doOut: function () {
            // Do something to the matched elements as they get off scren
        },
        tolerance: 200,
        throttle: 50,
        toggleClass: 'on-screen',
        debug: false
    });

    // Scroll to anchor with scroll animation
    $('[data-toggle="scroll"]').on('click', function (event) {
        var hash = $(this).attr('href');
        var offset = $(this).data('offset') ? $(this).data('offset') : 0;

        // Animate scroll to the selected section
        $('html, body').stop(true, true).animate({
            scrollTop: $(hash).offset().top - offset
        }, 600);

        event.preventDefault();
    });


    $('#fm-contact').validate({
        rules: {
            name: {
                minlength: 2,
                required: true
            },
            email: {
                required: true,
                email: true,
            },
            tel: {
                minlength: 8,
                required: true,
            },
            msg: {
                required: true
            }
        },

        messages: {
            name: "وارد کردن نام و نام خانوادگی الزامی می باشد",
            email: "وارد کردن ایمیل الزامی می باشد.",
            tel: "وارد کردن تلفن الزامی می باشد.",
            msg: "وارد کردن پیغام الزامی می باشد.",
        },


    });

    $('#fm-signup').validate({
        rules: {
            username: {
                minlength: 10,
                required: true
            },
            name: {
                minlength: 8,
                required: true
            },
            email: {
                required: true,
                email: true,
            },
            tel: {
                minlength: 8,
                required: true,
            },
            password: {
                minlength: 6,
                required: true
            }
        },

        messages: {
            username: "وارد کردن نام کاربری الزامی می باشد",
            name: "وارد کردن نام و نام خانوادگی الزامی می باشد",
            email: "وارد کردن ایمیل الزامی می باشد.",
            tel: "وارد کردن تلفن الزامی می باشد.",
            password: "وارد کردن کلمه عبور الزامی می باشد.",
        },

    });

    $('#fm-login').validate({
        rules: {
            email: {
                required: true,
                email: true,
            },
            password: {
                minlength: 6,
                required: true
            }
        },
        messages: {
            email: "وارد کردن ایمیل الزامی می باشد.",
            password: "وارد کردن کلمه عبور الزامی می باشد."
        },
    });
    


});
