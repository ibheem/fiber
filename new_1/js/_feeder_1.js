$(function () {

    $(document).scrollTop(0);
    // $('body,html').animate({
    //     scrollTop: 0
    // }, 100);
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
        },
        {
            selector: '[data-_video=4]',
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
                parent: 'slide1'
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
                parent: 'slide1'
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
                parent: 'slide2'
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
                parent: 'slide2'
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
                parent: 'slide3'
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
                parent: 'slide3'
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
                parent: 'slide4'
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
                parent: 'slide4'
            }
            ]
        ],
    }
    //scroll binder element (declaration)
    let box;

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
        this._repeater = 0;
        this._duration = 0;
        this._max_repeats = _selector.max_repeats;
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
        for (let i = 0; i < repeater; i++) {
            let myVideo = document.getElementById("video" + i(i + 1));
            if (!myVideo.paused)
                myVideo.pause();
        }
        return true;
    };
    _process_input.prototype.playVideo = (z, i) => {
        console.log("video" + (i + 1));
        let myVideo = document.getElementById("video" + (i + 1));
        if (myVideo.paused) {
            myVideo.play();
        }
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
        for (let k = 0; k < z._input_arr[i].length; k++) {
            z._duration += z._input_arr[i][k].delay;
        }
    };
    _process_input.prototype.animatorDown = (z, i) => {
        console.log('yhan pe' + i);
        console.log(z);
        for (let k = 0; k < z._input_arr[i].length; k++) {
            console.log("running for " + '[' + z._input_arr[i][k].selector + i + ']' + " " + '#slide' + (i + 1));
            // for (let j = 0; j < z._input_arr[i][k].action.length; j++) {

            //     // switch (z._input_arr[i][k].action[j].act) {
            //     //     case 'remove':
            //     //     $(z._input_arr[i][k].selector).addClass(''+z._input_arr[i][k].action[j].class);
            //     //         break;
            //     //     case 'add':
            //     //     $(z._input_arr[i][k].selector).removeClass(''+z._input_arr[i][k].action[j].class);
            //     //         break;
            //     //     case 'toggle':
            //     //     $(z._input_arr[i][k].selector).toggleClass(''+z._input_arr[i][k].action[j].class);
            //     //         break;
            //     // }
            // }
            for (let l = 0; l < z._max_repeats; l++) {
                $('#slide' + (l + 1)).addClass('hidden');
            }
            $('#slide' + (i + 1)).removeClass('hidden');
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
        let scene = new _process_input(selector);
        box = document.querySelector('#' + scene._selector);
        disableScroll();
        scene.calcDelay(scene, 0);
        const getInit = new Promise((resolve, reject) => {
            scene.animatorDown(scene, scene._repeater);
            setTimeout(() => {
                resolve(scene.playVideo(scene, scene._repeater));
            }, scene._duration);
        });


        getInit
            .then(flag => {
                console.log(flag);
                scene._repeater = 1;
                return (getScroll(scene._repeater));
            });


        function getNextScroll() {
            $(window).unbind('mousewheel');
            enableScroll();
            // $('body,html').animate({
            //     scrollTop: $('.showcase').height()
            // }, 1000);
            console.log('chalo be__');
            window.onscroll = function (e) {
                if (this.oldScroll > this.scrollY) {
                    console.log('up');
                    if (this.scrollY < $('.showcase').height()) {
                        $('body,html').animate({
                            scrollTop: 0
                        }, 500);
                        disableScroll();
                        setTimeout(() => {
                            getScroll(2);
                        }, 700);
                    }
                } else {
                    console.log("down");
                }
                this.oldScroll = this.scrollY;
            }
        }


        function getInScroll(i) {
            getScroll(i);
        }


        function getScroll(i) {
            //$(window).one('scroll', function (turn, delta) {
            $(window).one('mousewheel', function (turn, delta) {
                if (delta == 1) {
                    console.log('up' + i);
                    i = scene._repeater - 1;
                    console.log('up' + scene._repeater);
                    if (i == 0 || i < 0) {
                        scene._repeater = 1;
                        getInScroll(scene._repeater);
                    }
                    else {
                        if (i > 0 && i < scene._max_repeats) {
                            console.log('mere bhai' + scene._repeater);
                            scene._repeater = i - 1;
                            scene.animatorDown(scene, scene._repeater);
                            setTimeout(() => {
                                scene.playVideo(scene, scene._repeater);
                                getScroll(scene._repeater);
                            }, scene._duration);
                        }
                    }
                } else {
                    console.log('down' + " " + turn);
                    scene._repeater = i;
                    if (i < scene._max_repeats) {
                        scene.animatorDown(scene, scene._repeater);
                        setTimeout(() => {
                            scene.playVideo(scene, scene._repeater);
                            scene._repeater++;
                            getScroll(scene._repeater);
                        }, scene._duration);
                    } else {
                        setTimeout(() => {
                            getNextScroll();
                        }, 2000);
                    }

                }
            });

        }
    })()

    //  console.clear();





    //swipe
    var swipable = document.getElementById('swipable');

    var mc = new Hammer(swipable);

    //enable all directions
    mc.get('swipe').set({
        direction: Hammer.DIRECTION_ALL,
        threshold: 1,
        velocity: 0.1
    });

    // listen to events...
    mc.on("swipeleft swiperight", function (ev) {
        console.log(ev.type + " gesture detected.");
    });
});
