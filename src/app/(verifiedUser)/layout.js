import Header from "./header";
import SideNav from "./sidenav";

export default function UserPanelLayout({ children }) {

    return (
        <>
            <div className="flex h-screen bg-gray-50">

                <div className="hidden md:flex md:flex-shrink-0">
                   <SideNav/>
                </div>


                <div className="flex flex-col flex-1 overflow-hidden">
                 <Header/>
                    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
