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
function getDay(){
	var date = new Date();
	var d = date.getDate();
	var m = (date.getMonth()+1);
	d = d < 10 ? "0"+d : d;
	m = m < 10 ? "0"+m : m;
	return d+"."+m+"."+date.getFullYear();
}

function getTime(){
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();
	h = h < 10 ? "0"+h : h;
	m = m < 10 ? "0"+m : m;
	return h+":"+m;
}



gulp.task('backup-build',function(){
	gulp.src(config.build+'/**/*')
	.pipe(gulp.dest('backups/build '+getDay()+' '+getTime()));
});



gulp.task('backup-src',function(){
	gulp.src(config.src+'/**/*')
	.pipe(gulp.dest('backups/src '+getDay()+' '+getTime()));
});



gulp.task('backup-dist',function(){
	gulp.src(config.dist+'/**/*')
	.pipe(gulp.dest('backups/dist '+getDay()+' '+getTime()));
});



gulp.task('backup-all',function(){
	gulp.start('backup-build','backup-src','backup-dist');
});



gulp.task('clean-backups',function(){
	gulp.src('backups/')
	.pipe(g.clean());
});
//css

gulp.task('build-css',function(){
	var stream = gulp.src(config.cssSrc())
	.pipe(g.footer('\n\n'))
	.pipe(g.concat('style.css'))
	.pipe(g.stylus())
	.pipe(g.autoprefixer())
	.pipe(gulp.dest(config.build+'/assets'));
	return stream;
});



//js

gulp.task('build-js',function(){
	var stream = gulp.src(config.jsSrc())
	.pipe(g.footer(';'))
	.pipe(g.concat('scripts.js'))
	.pipe(gulp.dest(config.build+'/assets'));
	return stream;
});


//html

gulp.task('combine-html',function(){
	var stream = gulp.src(config.htmlSrc())
	.pipe(g.concat('index.html'))
	.pipe(g.specialHtml())
	.pipe(gulp.dest('temp'));
	return stream;
});

gulp.task('build-html',['build-css','build-js','combine-html'],function(){
	gulp.src([config.build+'/assets/*.css',config.build+'/assets/*.js'],{read:false})
	.pipe(g.inject('temp/index.html'))
	.pipe(g.minifyHtml())
	.pipe(gulp.dest(config.build));
});



// assets

gulp.task('build-assets',function(){
	gulp.src(config.imgSrc())
	.pipe(gulp.dest(config.build+'/assets/img'));

	gulp.src(config.iconSrc())
	.pipe(g.svgicons2svgfont({fontName:'icons',appendCodepoints:true}))
	.pipe(gulp.dest(config.build+'/assets/fonts/'));

	gulp.src(config.fontSrc())
	.pipe(gulp.dest(config.build+'/assets/fonts/'));
});


gulp.task('clean-build',function(){
	var stream = gulp.src(config.build)
	.pipe(g.clean());
	return stream;
});



gulp.task('build',['clean-build'],function(){
	gulp.start('build-html','build-assets');
});
var cleanNPMdir = 'node_modules';
var cleanNPMConfig = [
	'/**/*.md',
	'/**/*.markdown',
	'/**/*.gz',
	'/**/graphics',
	'/**/test*/',
	'/**/benchmark*/',
	'/**/doc*/',
	'/**/task*/',
	'/**/example*/',
	'/**/Makefile',
	'/**/AUTHORS',
	'/**/CHANGELOG',
	'/**/HISTORY'
].map(function(a){ return cleanNPMdir + a; });

gulp.task('clean-npm',function(){
	gulp.src(cleanNPMConfig)
	.pipe(g.clean());
});
// css

gulp.task('dist-css',function(){
	var stream = gulp.src(config.build+'/assets/style.css')
	.pipe(g.rename(randomID(20,'aA0')+'.css'))
	.pipe(g.csso())
	.pipe(gulp.dest(config.dist+'/assets'));
	return stream;
});



// js

gulp.task('dist-js',function(){
	var stream = gulp.src(config.build+'/assets/scripts.js')
	.pipe(g.rename(randomID(20,'aA0')+'.js'))
	.pipe(g.uglify())
	.pipe(gulp.dest(config.dist+'/assets'));
	return stream;
});



// html

gulp.task('dist-html',['dist-css','dist-js'],function(){
	gulp.src([config.dist+'/assets/*.css',config.dist+'/assets/*.js'],{read:false})
	.pipe(g.inject('temp/index.html'))
	.pipe(g.minifyHtml())
	.pipe(gulp.dest(config.dist));
});



// assets

gulp.task('dist-assets',function(){
	gulp.src([config.build+'/assets/img/*'])
	.pipe(g.imagemin())
	.pipe(gulp.dest(config.dist+'/assets/img'));

	gulp.src(config.build+'/assets/fonts/*.svg')
	.pipe(g.svgmin())
	.pipe(gulp.dest(config.dist+'/assets/fonts/'));
});



gulp.task('clean-dist',function(){
	var stream = gulp.src(config.dist)
	.pipe(g.clean());
	return stream;
});



gulp.task('dist',['clean-dist'],function(){
	gulp.start('dist-html','dist-assets');
});



gulp.task('dist-size',function(){
	gulp.src([config.dist+'/**/*','!*.jpg','!*.png','!*.gif'])
	.pipe(g.size());
});
function getJSDownloadURLS(){
	var urls = [];
	for(a in config.jsDownloads){
		if(config.jsDownloads[a]) urls.push(config.jsDownloadSources[a]);
	}
	return urls;
};

gulp.task('download-js',function(){
	g.download(getJSDownloadURLS())
	.pipe(gulp.dest(config.libs+'/js'));
});