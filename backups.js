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