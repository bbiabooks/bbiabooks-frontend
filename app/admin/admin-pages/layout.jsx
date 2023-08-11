import AdminSidebar from "@components/admin/AdminSidebar";

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen w-screen flex-col md:flex-row">
            <AdminSidebar />
            <div className="flex-grow"> { children } </div>
        </div>
    );
};

export default Layout;
