// css

gulp.task('dist-css',function(){
	var stream = gulp.src(buildDestination+'/assets/style.css')
	.pipe(g.rename(randomID(20,'aA0')+'.css'))
	.pipe(g.csso())
	.pipe(gulp.dest(distDestination+'/assets'));
	return stream;
});



// js

gulp.task('dist-js',function(){
	var stream = gulp.src(buildDestination+'/assets/scripts.js')
	.pipe(g.rename(randomID(20,'aA0')+'.js'))
	.pipe(g.uglify())
	.pipe(gulp.dest(distDestination+'/assets'));
	return stream;
});



// html

gulp.task('dist-html',['dist-css','dist-js'],function(){
	gulp.src([distDestination+'/assets/*.css',distDestination+'/assets/*.js'],{read:false})
	.pipe(g.inject('temp/index.html'))
	.pipe(g.minifyHtml())
	.pipe(gulp.dest(distDestination));
});



// assets

gulp.task('dist-assets',function(){
	gulp.src([buildDestination+'/assets/img/*'])
	.pipe(g.imagemin())
	.pipe(gulp.dest(distDestination+'/assets/img'));

	gulp.src(buildDestination+'/assets/fonts/*.svg')
	.pipe(g.svgmin())
	.pipe(gulp.dest(distDestination+'/assets/fonts/'));
});



gulp.task('clean-dist',function(){
	var stream = gulp.src(distDestination)
	.pipe(g.clean());
	return stream;
});



gulp.task('dist',['clean-dist'],function(){
	gulp.start('dist-html','dist-assets');
});