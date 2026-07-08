import { useAuth as useAuthentication } from "../context/AuthContext";

export default function useAuth() {
  return useAuthentication();
}