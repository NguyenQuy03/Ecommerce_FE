import { Header, Footer } from '~/components/Buyer/LayoutComponents';

function LayoutWithoutSlider({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default LayoutWithoutSlider;
