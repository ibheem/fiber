$(function () {
    let _fiber = {};
    
    // first promise getInit
    // scroll flag up 2nd promise animatorUp
    // scroll flag down 3rd promise animatorDown
    // animatorDown :: if animator completes the last run remove the scroll stop event
    // scroll bind and unbind function
    // if animatorUp :: if animator completes the last run no action; no more animatorUp will be-
    // -called on scroll up event.
    // animatorUp will be called (if repeater value is greater than min value)
    // 
    // animatorDown will be called (if repeater value is less than max value and greater than min value)
    // after the max value for repeater is reached and scroll down is fired a function with scroll
    // - event will be called every time.
    
    

    // $('.well').on('mousewheel DOMMouseScroll', function (e) {
    //     var e0 = e.originalEvent;
    //     var delta = e0.wheelDelta || -e0.detail;
    //     this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    //     console.log(this.scrollTop);
    //     e.preventDefault();
    // });

    // looking for playing or paused
    // Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    //     get: function () {
    //         return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    //     }
    // })
    // if (document.querySelector('video').playing) { // checks if element is playing right now
    //     // Do anything you want to
    // }

    //calling function by scroll
    // var last_known_scroll_position = 0;
    // var tracker = false;

    // function doSomething(scroll_pos) {
    //     console.log('baba');
    // }

    // window.addEventListener('scroll', function (e) {
    //     last_known_scroll_position = window.scrollY;
    //     if (!tracker) {
    //         window.requestAnimationFrame(function () {
    //             if (last_known_scroll_position <= 500) {
    //                 doSomething(last_known_scroll_position);
    //             }
    //             tracker = false;
    //         });
    //         tracker = true;
    //     }
    // });

    //promise based

    const getIDs = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([523, 883, 432, 974]);
        }, 1500);
    });

    const getRecipe = recID => {
        return new Promise((resolve, reject) => {
            setTimeout(ID => {
                const recipe = {
                    title: 'Fresh tomato pasta',
                    publisher: 'Jonas'
                };
                resolve(`${ID}: ${recipe.title}`);
            }, 1500, recID);
        });
    };

    const getRelated = publisher => {
        return new Promise((resolve, reject) => {
            setTimeout(pub => {
                const recipe = {
                    title: 'Italian Pizza',
                    publisher: 'Jonas'
                };
                resolve(`${pub}: ${recipe.title}`);
            }, 1500, publisher);
        });
    };

    getIDs
        .then(IDs => {
            console.log(IDs);
            return getRecipe(IDs[2]);
        })
        .then(recipe => {
            console.log(recipe);
            return getRelated('Jonas Schmedtmann');
        })
        .then(recipe => {
            console.log(recipe);
        })
        .catch(error => {
            console.log('Error!!');
        });







    
});