import Nav from "../components/nav";
import StyleSheet from "../components/styleSheet";
import styles from "../styles/Home.module.css"
import { useSession, signIn, signOut } from "next-auth/react"
export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className={styles.login_form}>
        <div className={styles.login_container}>
          <button onClick={() => signIn('google')} className={styles.login_btn}>Login with Google </button>
        </div>

      </div>
    )
  }
  return (
    <div className={styles.user_container}>
      <Nav />
      <div>logged in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      <StyleSheet />
    </div>

  )
}
