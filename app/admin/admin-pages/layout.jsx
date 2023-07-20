import AdminSidebar from "@components/admin/AdminSidebar";

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <div className="flex flex-col justify-center m-12 h-full w-full">
                { children }
            </div>
        </div>
    );
};

export default Layout;
