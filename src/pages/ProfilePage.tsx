import { Routes, Route } from "react-router-dom";
import { OrderHistory, ProfileInfo, Sidebar } from "../components";
import { useProfileData } from "../hooks";
import styles from "../components/Profile/ProfilePage.module.css";

export default function ProfilePage() {
  const { isLoading } = useProfileData();

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Routes>
          <Route index element={<ProfileInfo />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </div>
    </div>
  );
}

