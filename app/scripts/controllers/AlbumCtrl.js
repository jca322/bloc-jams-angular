(function() {
    function AlbumCtrl() {
        var albumData = angular.copy(albumPicasso);
        this.albumData = albumData;
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();