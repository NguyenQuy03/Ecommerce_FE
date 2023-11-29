import { Header, Footer } from '~/layouts/BuyerLayouts/LayoutComponents';

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
