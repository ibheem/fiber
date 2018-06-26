$(function () {
    $(document).scrollTop(0);
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
                delay: 500,
                parent: 'slide_1'
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
                delay: 500,
                parent: 'slide_1'
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
                delay: 500,
                parent: 'slide_2'
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
                delay: 500,
                parent: 'slide_2'
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
                delay: 500,
                parent: 'slide_3'
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
                delay: 500,
                parent: 'slide_3'
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


    function _process_input(_selector) {
        this._selector = _selector.container_id;
        this._previous = {};
        this._current = {};
        this._next = {};
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
    }
    _process_input.prototype.onScroll = (z, i) => {
        $(document).on('scroll');
        enableScroll();
    };
    _process_input.prototype.offScroll = (z, i) => {
        $(document).off('scroll');
        disableScroll();
    };
    _process_input.prototype.pauseVideo = (z, i) => {
        let myVideo = document.getElementById("video"+i);
        if (!myVideo.paused)
            myVideo.pause();
    };
    _process_input.prototype.playVideo = (z, i) => {
        let myVideo = document.getElementById("video" + (i + 1));
        if (myVideo.paused)
            myVideo.play();
        return true;
    };
    _process_input.prototype.initLoad = (z, i) => {

    };
    _process_input.prototype.calcVidLength = (z, i) => {
        for (let i = 0; i < z._video_audio.length; i++) {
            z._video_length += z._video_audio[i].length;
        }
    };
    _process_input.prototype.calcDelay = (z, i) => {
        //alert(i+" "+z._input_arr[i].length);
        for (let k = 0; k < z._input_arr[i].length; k++) {
            z._duration += z._input_arr[i][k].delay;
        }
        //alert(z._duration);
    };
    _process_input.prototype.runAnimator = (z, i) => {
        for (let k = 0; k < z._input_arr[i].length; k++) {
            console.log(z._input_arr[i][k]);
            for (let j = 0; j < z._input_arr[i][k].action.length; j++) {
                $('#slide_' + (j + 1)).addClass('hidden');
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
            $('#slide_' + (i + 1)).removeClass('hidden');
            for (let j = 0; j < z._input_arr[i][k].action.length; j++) {
                setTimeout(function () {
                    switch (z._input_arr[i][k].action[j].act) {
                        case 'remove':
                            $('[' + z._input_arr[i][k].selector + i + ']').removeClass('' + z._input_arr[i][k].action[j].class);
                            break;
                        case 'add':
                            $('[' + z._input_arr[i][k].selector + i + ']').addClass('' + z._input_arr[i][k].action[j].class);
                            break;
                        case 'toggle':
                            $('[' + z._input_arr[i][k].selector + i + ']').toggleClass('' + z._input_arr[i][k].action[j].class);
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
        disableScroll();
        scene.calcDelay(scene, 0);
        const getInit = new Promise((resolve, reject) => {
            scene.runAnimator(scene, 0);
            setTimeout(() => {
                resolve(scene.playVideo(scene, 0));
            }, scene._duration);
        });
        getInit
            .then(flag => {
                console.log(flag);
                enableScroll();
                $(window).mousewheel(function (turn, delta) {
                    if (delta == 1) {
                        console.log('up');
                        repeater = 0;
                        scene.runAnimator(scene, repeater);
                    }
                    else {
                        console.log('down');

                    }
                    return false;
                });
                // $(document).on('mousewheel DOMMouseScroll', (e) => {
                //     $(document).scrollTop(0);
                //     disableScroll();
                // });
            })
        //scroll vendor block
        // $(document).on('mousewheel DOMMouseScroll', (e) => {
        //     $(document).scrollTop(0);
        //     playScroll(e);
        // });
        // function playScroll(e) {

        // }
    })()



    // for enabling and disabling the scroll


});
