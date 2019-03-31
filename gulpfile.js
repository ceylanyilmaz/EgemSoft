
/* required methods */
var gulp = require('gulp');
var concat = require('gulp-concat'); /* CSS ve JS dosyalarınızı tek bir dosyada toplayabilirsiniz */
var rename = require('gulp-rename'); /* isim değiştirme */ 
var uglify = require('gulp-uglify'); /* Javascript dosyalarınızı  */
var runSequence = require('run-sequence'); /* Belirtilen sırayla gulp methodları çalıştırır */
var watch = require('gulp-watch'); /* Değişiklikleri takip eder otomatik değiştirir */ 
var sass = require('gulp-sass'); /* Sass */ 
var autoprefixer = require('gulp-autoprefixer'); /* CSS kodlarına eski browserlara göre  -webkit gibi eklentiler ekler */ 
var sourcemaps = require('gulp-sourcemaps'); /* Birleştirilmiş sass kodlarının hangi sass da olduğunu bulur */
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');

gulp.task('scripts', function(){
    gulp.src(['./bower_components/jquery/dist/jquery.js',
        './bower_components/datatables.net/js/jquery.dataTables.js',
        './bower_components/datatables.net-fixedcolumns/js/dataTables.fixedColumns.js',
        './bower_components/datatables.net-responsive/js/dataTables.responsive.js',
        './bower_components/tooltipster/dist/js/tooltipster.bundle.min.js',
		'./assets/javascripts/main.js'])
		.pipe(concat('master.js'))
		.pipe(rename('master.min.js'))
		.pipe(uglify())
        .pipe(gulp.dest('./assets/js'));

});

gulp.task('sass', function(){
    gulp.src(['assets/scss/main.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer('last 15 version'))
		.pipe(concat('style.css'))
		.pipe(rename('style.min.css'))
		.pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('css', function(){
	gulp.src(['./bower_components/datatables.net-dt/css/jquery.dataTables.css',
		'./bower_components/datatables.net-fixedcolumns-dt/css/datatables.net-fixedcolumns-dt.css',
		'./bower_components/datatables.net-responsive-dt/css/datatables.net-responsive-dt.css',
		'./bower_components/tooltipster/dist/css/tooltipster.bundle.min.css',
		])
		.pipe(concatCss("vendors.css"))
		.pipe(cleanCSS())
		.pipe(rename('vendors.min.css'))
		.pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function(){
    gulp.watch('./assets/javascripts/**/**/*.js', ['scripts']);
    gulp.watch('./assets/scss/**/**/*.scss', ['sass']);
});

gulp.task('default', function(callback){
	runSequence('scripts', 'css', 'sass', 'watch', callback);
});