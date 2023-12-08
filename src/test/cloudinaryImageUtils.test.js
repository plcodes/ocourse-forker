import { assert, expect, test } from 'vitest'
import * as imageUtils from '../utils/cloudinaryImageUtils';

test('width only', () => {
    expect(imageUtils.setWidthParameter(
        "https://res.cloudinary.com/dnaoyj/image/upload/ar_16:9,c_fill,dpr_2,f_auto,g_auto,q_auto,w_600/v1/Assets/Brandikuvat/2022/_95A2855_Original", 70))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/image/upload/ar_16:9,c_fill,dpr_2,f_auto,g_auto,q_auto,w_70/v1/Assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setWidthParameter(
        "https://res.cloudinary.com/dnaoyj/image/upload/v1/Assets/Brandikuvat/2022/_95A2855_Original", 70))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/image/upload/f_auto,c_fit,w_70/v1/Assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setWidthParameter(
        "https://res.cloudinary.com/dnaoyj/image/upload/v1/assets/Brandikuvat/2022/_95A2855_Original", 70))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/image/upload/f_auto,c_fit,w_70/v1/assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setWidthParameter(
        "https://res.cloudinary.com/dnaoyj/Assets/Brandikuvat/2022/_95A2855_Original", 70))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/f_auto,c_fit,w_70/Assets/Brandikuvat/2022/_95A2855_Original'
    );
})

test('height only', () => {
    expect(imageUtils.setHeightParameter(
        "https://res.cloudinary.com/dnaoyj/image/upload/ar_16:9,c_fill,dpr_2,f_auto,g_auto,q_auto,w_600/v1/Assets/Brandikuvat/2022/_95A2855_Original", 70))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/image/upload/ar_16:9,c_fill,dpr_2,f_auto,g_auto,q_auto,w_600,h_70/v1/Assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setHeightParameter(
        "https://res.cloudinary.com/dnaoyj/image/upload/ar_16:9,c_fill,dpr_2,f_auto,g_auto,q_auto,h_600/v1/Assets/Brandikuvat/2022/_95A2855_Original", 70))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/image/upload/ar_16:9,c_fill,dpr_2,f_auto,g_auto,q_auto,h_70/v1/Assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setHeightParameter(
        "https://res.cloudinary.com/dnaoyj/image/upload/v1/Assets/Brandikuvat/2022/_95A2855_Original", 70))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/image/upload/f_auto,c_fit,h_70/v1/Assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setHeightParameter(
        "https://res.cloudinary.com/dnaoyj/image/upload/v1/assets/Brandikuvat/2022/_95A2855_Original", 70))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/image/upload/f_auto,c_fit,h_70/v1/assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setHeightParameter(
        "https://res.cloudinary.com/dnaoyj/Assets/Brandikuvat/2022/_95A2855_Original", 70))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/f_auto,c_fit,h_70/Assets/Brandikuvat/2022/_95A2855_Original'
    );
})

test('width parameters', () => {
    expect(imageUtils.setWidthAndHeightParameters(
        "https://res.cloudinary.com/dnaoyj/image/upload/ar_16:9,c_fill,dpr_2,f_auto,g_auto,q_auto,w_600/v1/Assets/Brandikuvat/2022/_95A2855_Original", 70, undefined))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/image/upload/ar_16:9,c_fill,dpr_2,f_auto,g_auto,q_auto,w_70/v1/Assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setWidthAndHeightParameters(
        "https://res.cloudinary.com/dnaoyj/image/upload/v1/Assets/Brandikuvat/2022/_95A2855_Original", 70, undefined))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/image/upload/f_auto,c_fit,w_70/v1/Assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setWidthAndHeightParameters(
        "https://res.cloudinary.com/dnaoyj/image/upload/v1/assets/Brandikuvat/2022/_95A2855_Original", 70, undefined))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/image/upload/f_auto,c_fit,w_70/v1/assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setWidthAndHeightParameters(
        "https://res.cloudinary.com/dnaoyj/Assets/Brandikuvat/2022/_95A2855_Original", 70, undefined))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/f_auto,c_fit,w_70/Assets/Brandikuvat/2022/_95A2855_Original'
    );
})

test('width and height parameters', () => {
    expect(imageUtils.setWidthAndHeightParameters(
        "https://res.cloudinary.com/dnaoyj/image/upload/ar_16:9,c_fill,dpr_2,f_auto,g_auto,q_auto,w_600/v1/Assets/Brandikuvat/2022/_95A2855_Original", 70, 80))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/image/upload/ar_16:9,c_fill,dpr_2,f_auto,g_auto,q_auto,w_70,h_80/v1/Assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setWidthAndHeightParameters(
        "https://res.cloudinary.com/dnaoyj/image/upload/v1/Assets/Brandikuvat/2022/_95A2855_Original", 70, 80))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/image/upload/f_auto,c_fit,w_70,h_80/v1/Assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setWidthAndHeightParameters(
        "https://res.cloudinary.com/dnaoyj/image/upload/v1/assets/Brandikuvat/2022/_95A2855_Original", 70, 80))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/image/upload/f_auto,c_fit,w_70,h_80/v1/assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setWidthAndHeightParameters(
        "https://res.cloudinary.com/dnaoyj/Assets/Brandikuvat/2022/_95A2855_Original", 70, 80))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/f_auto,c_fit,w_70,h_80/Assets/Brandikuvat/2022/_95A2855_Original'
    );

    expect(imageUtils.setWidthAndHeightParameters(
        "https://res.cloudinary.com/dnaoyj/g_auto/Assets/Brandikuvat/2022/_95A2855_Original", 70, 80))
    .toEqual(
        'https://res.cloudinary.com/dnaoyj/g_auto,w_70,h_80/Assets/Brandikuvat/2022/_95A2855_Original'
    );
})
