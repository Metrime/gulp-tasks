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