//css

gulp.task('build-css',function(){
	var stream = gulp.src(['libs/css/*.styl','src/assets/**/*.styl','src/**/css/*.styl'])
	.pipe(g.footer('\n\n'))
	.pipe(g.concat('style.css'))
	.pipe(g.stylus())
	.pipe(g.autoprefixer())
	.pipe(gulp.dest(buildDestination+'/assets'));
	return stream;
});



//js

gulp.task('build-js',function(){
	var stream = gulp.src(['libs/js/*.js','src/**/js/*.js'])
	.pipe(g.footer(';'))
	.pipe(g.concat('scripts.js'))
	.pipe(gulp.dest(buildDestination+'/assets'));
	return stream;
});


//html

gulp.task('combine-html',function(){
	var stream = gulp.src(['src/config/header.html','src/**/views/*.html','src/**/templates/*.html','src/config/footer*.html'])
	.pipe(g.concat('index.html'))
	.pipe(g.specialHtml())
	.pipe(gulp.dest('temp'));
	return stream;
});

gulp.task('build-html',['build-css','build-js','combine-html'],function(){
	gulp.src([buildDestination+'/assets/*.css',buildDestination+'/assets/*.js'],{read:false})
	.pipe(g.inject('temp/index.html'))
	.pipe(g.minifyHtml())
	.pipe(gulp.dest(buildDestination));
});



// assets

gulp.task('build-assets',function(){
	gulp.src(['src/assets/img/*'])
	.pipe(gulp.dest(buildDestination+'/assets/img'));

	gulp.src('src/assets/icons/*.svg')
	.pipe(g.svgicons2svgfont({fontName:'icons',appendCodepoints:true}))
	.pipe(gulp.dest(buildDestination+'/assets/fonts/'));

	gulp.src('src/assets/fonts/*')
	.pipe(gulp.dest(buildDestination+'/assets/fonts/'));
});


gulp.task('clean-build',function(){
	var stream = gulp.src(buildDestination)
	.pipe(g.clean());
	return stream;
});



gulp.task('build',['clean-build'],function(){
	gulp.start('build-html','build-assets');
});