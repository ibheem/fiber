$(function () {

    // $("body").niceScroll({
    //     cursorcolor: "aquamarine",
    //     cursorwidth: "16px"
    // });
    let selector = {
        container_id: 'anim_container',
        max_repeats: 4,
        video_audio: [{
                selector: '[data-_video=1]',
                action: 'play/pause',
                length: 2000
            },
            {
                selector: '[data-_video=2]',
                action: 'play/pause',
                length: 2000
            },
            {
                selector: '[data-_video=3]',
                action: 'play/pause',
                length: 2000
            }
        ],
        input_arr: [
            [{
                    selector: 'data-_fiber=',
                    action: [{
                        act: 'remove',
                        class: 'hidden',
                    }, {
                        act: 'add',
                        class: 'animated fadeInDown',
                    }],
                    delay: 200,
                    parent:'slide_1'
                },
                {
                    selector: 'data-_fiber=',
                    action: [{
                        act: 'remove',
                        class: 'hidden',
                    }, {
                        act: 'add',
                        class: 'animated fadeInDown',
                    }],
                    delay: 200,
                    parent:'slide_1'
                }
            ],
            [{
                    selector: 'data-_fiber=',
                    action: [{
                        act: 'remove',
                        class: 'hidden',
                    }, {
                        act: 'add',
                        class: 'animated fadeInDown',
                    }],
                    class: '',
                    delay: 200,
                    parent:'slide_2'
                },
                {
                    selector: 'data-_fiber=',
                    action: [{
                        act: 'remove',
                        class: 'hidden',
                    }, {
                        act: 'add',
                        class: 'animated fadeInDown',
                    }],
                    class: '',
                    delay: 200,
                    parent:'slide_2'
                }
            ],
            [{
                    selector: 'data-_fiber=',
                    action: [{
                        act: 'remove',
                        class: 'hidden',
                    }, {
                        act: 'add',
                        class: 'animated fadeInDown',
                    }],
                    class: '',
                    delay: 200,
                    parent:'slide_3'
                },
                {
                    selector: 'data-_fiber=',
                    action: [{
                        act: 'remove',
                        class: 'hidden',
                    }, {
                        act: 'add',
                        class: 'animated fadeInDown',
                    }],
                    class: '',
                    delay: 200,
                    parent:'slide_3'
                }
            ]
        ],
    }

    //scroll binder element (declaration)
    let box;
    let repeater = 0;
    let lastScrollTop = 0;
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
        // box.onwheel = preventDefault; // modern standard
        // box.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        // box.ontouchmove = preventDefault; // mobile
        box.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (box.removeEventListener)
            box.removeEventListener('DOMMouseScroll', preventDefault, false);
        // box.onmousewheel = document.onmousewheel = null;
        // box.onwheel = null;
        // box.ontouchmove = null;
        document.onkeydown = null;
    }


    function _process_input(_selector) {
        this._selector = _selector.container_id;
        this._duration = 0;
        this._max_repeats = _selector._max_repeats;
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
    _process_input.prototype.calcVidLength = (z, i) => {
        for (let i = 0; i < z._video_audio.length; i++) {
            z._video_length += z._video_audio[i].length;
        }
    };
    _process_input.prototype.calcDelay = (z, i) => {
        for (let k = 0; k < z._input_arr[i].length; k++) {
            z._duration += z._input_arr[i][k].delay;
        }
    };
    _process_input.prototype.runAnimator = (z, i) => {
        for (let k = 0; k < z._input_arr[i].length; k++) {
            console.log(z._input_arr[i][k]);
            for (let j = 0; j < z._input_arr[i][k].action.length; j++) {
                $('#slide_'+(j+1)).addClass('hidden');
                // switch (z._input_arr[i][k].action[j].act) {
                //     case 'remove':
                //     $(z._input_arr[i][k].selector).addClass(''+z._input_arr[i][k].action[j].class);
                //         break;
                //     case 'add':
                //     $(z._input_arr[i][k].selector).removeClass(''+z._input_arr[i][k].action[j].class);
                //         break;
                //     case 'toggle':
                //     $(z._input_arr[i][k].selector).toggleClass(''+z._input_arr[i][k].action[j].class);
                //         break;
                // }
            }
            $('#slide_'+i).removeClass('hidden');
            for (let j = 0; j < z._input_arr[i][k].action.length; j++) {
                setTimeout(function () {
                    switch (z._input_arr[i][k].action[j].act) {
                        case 'remove':
                        $('['+z._input_arr[i][k].selector+i+']').removeClass(''+z._input_arr[i][k].action[j].class);
                            break;
                        case 'add':
                        $('['+z._input_arr[i][k].selector+i+']').addClass(''+z._input_arr[i][k].action[j].class);
                            break;
                        case 'toggle':
                        $('['+z._input_arr[i][k].selector+i+']').toggleClass(''+z._input_arr[i][k].action[j].class);
                            break;
                    }
                    
                }, z._input_arr[i][k].delay);
            }

        }
    };


    //initiator block
    (function () {
        var scene = new _process_input(selector);
        box = document.querySelector('#' + scene._selector);

        //scroll vendor block
        $(document).on('mousewheel DOMMouseScroll', playScroll);


        function playScroll(e) {

            disableScroll(); //disables scrolling via keys
            if (typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
                if (e.originalEvent.detail > 0) {
                    console.log('Down');

                    // block
                    if ($(document).scrollTop() < $('#' + scene._selector).height()) {
                        $(document).scrollTop(0);
                        scene._duration = 0;
                        if (repeater < scene._length) {
                            console.log('are baba');
                            scene.calcDelay(scene, repeater);
                            $(document).scrollTop(0);
                            $(document).off('mousewheel DOMMouseScroll');
                            scene.runAnimator(scene, repeater);
                            setTimeout(function () {
                                // $(document).on('scroll');
                                $(document).on('mousewheel DOMMouseScroll');
                                $(document).on('mousewheel DOMMouseScroll', playScroll);
                                if (repeater == scene._max_repeats)
                                    enableScroll();
                                repeater++;
                                console.log('ohh! yo!' + repeater + " laLiga " + scene._length);
                            }, scene._duration);

                        }
                        //disableScroll();

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
                            console.log('na re baba');
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
                            console.log('aaa');
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


});
