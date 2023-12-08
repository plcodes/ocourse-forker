//const _find = require('lodash.find');
//const _last = require('lodash.last');

const isCloudinaryImage = (url) => {
    const domain = "//res.cloudinary.com";
    return url.startsWith('https:' + domain)
        || url.startsWith('http:' + domain)
        || url.startsWith(domain);
};

const parameterPositionRegex = new RegExp(/(\/v\d+\/Assets\/|\/Assets\/)/i); // finds /v../Assets/ or /Assets/ ignoring case
const transformationParametersRegex = new RegExp(/(\/\w+_[^\/]+(?=\/v\d+\/|\/Assets\/))/i); // finds the transformation parameters place in url followed by /v../ or /Assets/ ignoring case
const hasTransformationParameters = (url) => {
    return transformationParametersRegex.test(url);
};
const addToTransformations = (url, parameter) => {
    const parts = url.split(transformationParametersRegex);
    // [0] = url start, [1] = transformations, [2] = rest
    parts.splice(2, 0, ',' + parameter);
    return parts.join('');
};
const addNewTransformationPart = (url, parameter) => {
    const parts = url.split(parameterPositionRegex);
    // [0] = url start, [1] = /v../Assets, [2] = rest
    if(parts.length < 2) return url; // the correct place was not found

    const defaults = '/f_auto,c_fit,';
    parts.splice(1, 0, defaults + parameter);
    return parts.join('');
};

const addImageTransformation = (url, parameter) => {
    if (!url) return url;

    if(hasTransformationParameters(url)) {
        return addToTransformations(url, parameter);
    } else {
        return addNewTransformationPart(url, parameter);
    }
};

// replace width parameter in url
// examples of url parts:
// /w_400,
// ,w_auto,
// /w_auto:
const widthRegex = new RegExp('((\\,|\\/)(w_.{1,5})(\\,|\\/|\\:))');
const hasWidthParameter = (url) => {
    return widthRegex.test(url);
};
const setWidthParameter = (url, value) => {
    // take the leading and trailing characters as well
    if(hasWidthParameter(url)) {
        return url.replace(widthRegex, '$2w_'+value+'$4');
    } else {
        return addImageTransformation(url, 'w_'+value)
    }
};
const heightRegex = new RegExp('((\\,|\\/)(h_.{1,5})(\\,|\\/|\\:))');
const hasHeightParameter = (url) => {
    return heightRegex.test(url);
};
const setHeightParameter = (url, value) => {
    // take the leading and trailing characters as well
    if(hasHeightParameter(url)) {
        return url.replace(heightRegex, '$2h_'+value+'$4');
    } else {
        return addImageTransformation(url, 'h_'+value)
    }
};

const setWidthAndHeightParameters = (url, width, height) => {
    if(width)
        url = setWidthParameter(url, width);
    if(height)
        url = setHeightParameter(url, height);
    url = setDprParameter(url);
    return url;
};

const getDpr = () => {
    let actualDpr = typeof window != 'undefined' && window.devicePixelRatio? window.devicePixelRatio:1;
    if(actualDpr > 1) {
        return 2.0
    }
    return 1;
};

const setDprParameter = (url) => {
    // if dpr_auto is set, replace it with actual value
    return url.replace('dpr_auto', 'dpr_' + getDpr());
};

const determineNewImageHeight = (image, containerSize) => {
    if('heights' in image.dataset) {
        //if data-heights is set, pick one from determined values
        const values = String(image.dataset.heights).split(',');
        return getBestValue(values, containerSize);
    }
    return containerSize;
};

const determineNewImageWidth = (image, containerSize) => {
    if('widths' in image.dataset) {
        //if data-widths is set, pick one from determined values
        const values = String(image.dataset.widths).split(',');
        return getBestValue(values, containerSize);
    }
    return Math.ceil(containerSize/100)*100;
};

const getBestValue = (dataset, current) => {
    /*let bestValue = _find(dataset, function(value) {
        return Number(value) >= Number(current);
    });
    if(!bestValue) bestValue = _last(dataset);
    return bestValue;*/
};

export {
    isCloudinaryImage,
    setWidthAndHeightParameters,
    setWidthParameter,
    setHeightParameter,
    getDpr,
    setDprParameter,
    determineNewImageHeight,
    determineNewImageWidth,
    hasWidthParameter,
    hasHeightParameter
}