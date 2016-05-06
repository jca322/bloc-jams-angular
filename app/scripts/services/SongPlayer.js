(function() {
    function SongPlayer(Fixtures) {
        /**
        *@desc empty SongPlayer object
        *@type {Object}
        */
        var SongPlayer = {};
        
        /**
        *@desc stores Fixtures.getAlbum method (albumPicasso) in currentAlbum variable
        *@type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        *@desc Buzz object audio file
        *@type {Object}
        */        
        var currentBuzzObject = null;
        
        /**
        *@function setSong
        *@desc Stops currently playing song and loads new audio file as currentBuzzObject
        *@param {Object} song
        */        
        var setSong = function(song) {
            if(currentBuzzObject) {
                stopSong(song);
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
        
        /**
        *@function playSong
        *@desc Plays current audio file and sets song.playing to true
        *@param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        *@function stopSong
        *@desc Stops current audio file and sets song.playing to null
        *@param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        
        /**
        *@function getSongIndex
        *@desc Returns index of current song
        *@param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        *@desc current song
        *@type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        *@function SongPlayer.play 
        *@desc Checks if current song playing equals the selected song, if not then it sets the current song to the selected song and plays this song.  If current song is the same as the selected song, checks to see if audo file is paused.  If so, it plays selected song.
        *@param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);    
            } else if(SongPlayer.currentSong === song) {
                if(currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /**
        *@function SongPlayer.pause 
        *@desc Pauses current audio file and sets song.playing to false
        *@param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        *@function SongPlayer.previous 
        *@desc Finds the index of the current song and decreases it by 1.  If current index is less than 0, stop current song and set value of current song to first song.  Otherwise, move to previous song and automatically play it.
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if(currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        *@function SongPlayer.next 
        *@desc Finds the index of the current song and increases it by 1.  If current index is equal to album length, set value of current song to 0.  Otherwise, move to next song and automatically play it.
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if(currentSongIndex === currentAlbum.songs.length) {
                var song = currentAlbum.songs[0];
                setSong(song);
                playSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
