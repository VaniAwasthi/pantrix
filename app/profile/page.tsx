import type { Metadata } from "next";
import { ProfilePage } from "@/components/profile/ProfilePage";

export const metadata: Metadata = {
  title: "Profile — Pantrix",
};

export default function ProfileRoute() {
  return <ProfilePage />;
}
