import {
    isVisa,
    isAmex,
    validateCardNumber,
    validateExp,
    validateName,
    formatCardNumber,
} from './helpers'
import { INVALID_CC_NUMBER, INVALID_EXP, INVALID_NAME } from './errors.consts'

describe('CreditCardForm helpers', () => {
    describe('isVisa', () => {
        it('starts with 4 returns true', () => {
            expect(isVisa('4321')).toBe(true)
        })
        it('starts with another number returns false', () => {
            expect(isVisa('123')).toBe(false)
            expect(isVisa('223')).toBe(false)
            expect(isVisa('323')).toBe(false)
            expect(isVisa('523')).toBe(false)
            expect(isVisa('623')).toBe(false)
            expect(isVisa('723')).toBe(false)
            expect(isVisa('823')).toBe(false)
            expect(isVisa('923')).toBe(false)
            expect(isVisa('023')).toBe(false)
        })
        it('empty returns false', () => {
            expect(isVisa()).toBe(false)
        })
    })
    describe('isAmex', () => {
        it('starts with 34 returns true', () => {
            expect(isAmex('3456465')).toBe(true)
        })
        it('starts with 37 returns true', () => {
            expect(isAmex('3756465')).toBe(true)
        })
        it('starts with other numbers returns false', () => {
            expect(isAmex('123')).toBe(false)
            expect(isAmex('223')).toBe(false)
            expect(isAmex('323')).toBe(false)
            expect(isAmex('423')).toBe(false)
            expect(isAmex('523')).toBe(false)
            expect(isAmex('623')).toBe(false)
            expect(isAmex('723')).toBe(false)
            expect(isAmex('823')).toBe(false)
            expect(isAmex('923')).toBe(false)
            expect(isAmex('023')).toBe(false)
        })
        it('empty returns false', () => {
            expect(isAmex()).toBe(false)
        })
    })
    describe('validateCardNumber', () => {
        it('visa returns empty string', () => {
            expect(validateCardNumber('4653465465465465')).toBe('')
        })
        it('amex returns empty string', () => {
            expect(validateCardNumber('345646523432443')).toBe('')
            expect(validateCardNumber('375646523432443')).toBe('')
        })
        it('invalid returns error message', () => {
            expect(validateCardNumber('3')).toBe(INVALID_CC_NUMBER)
            expect(validateCardNumber()).toBe(INVALID_CC_NUMBER)
            expect(validateCardNumber('145646523432443')).toBe(INVALID_CC_NUMBER)
        })
    })
    describe('validateExp', () => {
        it('future returns empty string', () => {
            expect(validateExp('11', '20', new Date('2020-10-01T10:00:00.000Z'))).toBe('')
            expect(validateExp('10', '22', new Date('2020-10-01T10:00:00.000Z'))).toBe('')
        })
        it('same month/year returns error message', () => {
            expect(validateExp('10', '20', new Date('2020-10-01T10:00:00.000Z'))).toBe(INVALID_EXP)
        })
        it('past month/year returns error message', () => {
            expect(validateExp('10', '19', new Date('2020-10-01T10:00:00.000Z'))).toBe(INVALID_EXP)
        })
    })
    describe('validateName', () => {
        it('first/last returns empty string', () => {
            expect(validateName('rob valmassoi')).toBe('')
        })
        it('one name is invalid', () => {
            expect(validateName('rob')).toBe(INVALID_NAME)
        })
    })
    describe('formatCardNumber', () => {
        it('formats visa', () => {
            expect(formatCardNumber('4123123412321232')).toBe('4123 1234 1232 1232')
        })
        it('formats amex', () => {
            expect(formatCardNumber('344564654654654')).toBe('3445 646546 54654')
        })
    })
})