
import pkg          from './package.json'
import gulp         from 'gulp'
import sass         from 'gulp-sass'
import minifycss    from 'gulp-minify-css'
import rename       from 'gulp-rename'
import notify       from 'gulp-notify'
import autoprefixer from 'gulp-autoprefixer'
import header       from 'gulp-header'
import imagemin     from 'gulp-imagemin'
import clean        from 'gulp-clean'

const srcPath = './code/src/'
const devPath = './code/dev/'
const buildPath = './code/build/'
const mincss = 'app.wxss'
const scssLoad = [`${srcPath}scss/main.scss`]
const buildScr = './code/build/'
const tmpScr = './code/.tmp/'
const title = pkg.name
const author = pkg.author
const version = pkg.version
const homepage = pkg.homepage

const banner = [
  '/*! ',
    `${title} `,
    `v ${version}  | `,
    `(c) ${new Date()}  ${author}  |`,
    ' <%= pkg.homepage %> ',
  ' */',
  '\n'
].join('');


let build = require('./bash/build.js')

// let srcPath = './src'
// let buildPath = './build'
gulp.task('watch', ['build:dev'], function (file){
  build.watch()
})
gulp.task('build:dev', () => {
	build.css(srcPath +'**/*.scss')
	build.js(srcPath +'/**/*.js')
	build.template(srcPath +'**/*.wxml')
	build.assets(srcPath +'**/*.+(json|wxml|wxss|png|gif|jpeg)')
})
gulp.task('build:pre', () => {
	build.css(srcPath +'**/*.scss', 'pre')
	build.js(srcPath +'**/*.js', 'pre')
	build.template(srcPath +'**/*.html', 'pre')
	build.assets(srcPath +'**/*.+(json|wxml|wxss|png|gif|jpeg)', 'pre')
})

gulp.task('clean', () => gulp.src([devPath,buildPath])
    .pipe(clean()))



//编译Sass，Autoprefix及缩小化
gulp.task('sass', () => gulp.src(scssLoad)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['> 1%','Firefox <= 20','last 10 versions','IE 8'],
        cascade: false
    }))
    .pipe(gulp.dest(`./${tmpScr}/`))
    .pipe(rename(mincss))
    .pipe(minifycss())
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest(`./${buildScr}/`))
    .pipe(notify({ message: 'Styles  task complete' })))


gulp.task('imgs',() => gulp.src(`${srcPath}img/*`)
    .pipe(imagemin())
    .pipe(gulp.dest(`${buildScr}img`))
    .pipe(notify({ message: 'imgs task complete' })));

gulp.task('dev',['sass'],()=>{
     // 看守.scss 
    gulp.watch(`${srcPath}scss/**/*.scss`, ['sass'])
})

// gulp.task('default', ['dev','sass'])