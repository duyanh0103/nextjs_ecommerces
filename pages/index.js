import Layout from "../components/layout";
import styles from "../styles/Home.module.css"
import { useSession } from "next-auth/react"
export default function Home() {
  // dùng session để lấy data từ mongo
  const { data: session } = useSession();
  return <Layout>
    <div className={styles.dashboard_container}>
      <h2> Hello, {session?.user.name}</h2>

      <div className={styles.dashboard_avt}>
        <img src={session?.user.image} alt="avatar error" className={styles.user_img} />
      {session?.user.name}
      </div>
    </div>
  </Layout>
}
