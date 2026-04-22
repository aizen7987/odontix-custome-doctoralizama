import Sidebar from "./Sidebar";

export default function Layout({ children }: any) {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-4 w-100">
                {children}
            </div>
        </div>
    );
}