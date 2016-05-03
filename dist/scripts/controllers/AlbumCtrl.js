(function() {
    function AlbumCtrl() {
        var albumData = angular.copy(albumPicasso);
        this.albumData = albumData;
        for (var i = 0; i < albumData.songs.length; i++) {
            this.albumData;
        }
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();