import Nav from "@components/client/Nav";

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Nav />
            { children }
        </div>
    );
};

export default Layout;
