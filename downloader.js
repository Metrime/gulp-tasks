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