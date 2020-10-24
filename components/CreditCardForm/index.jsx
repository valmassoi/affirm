import { useState } from 'react'
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CreditCardProviders from '../CreditCardProviders'

import { isAmex, isVisa, validateCardNumber, validateExp, validateCvv2, validateName, formatCardNumber } from './helpers';
import { getCardLength, getCvv2Length } from './providers.consts';

import styles from './styles.module.scss'

const initialValues = {
    name: '',
    cardNumber: '',
    cvv2: '',
    expMonth: '',
    expYear: '',
}

const initialErrors = {
    name: '',
    cardNumber: '',
    cvv2: '',
    exp: '', // month and year combined to one error
}

const CreditCardForm = ({
    onValidForm,
}) => {
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState(initialErrors)

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        })
        // clear error
        const errorName = name.startsWith('exp') ? 'exp' : name
        setFormErrors({
            ...formErrors,
            [errorName]: '',
        })
    }

    const validateForm = () => {
        const errors = {
            name: validateName(formValues.name),
            cardNumber: validateCardNumber(formValues.cardNumber),
            cvv2: validateCvv2(formValues.cvv2, formValues.cardNumber),
            exp: validateExp(formValues.expMonth, formValues.expYear),
        }
        setFormErrors(errors)
        const hasError = Object.keys(errors).some(key => errors[key] !== '');
        return !hasError;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formIsValid = validateForm();
        if (formIsValid) {
            onValidForm(formValues)
        }
    }

    const cardIsVisa = isVisa(formValues.cardNumber);
    const cardIsAmex = isAmex(formValues.cardNumber);

    let cardMaxLength = 16;
    let cvv2MaxLength = 4;
    if (cardIsVisa) {
        cardMaxLength = getCardLength('visa'); // NOTE: unneeded now but might be as new providers get added
        cvv2MaxLength = getCvv2Length('visa'); // UX: what if they fill this in first?
    }
    if (cardIsAmex) {
        // TODO [bug]: pasting may cut off last char as max lengths change between providers
        cardMaxLength = getCardLength('amex');
        cvv2MaxLength = getCvv2Length('amex');
    }

    const formatedNumber = formatCardNumber(formValues.cardNumber)

    return (
        <div className={styles.root}>
            <h3 className={styles.title}>Enter your credit card information</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name on card"
                    name="name"
                    autoComplete="cc-name"
                    value={formValues.name}
                    helperText={formErrors.name || ' '}
                    error={!!formErrors.name}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ pattern: "[A-Za-z ]+" }}
                />
                <TextField
                    label="Card Number"
                    name="cardNumber"
                    autoComplete="cc-number"
                    value={formValues.cardNumber}
                    helperText={formErrors.cardNumber || formatedNumber || ' '}
                    error={!!formErrors.cardNumber}
                    onChange={handleChange}
                    inputProps={{ maxLength: cardMaxLength, pattern: "[0-9]+" }}
                    type="tel"
                    fullWidth
                />
                <TextField
                    label="CVV2"
                    name="cvv2"
                    autoComplete="cc-csc"
                    value={formValues.cvv2}
                    helperText={formErrors.cvv2 || ' '}
                    error={!!formErrors.cvv2}
                    onChange={handleChange}
                    inputProps={{ maxLength: cvv2MaxLength, pattern: "[0-9]+" }}
                    type="tel"
                    fullWidth
                />
                <div className={styles.expWrapper}>
                    <TextField
                        label="Exp. Month"
                        name="expMonth"
                        autoComplete="cc-exp"
                        value={formValues.expMonth}
                        helperText={formErrors.exp || ' '}
                        error={!!formErrors.exp}
                        onChange={handleChange}
                        inputProps={{ maxLength: 2, pattern: "[0-9]+" }}
                        type="tel"
                        className={styles.expMonth}
                    />
                    <TextField
                        label="Exp. Year"
                        name="expYear"
                        autoComplete="cc-exp"
                        value={formValues.expYear}
                        // UX: only showing helperText on Month
                        helperText=" "
                        error={!!formErrors.exp}
                        onChange={handleChange}
                        inputProps={{ maxLength: 2, pattern: "[0-9]+" }}
                        type="tel"
                        className={styles.expYear}
                    />
                </div>
                <CreditCardProviders isVisa={cardIsVisa} isAmex={cardIsAmex} />
                {/* UX: could disable if the form is incomplete */}
                <Button type="submit" color="primary" variant="contained" size="large" fullWidth>Submit</Button>
            </form>
        </div>
    )
}

CreditCardForm.propTypes = {
    onValidForm: PropTypes.func,
}
CreditCardForm.defaultProps = {
    onValidForm: () => {},
}

export default CreditCardForm;
