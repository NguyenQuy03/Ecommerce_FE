
import Header from "~/components/Buyer/LayoutComponents/Header";
import Footer from "~/components/Buyer/LayoutComponents/Footer";

function WithOutSidebarLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default WithOutSidebarLayout;