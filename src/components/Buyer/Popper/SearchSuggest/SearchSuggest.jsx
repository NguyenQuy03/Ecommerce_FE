
import SuggestItem from "../../Suggest/SuggestItem/SuggestItem";

import classNames from 'classnames/bind';
import styles from './SearchSuggest.module.scss';
const cx = classNames.bind(styles);

function SearchSuggest({ children, items = [] }) {
    const renderItems = () => {
        return items.map((item, index) => {
            return <SuggestItem key={index} data={item} />;
        });
    };

    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive
                delay={[0, 500]}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('menu-popper')}>{renderItems()}</PopperWrapper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default SearchSuggest;
