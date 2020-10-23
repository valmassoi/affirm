import { useState } from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CreditCardProviders from '../CreditCardProviders'
import styles from './styles.module.scss'

const initialValues = {
    name: '',
    cardNumber: null,
    cvv2: null,
    expMonth: null,
    expYear: null,
}

const initialErrors = {
    name: '',
    cardNumber: '',
    cvv2: '',
    expMonth: '',
    expYear: '',
}

// TODO auto complete
// TODO validate
// TODO tests

const CreditCardForm = () => {
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState(initialErrors)

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formValues);
    }

    return (
        <div className={styles.root}>
            <h3 className={styles.title}>Enter your credit card information</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={formValues.name}
                    helperText={formErrors.name}
                    error={!!formErrors.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Card Number"
                    name="cardNumber"
                    value={formValues.cardNumber}
                    helperText={formErrors.cardNumber}
                    error={!!formErrors.cardNumber}
                    onChange={handleChange}
                    inputProps={{ maxLength: 16 }}
                    fullWidth
                />
                <TextField
                    label="CVV2"
                    name="cvv2"
                    value={formValues.cvv2}
                    helperText={formErrors.cvv2}
                    error={!!formErrors.cvv2}
                    onChange={handleChange}
                    inputProps={{ maxLength: 4 }}
                    fullWidth
                />
                <div className={styles.expWrapper}>
                    <TextField
                        label="Exp. Month"
                        name="expMonth"
                        value={formValues.expMonth}
                        helperText={formErrors.expMonth}
                        error={!!formErrors.expMonth}
                        onChange={handleChange}
                        inputProps={{ maxLength: 2 }}
                        className={styles.expMonth}
                    />
                    <TextField
                        label="Exp. Year"
                        name="expYear"
                        value={formValues.expYear}
                        helperText={formErrors.expYear}
                        error={!!formErrors.expYear}
                        onChange={handleChange}
                        inputProps={{ maxLength: 2 }}
                        className={styles.expYear}
                    />
                </div>
                <CreditCardProviders isVisa isAmex />
                <Button type="submit" color="primary" variant="contained" size="large" fullWidth>Submit</Button>
            </form>
        </div>
    )
}

export default CreditCardForm;
