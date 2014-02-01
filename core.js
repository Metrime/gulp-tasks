var config = {
	build : "build",
	dist : "dist",
	src : "src",
	libs : "libs",

	cssSrc : function(){ 
		return [config.libs+'/css/*.styl',config.src+'/assets/**/*.styl',config.src+'/**/css/*.styl'];
	},

	jsSrc : function(){ 
		return [config.libs+'/js/*.js',config.src+'/**/js/*.js'];
	},

	htmlSrc : function(){ 
		return [config.src+'/config/header.html',config.src+'/**/views/*.html',config.src+'/**/templates/*.html',config.src+'/config/footer*.html'];
	},

	imgSrc : function(){ 
		return config.src+'/assets/img/*';
	},

	iconSrc : function(){ 
		return config.src+'/assets/icons/*.svg';
	},

	fontSrc : function(){
		return config.src+'/assets/fonts/*';
	}

};



var gulp = require("gulp");
var g = require("gulp-load-plugins")({camelize:true});
var randomID = require("random-id");