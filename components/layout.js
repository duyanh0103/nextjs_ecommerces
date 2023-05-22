import Nav from "../components/nav";
import StyleSheet from "../components/styleSheet";
import styles from "../styles/Home.module.css"
import { useSession, signIn, signOut } from "next-auth/react"
export default function Layout({children}) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className={styles.login_form}>
        <div className={styles.login_container}>
          <button onClick={() => signIn('google')} className={styles.login_btn}>Login with Google </button>
        </div>
        <StyleSheet />
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.user_container}>
        {children} <br />
        {/* <button onClick={() => signOut()}>Sign out</button> */}
      </div>
      <StyleSheet />
    </div>

  )
}
