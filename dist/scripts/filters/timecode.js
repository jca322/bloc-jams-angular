(function() {
    function timecode(SongPlayer, Fixtures) {
        /*return function(seconds) {
            var seconds = Number.parseFloat(seconds);
            
            if(Number.isNaN(seconds)) {
                return '-:--';
            }
            
            var wholeSeconds = Math.floor(seconds);
            var minutes = Math.floor(wholeSeconds / 60);
            var remainingSeconds = wholeSeconds % 60;
            
            var output = minutes + ':';
            
            if (remainingSeconds < 10) {
                output += '0';
            }
            
            output += remainingSeconds;
            
            return output;
        };*/
        var currentBuzzObject = null;
        
        return function(song) {
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            timer = buzz.toTimer(currentBuzzObject.getDuration());
            return timer;
        };
        
    }
    
    angular
        .module('blocJams')
        .filter('timecode', ['SongPlayer', 'Fixtures', timecode]);
})();
