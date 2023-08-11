import AdminSidebar from "@components/admin/AdminSidebar";

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <AdminSidebar />
            <div className="flex-grow max-w-4xl"> { children } </div>
        </div>
    );
};

export default Layout;
