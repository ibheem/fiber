$(function () {
    $(document).scrollTop(0);

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
        for (let k = 0; k < z._input_arr[i].length; k++) {
            z._duration += z._input_arr[i][k].delay;
        }
    };
    _process_input.prototype.animatorDown = (z, i) => {
        for (let k = 0; k < z._input_arr[i].length; k++) {
            console.log("running for "+i);
            for (let j = 0; j < z._input_arr[i][k].action.length; j++) {
                $('#slide' + (j + 1)).addClass('hidden');
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
        const animateDown_1 = new Promise((resolve, reject) => {
            $(document).on('mousewheel DOMMouseScroll', (e) => {
                if (scene._repeater < scene._max_repeats) {
                    $(window).mousewheel(function (turn, delta) {
                        $('body,html').animate({
                            scrollTop: 0
                        });
                        if (delta == 1) {
                            console.log('up');
                        } else {
                            console.log('down' + Object.keys(turn));
                            scene._repeater = 1;
                            scene.animatorDown(scene, scene._repeater);
                            setTimeout(() => {
                                enableScroll();
                                resolve(scene.playVideo(scene, scene._repeater));
                            }, scene._duration);
                        }
                    });
                }
            });
        });
        function nextSprint_1() {
            const animateDown_2 = new Promise((resolve, reject) => {
               // (function () {
                    $(document).on('mousewheel DOMMouseScroll', (e) => {
                        if (scene._repeater < scene._max_repeats) {
                            $(window).mousewheel(function (turn, delta) {
                                $('body,html').animate({
                                    scrollTop: 0
                                });
                                if (delta == 1) {
                                    console.log('up');
                                } else {
                                    console.log('down' + " " + turn);
                                    scene._repeater = 2;
                                    scene.animatorDown(scene, scene._repeater);
                                    setTimeout(() => {
                                        $(document).off('mousewheel DOMMouseScroll')
                                        resolve(scene.playVideo(scene, scene._repeater));
                                    }, scene._duration);
                                }
                            });
                        }
                    });
                }, scene);
           // });
            return (animateDown_2);
        }
        function nextSprint_2() {
            console.log('ok baby');
            const animateDown_3 = new Promise((resolve, reject) => {
               // (function () {
                    $(document).on('mousewheel DOMMouseScroll', (e) => {
                        if (scene._repeater < scene._max_repeats) {
                            $(window).mousewheel(function (turn, delta) {
                                $('body,html').animate({
                                    scrollTop: 0
                                });
                                if (delta == 1) {
                                    console.log('up');
                                } else {
                                    console.log('down' + " " + turn);
                                    scene._repeater = 3;
                                    scene.animatorDown(scene, scene._repeater);
                                    setTimeout(() => {
                                        $(document).off('mousewheel DOMMouseScroll')
                                        resolve(scene.playVideo(scene, scene._repeater));
                                    }, scene._duration);
                                }
                            });
                        }
                    });
                }, scene);
           // });
            return (animateDown_3);
        }

        getInit
            .then(flag => {
                console.log(flag);
            })
            .then(flag => {
                console.log(flag);
                if (scene._repeater === 0)
                    return (animateDown_1);
            })
            .then(flag => {
                console.log(flag);
                return (nextSprint_1());
            })
            .then(flag => {
                console.log(flag);
                return (nextSprint_2());
            })
        // .then(() => {
        //     return (animateDown_2.reject());
        // })
        // .then(() => {
        //    // setTimeout(() => {
        //         return (animateDown_3.reject());
        //     //}, 10000);

        // })
    })()
});
