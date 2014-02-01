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