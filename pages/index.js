import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";


export default function Home() {

    const [solution, setSolution] = useState("loading .")

    useEffect(() => {

        const fetch_answer = async () => {

            setSolution("loading ..")
            try {
                setSolution("loading ...")
                const solution_today = await fetch(`/api/solution`).then((response) => response.json())
                setSolution(solution_today.solution)
            } catch (e) {
                setSolution("Oops, try refreshing.")
            }

        }
        fetch_answer()

    }, [])

    const date_today = new Date().toLocaleDateString("en-US")
    const description = `Wordle Answer Today ${date_today}. Never lose your Wordle streak, NYT Wordle answer is here!`
    return (
        <div className={styles.container}>
            <Head>
                <title>Wordle Answer Today - {date_today}</title>
                <meta name="description" content={description}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Wordle Answer Today is {' '}
                </h1>
                <h1 className={styles.title}>
                    {solution}
                </h1>

            </main>

            <footer className={styles.main}>
                <a
                    href="https://goforbg.com/?ref=wordle"
                    target="_blank"
                    rel="noreferrer"
                >
                    Made by {' '}
                    <span className={styles.span}>Bharadwaj Giridhar</span> of
                </a>

                <a
                    href="https://www.crewcharge.com/?ref=wordle"
                    target="_blank"
                    rel="noreferrer"
                >&nbsp;
                    <span className={styles.span}>Crewcharge</span>.
                </a>
            </footer>
        </div>
    )
}
