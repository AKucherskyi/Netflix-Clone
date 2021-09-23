import React from 'react'
import styles from './Footer.module.css'

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.line}></div>
            <div className={styles.container}>
                <div>
                    <h3>Questions? Contact us.</h3>
                </div>
                <div className={styles.footer__block}>
                    <div>
                        <p>FAQ</p>
                        <p>Investor Relations</p>
                        <p>Privacy</p>
                        <p>Speed Test</p>
                    </div>
                    <div>
                        <p>Help Center</p>
                        <p>Jobs</p>
                        <p>Cookie Preferences</p>
                        <p>Legal Notices</p>
                    </div>
                    <div>
                        <p>Account</p>
                        <p>Ways to Watch</p>
                        <p>Corporate Information</p>
                        <p>Only on Netflix</p>
                    </div>
                    <div>
                        <p>Media Center</p>
                        <p>Terms of Use</p>
                        <p>Contact Us</p>
                        
                    </div>
                </div>
                <div className={styles.last}>Netflix Ukraine</div>
            </div>
        </div>
    )
}

export default Footer
