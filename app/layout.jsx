import "@styles/global.css";
import { AuthProvider } from "@utils/AuthContext";

export const metadata = {
  title: "BBIA Book Library System",
  description: "",
};

const RootLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          { children }
        </body>
      </html>
    </AuthProvider>
  );
};

export default RootLayout;
