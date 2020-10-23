import VisaSvg from '../../svgs/visa.svg'
import AmexSvg from '../../svgs/amex.svg'

import styles from './styles.module.scss'

const getFillColor = (active) => active ? '#000' : '#CDCDCD'

const CreditCardProviders = ({ isVisa, isAmex }) => {
    return (
        <div className={styles.root}>
            <div className={styles.cardWrapper}><VisaSvg fill={getFillColor(isVisa)} /></div>
            <div className={styles.cardWrapper}><AmexSvg fill={getFillColor(isAmex)} /></div>
        </div>
    )
}

export default CreditCardProviders;
