module.exports = {
    process() {
        return 'module.exports = {};'; // Simula un módulo vacío para los iconos
    },
    getCacheKey() {
        return 'svgTransform';
    },
};