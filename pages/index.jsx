import Head from 'next/head'

import CreditCardForm from '../components/CreditCardForm'

import styles from '../styles/Home.module.scss'

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Affirm FED</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CreditCardForm />
      </main>

      <footer className={styles.footer}>
        <div>
          <div className={styles.builtBy}>
            Built by&nbsp;
            <a
              href="https://valmassoi.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Valmassoi
            </a>
          </div>
          <div>
            Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home;
