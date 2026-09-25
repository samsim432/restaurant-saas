import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "owner" | "manager" | "staff";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;

  userId: number | null;
  fullName: string | null;
  email: string | null;

  restaurantId: number | null;
  restaurantName: string | null;

  role: UserRole | null;

  logout: () => void;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState<number | null>(null);
  const [fullName, setFullName] = useState<string | null>(
    null,
  );
  const [email, setEmail] = useState<string | null>(null);

  const [restaurantId, setRestaurantId] =
    useState<number | null>(null);

  const [restaurantName, setRestaurantName] =
    useState<string | null>(null);

  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    const storedUserId =
      localStorage.getItem("user_id");

    const storedFullName =
      localStorage.getItem("user_full_name");

    const storedEmail =
      localStorage.getItem("user_email");

    const storedRestaurantId =
      localStorage.getItem("restaurant_id");

    const storedRestaurantName =
      localStorage.getItem("restaurant_name");

    const storedRole =
      localStorage.getItem("user_role");

    setIsAuthenticated(true);

    setUserId(
      storedUserId
        ? Number(storedUserId)
        : null,
    );

    setFullName(storedFullName);
    setEmail(storedEmail);

    setRestaurantId(
      storedRestaurantId
        ? Number(storedRestaurantId)
        : null,
    );

    setRestaurantName(
      storedRestaurantName,
    );

    if (
      storedRole === "owner" ||
      storedRole === "manager" ||
      storedRole === "staff"
    ) {
      setRole(storedRole);
    } else {
      setRole(null);
    }

    setLoading(false);
  }, []);

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    localStorage.removeItem("user_id");
    localStorage.removeItem("user_full_name");
    localStorage.removeItem("user_email");

    localStorage.removeItem("restaurant_id");
    localStorage.removeItem("restaurant_name");

    localStorage.removeItem("user_role");

    setIsAuthenticated(false);

    setUserId(null);
    setFullName(null);
    setEmail(null);

    setRestaurantId(null);
    setRestaurantName(null);

    setRole(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,

        userId,
        fullName,
        email,

        restaurantId,
        restaurantName,

        role,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
}