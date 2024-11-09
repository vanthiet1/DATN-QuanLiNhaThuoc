const bmiPercentiles = {
    male: {
        0: { underweight: 13.0, normal: 16.0, overweight: 18.0 },
        5: { underweight: 14.0, normal: 18.0, overweight: 21.0 },
        10: { underweight: 14.0, normal: 18.5, overweight: 22.0 },
        15: { underweight: 16.0, normal: 21.0, overweight: 25.0 },
        20: { underweight: 18.5, normal: 24.9, overweight: 27.0 },
        30: { underweight: 20.0, normal: 25.0, overweight: 30.0 },
    },
    female: {
        0: { underweight: 13.0, normal: 16.0, overweight: 18.0 },
        5: { underweight: 14.0, normal: 17.5, overweight: 19.0 },
        10: { underweight: 14.0, normal: 18.0, overweight: 22.0 },
        15: { underweight: 16.0, normal: 20.5, overweight: 24.0 },
        20: { underweight: 18.5, normal: 24.9, overweight: 27.0 },
        30: { underweight: 19.0, normal: 24.0, overweight: 29.0 },
    },
};
export default bmiPercentiles;
