const isProd = process.env.NODE_ENV === 'production';
const plug = isProd ? {'autoprefixer':{},'cssnano':{}} : {'autoprefixer':{}};

module.exports = {
    plugins: plug
};