var config = {
	build : "build",
	dist : "dist",
	src : "src",
	libs : "libs",

	cssSrc : function(){ 
		return [
			config.libs+'/css/*.styl',
			config.src+'/assets/**/*.styl',
			config.src+'/**/css/*.styl'
		];
	},
	htmlSrc : function(){ 
		return [
			config.src+'/config/header.html',
			config.src+'/**/views/*.html',
			config.src+'/**/templates/*.html',
			config.src+'/config/footer*.html'
		];
	},

	jsSrc : function(){ return [config.libs+'/js/*.js',config.src+'/**/js/*.js'] },
	imgSrc : function(){ return config.src+'/assets/img/*' },
	iconSrc : function(){ return config.src+'/assets/icons/*.svg' },
	fontSrc : function(){ return config.src+'/assets/fonts/*' },

	jsDownloads : {
		DOM:false,
		MVC:false,
		ajax:false,
		doT:true,
		debounce:true,
		hashString:true,
		localStorage:true
	},

	jsDownloadSources:{
		DOM:'',
		MVC:'',
		ajax:'',
		doT:'https://raw.github.com/olado/doT/master/doT.min.js',
		debounce:'https://raw.github.com/Metrime/js-utilities/master/debounce/debounce.js',
		hashString:'https://raw.github.com/Metrime/js-utilities/master/hashString/hashString.js',
		localStorage:'https://raw.github.com/Metrime/js-utilities/master/localStorage/localStorage.js'
	}

};



var gulp = require("gulp");
var g = require("gulp-load-plugins")({camelize:true});
var randomID = require("random-id");