$(function () {
    let selector = {
        container_id: 'anim_container',
        anim_count: 0,
        anim_length: 4,
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
        this._counter = _selector.anim_count;
        this._length = _selector.anim_length;
        this._input_arr = _selector.input_arr;
        this._video_audio = _selector.video_audio;
        this._run_length = {
            _duration: 0,
            _video_length: 0
        };
        this._run_length._duration = () => {
            // for (let i = 0; i < this._input_arr.length; i++) {
            for (let k = 0; k < this._input_arr[this._counter].length; k++) {
                this._duration += this._input_arr[this._counter][k].delay;
            }
            // }
            return this._duration;
        };
        this._run_length._video_length = () => {
            for (let i = 0; i < this._video_audio.length; i++) {
                this._video_length += this._video_audio[i].length;
            }
            return this._video_length;
        };
    }

    //scroll binder element
    let box;


    //initiator
    (function () {
        var scene = new _process_input(selector);
        box = document.querySelector('#' + scene._selector);
        // $('body').css('overflow','hidden');
        $(document).on('scroll', function (e) {
            if ($(document).scrollTop() < $('#' + scene._selector).height()) {
                console.log('yes');
            } else {
                console.log('no');
            }

            // for (let i = 0; i < scene._length; i++) {
            for (let i = 0; i < 1; i++) {
                console.log(scene._run_length._duration());
                setTimeout(function () {
                    $('body').css('overflow','auto');
                    disableScroll();
                    console.log('disabled');
                    // enableScroll();
                }, scene._run_length._duration());
                scene._counter++;
                //console.log(scene._counter);
            }
            scene._counter = 0;
            //console.log(scene._counter);
        });


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