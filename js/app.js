// Main Angular app
// ****************************

var app = angular.module("myApp", ["angularMoment", "ngSanitize", "angular-loading-bar"]);

// Loader bar configration
app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);

app.controller("MainController", function($scope, $http){

    // Show Front page
    $scope.showHNData = function(title, url) {
        $scope.title = title;
        $scope.hnDataAll = url;
        $http.get($scope.hnDataAll).success(function(data) {
            $scope.data = data;
        });
        if(title == null) {
            alert(title);
        }
    };
    // Show Default tab data
    $scope.showHNData('Stories', 'https://hn.algolia.com/api/v1/search_by_date?tags=front_page&hitsPerPage=30');

    // Top Stories
    $scope.showTopStories = function() {
        $scope.title = "Popular Stories";
        var last24hr = ( Math.round((new Date()).getTime() / 1000) - (24*60*60) );
        $scope.hnTopStories = "https://hn.algolia.com/api/v1/search_by_date?tags=(story,polls)&hitsPerPage=1000&numericFilters=points>=5,created_at_i>="+last24hr+"";
        $http.get($scope.hnTopStories).success(function(data) {
            $scope.data = data;
        });
    };

    // Show comments
    $scope.showComment = function(e) {
        $scope.currentNewsID = e;
        $scope.hnDataComment = "https://hn.algolia.com/api/v1/search?tags=comment,story_"+$scope.currentNewsID+"&hitsPerPage=1000";
        $http.get($scope.hnDataComment).success(function(comment) {
            $scope.comment = comment;

            var commentNumber = Object.keys($scope.comment.hits).length;
            if (commentNumber !== 0) {
                $scope.isCommentShow = true;
            }
        });
    };

    // Search
    $scope.searchHackerNews = function(e) {
        $scope.title = "Search Results for " + $scope.hn_search;
        $scope.hnSearchResults = "https://hn.algolia.com/api/v1/search_by_date?query="+$scope.hn_search+"";
        $http.get($scope.hnSearchResults).success(function(data) {
            $scope.data = data;
        });
    };

    document.getElementById("hn_search").onkeyup = function(e){
        if(e.keyCode == 13){
            $scope.searchHackerNews();
        };
    };

});

// Main menu tabs
$(document).on('click', '.hn_header a', function(){
    $('.hn_header a').removeClass('active');
    $(this).addClass('active')
});

// Social Share
$(document).on('click', '.hn_share__show', function(){
    $('.hn_share').removeClass('active');
    $(this).nextAll('.hn_share').addClass('active');
    $(this).css('visibility','hidden');
    $(this).next($('.hn_share__hide')).css('visibility','visible');
});

$(document).on('click', '.hn_share__hide', function(){
    $('.hn_share').removeClass('active');
    $('.hn_share__hide').css('visibility','hidden');
    $('.hn_share__show').css('visibility','visible');
});
$(document).on('click', '.hn_share a', function(){
    window.open(this.href,'mywin','width=600,height=500');return false;
});
