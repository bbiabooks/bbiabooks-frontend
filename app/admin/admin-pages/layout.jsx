import AdminSidebar from "@components/admin/AdminSidebar";

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <AdminSidebar />
            { children }
        </div>
    );
};

export default Layout;
