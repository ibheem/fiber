$(function () {
    let selector = {
        container_id: 'anim_container',
        video_audio: [{
                selector: '[data-_video=first]',
                action: 'play/pause',
                length: 2000
            },
            {
                selector: '[data-_video=second]',
                action: 'play/pause',
                length: 2000
            },
            {
                selector: '[data-_video=third]',
                action: 'play/pause',
                length: 2000
            },
            {
                selector: '[data-_video=third]',
                action: 'play/pause',
                length: 2000
            }
        ],
        input_arr: [
            [{
                    selector: '[data-_fiber=first]',
                    action: [{
                        act: 'remove',
                        class: 'hidden',
                    }, {
                        act: 'add',
                        class: 'animated fadeInDown',
                    }],
                    delay: 200
                },
                {
                    selector: '[data-_fiber=second]',
                    action: [{
                        act: 'remove',
                        class: 'hidden',
                    }, {
                        act: 'add',
                        class: 'animated fadeInDown',
                    }],
                    delay: 200
                }
            ],
            [{
                    selector: '[data-_fiber=first]',
                    action: 'add/remove/toggle',
                    class: '',
                    delay: 200
                },
                {
                    selector: '[data-_fiber=second]',
                    action: 'add/remove/toggle',
                    class: '',
                    delay: 200
                }
            ],
            [{
                    selector: '[data-_fiber=third]',
                    action: 'add/remove/toggle',
                    class: '',
                    delay: 200
                },
                {
                    selector: '[data-_fiber=third]',
                    action: 'add/remove/toggle',
                    class: '',
                    delay: 200
                }
            ]
        ],
    }

    function _process_input(_selector) {
        this._selector = _selector.container_id;
        this._duration = 0;
        this._video_length = 0;
        this._length = _selector.input_arr.length;
        this._input_arr = _selector.input_arr;
        this._video_audio = _selector.video_audio;
        this._run_length = {
            _duration: 0,
            _video_length: 0
        };

        this._run_length._video_length = () => {
            for (let i = 0; i < this._video_audio.length; i++) {
                this._video_length += this._video_audio[i].length;
            }
            return this._video_length;
        };
    }
    _process_input.prototype.calcDelay = (z, i) => {
        for (let k = 0; k < z._input_arr[i].length; k++) {
            z._duration += z._input_arr[i][k].delay;
        }
    };

    //scroll binder element (declaration)
    let box;
    let repeater = 0;
    let lastScrollTop = 0;
    //initiator block
    (function () {
        var scene = new _process_input(selector);
        box = document.querySelector('#' + scene._selector);

        //scroll vendor block
        $(document).on('mousewheel DOMMouseScroll', playScroll);

        function playScroll(e) {
            if (typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
                if (e.originalEvent.detail > 0) {
                    console.log('Down');

                    // block
                    if ($(document).scrollTop() < $('#' + scene._selector).height()) {
                        $(document).scrollTop(0);
                        scene._duration = 0;
                        if (repeater < scene._length) {
                            scene.calcDelay(scene, repeater);
                            repeater++;
                           // console.log('ohh! yo!' + repeater + " laLiga " + scene._length);
                        }
                        //disableScroll();
                        $(document).off('scroll');
                        // $('#' + scene._selector).off('scroll');
                        setTimeout(function () {
                            //$(document).on('scroll', playScroll);
                            $(document).on('scroll');
                            $(document).on('scroll', playScroll);
                            // $('#' + scene._selector).on('scroll');
                            //enableScroll();
                            //console.log('enabled');
                        }, scene._duration);
                    } else {
                        console.log('no');
                    }
                    //./block
                } else if (e.originalEvent.detail < 0) {
                    console.log('Up');
                    // block
                    if ($(document).scrollTop() < $('#' + scene._selector).height()) {
                        $(document).scrollTop(0);
                        scene._duration = 0;
                        if (repeater < scene._length && repeater > 0) {
                            repeater--;
                            scene.calcDelay(scene, repeater);
                            console.log('ohh! no!' + repeater + " aaLiga " + scene._length);
                        }
                        //disableScroll();
                        $(document).off('scroll');
                        // $('#' + scene._selector).off('scroll');
                        setTimeout(function () {
                            //$(document).on('scroll', playScroll);
                            $(document).on('scroll');
                            $(document).on('scroll', playScroll);
                            // $('#' + scene._selector).on('scroll');
                            //enableScroll();
                            //console.log('enabled');
                        }, scene._duration);
                    } else {
                        console.log('no');
                    }
                    //./block
                }
            } else if (typeof e.originalEvent.wheelDelta == 'number') {
                if (e.originalEvent.wheelDelta < 0) {
                    //console.log('Down');
                    // block
                    if ($(document).scrollTop() < $('#' + scene._selector).height()) {
                        $(document).scrollTop(0);
                        scene._duration = 0;
                        if (repeater < scene._length) {
                            scene.calcDelay(scene, repeater);
                            repeater++;
                            //console.log('ohh! yo!' + repeater + " laLiga " + scene._length);
                        }
                        //disableScroll();
                        $(document).off('scroll');
                        // $('#' + scene._selector).off('scroll');
                        setTimeout(function () {
                            //$(document).on('scroll', playScroll);
                            $(document).on('scroll');
                            $(document).on('scroll', playScroll);
                            // $('#' + scene._selector).on('scroll');
                            //enableScroll();
                            //console.log('enabled');
                        }, scene._duration);
                    } else {
                        console.log('no');
                    }
                    //./block
                } else if (e.originalEvent.wheelDelta > 0) {
                    //console.log('Up');
                    // block
                    if ($(document).scrollTop() < $('#' + scene._selector).height()) {
                        $(document).scrollTop(0);
                        scene._duration = 0;
                        if (repeater < scene._length && repeater > 0) {
                            repeater--;
                            scene.calcDelay(scene, repeater);
                            //console.log('ohh! no!' + repeater + " aaLiga " + scene._length);
                        }
                        //disableScroll();
                        $(document).off('scroll');
                        // $('#' + scene._selector).off('scroll');
                        setTimeout(function () {
                            //$(document).on('scroll', playScroll);
                            $(document).on('scroll');
                            $(document).on('scroll', playScroll);
                            // $('#' + scene._selector).on('scroll');
                            //enableScroll();
                            //console.log('enabled');
                        }, scene._duration);
                    } else {
                        console.log('no');
                    }
                    //./block
                }
            }

        }
    })()



    // for enabling and disabling the scroll

    var keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };

    function preventDefault(e) {
        e = e || box.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (box.addEventListener) // older FF
            box.addEventListener('DOMMouseScroll', preventDefault, false);
        box.onwheel = preventDefault; // modern standard
        box.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        box.ontouchmove = preventDefault; // mobile
        box.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (box.removeEventListener)
            box.removeEventListener('DOMMouseScroll', preventDefault, false);
        box.onmousewheel = document.onmousewheel = null;
        box.onwheel = null;
        box.ontouchmove = null;
        document.onkeydown = null;
    }
});



function newFunction(scene) {
    return scene._run_length._duration();
}
// $('.well').on('mousewheel DOMMouseScroll', function (e) {
//     if (this.scrollTop < 100) {
//         var e0 = e.originalEvent;
//         var delta = e0.wheelDelta || -e0.detail;
//         this.scrollTop += (delta < 0 ? 1 : -1) * 30;
//         console.log(this.scrollTop);
//         _process_input(selector);
//         e.preventDefault();
//     } else {
//         console.log(this.scrollTop);
//     }
// });



//object.addEventListener("scroll", myScript);