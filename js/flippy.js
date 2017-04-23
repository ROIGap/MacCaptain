var $ = jQuery;
// extend jQuery
$.fn.extend({
    flippy: function (options) {
        var settings = {
            // stop after iteration through all items
            stop: false,
            // time (seconds) between flipps
            interval: 3,
            // speed (ms) of animations
            speed: 1000,
            // distance to fade out
            distance: "150px"
        };
        settings = $.extend(settings, options);
        return this.each(function () {
            // store instance of this
            var $this = $(this);
            // top position of child element
            var topPo = $this.children().eq(1).css('top');
            // interval counter
            var count = 1;
            // interval
            var timer = setInterval(function () {
                // animate item away
                $this.children().eq(0).animate({
                    top: settings.distance,
                    opacity: 0
                }, settings.speed, function () {
                    // move item to the back of the line
                    $(this).css({
                        top: topPo,
                    }).remove().appendTo($this);
                });
                // animate second item in
                $this.children().eq(1).animate({
                    top: 0,
                    opacity: 1
                }, settings.speed / 5);
                // increment
                count++;
                // if stop is true and count equals list length
                if (settings.stop && count === $this.children().length) {
                    // clear timer
                    clearInterval(timer);
                }
            }, settings.interval * 1000);
        });
    }
});