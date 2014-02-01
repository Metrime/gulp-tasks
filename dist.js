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