import { INVALID_CC_NUMBER, INVALID_EXP, INVALID_NAME, INVALID_CCV2 } from './errors.consts'
import { getCardLength, getCvv2Length } from './providers.consts';

export const isVisa = cc => `${cc}`.startsWith('4')
export const isAmex = cc => `${cc}`.startsWith('34') || `${cc}`.startsWith('37')

export const validateCardNumber = cc => {
    // numbers only
    const isValidVisa = isVisa(cc) && cc.length === getCardLength('visa')
    const isValidAmex = isAmex(cc) && cc.length === getCardLength('amex')
    const errorMessage = (isValidVisa || isValidAmex) ? '' : INVALID_CC_NUMBER

    return errorMessage
}

const validMonth = (month) => (month >= 1 && month <= 12)

// today is a param to keep func pure for testing
export const validateExp = (month, year, today = new Date()) => {
    if (month.length !== 2 || year.length !== 2) {
        return INVALID_EXP
    }

    const currentMonth = today.getMonth() + 1;
    const currentYear = parseInt(`${today.getFullYear()}`.substring(2));

    if (
        !validMonth(parseInt(month))
        || (parseInt(year) === currentYear && parseInt(month) <= currentMonth)
        || parseInt(year) < currentYear
    ) {
        return INVALID_EXP
    }

    return ''
}

export const validateName = (name) => {
    const names = name.split(' ');
    const hasAtLeastOneSpace = names.length >= 2 // TODO lookup max names (first mi last ...) on CC
    const namesAreLongEnough = names.every(n => n.length >= 1) // TODO look up min length for a name
    return hasAtLeastOneSpace && namesAreLongEnough ? '' : INVALID_NAME
}

export const validateCvv2 = (ccv2, cardNumber) => {
    const isCorrectLength =
        isVisa(cardNumber) && ccv2.length === getCvv2Length('visa')
        || isAmex(cardNumber) && ccv2.length === getCvv2Length('amex')
    return isCorrectLength ? '' : INVALID_CCV2
}

export const formatCardNumber = (cardNumber = '') => {
    if (isVisa(cardNumber)) {
        return `${cardNumber.substring(0, 4)} ${cardNumber.substring(4, 8)} ${cardNumber.substring(8, 12)} ${cardNumber.substring(12, 16)}`;
    } else if (isAmex(cardNumber)) {
        return `${cardNumber.substring(0, 4)} ${cardNumber.substring(4, 10)} ${cardNumber.substring(10, 15)}`;
    }
    return cardNumber;
}