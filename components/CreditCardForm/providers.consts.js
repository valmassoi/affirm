const defaultCardLength = 16;
export const getCardLength = (provider) => ({
    visa: 16,
    amex: 15,
})[provider] || defaultCardLength;

const defaultCvv2Length = 4;
export const getCvv2Length = (provider) => ({
    visa: 3,
    amex: 4,
})[provider] || defaultCvv2Length;