const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')) // Compilando o SASS no Gulp
const sourcemaps = require('gulp-sourcemaps'); // trazer a linha do arquivo fonte
const uglify = require('gulp-uglify'); // comprimindo arquivos js
const obfuscate = require('gulp-obfuscate'); //tornar arquivo js ilegivel
const imagemin = require('gulp-imagemin'); //comprimento uma imagem

function comprimeImagens() {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss') // buscar arquivos fonte sass
        .pipe(sourcemaps.init()) // trazer a linha do arquivo fonte
        .pipe(sass({
            outputStyle: 'compressed' //comprimir o arquivo
        }))
        .pipe(sourcemaps.write('./maps')) // trazer a linha do arquivo fonte
        .pipe(gulp.dest('./build/styles')); //enviar arquivos para pasta
}



exports.default = function() { 
    gulp.watch('./source/styles/*.scss', { ignoreInitial:false }, gulp.series(compilaSass)); //atualizando as alterações do gulp automaticamente
    gulp.watch('./source/scripts/*.js', { ignoreInitial:false }, gulp.series(comprimeJavaScript)); //atualizando as alterações do gulp automaticamente
    gulp.watch('./source/images/*', { ignoreInitial:false }, gulp.series(comprimeImagens)); //atualizando as alterações do gulp automaticamente

}
