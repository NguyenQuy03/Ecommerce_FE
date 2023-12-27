
import classNames from 'classnames/bind';
import styles from './WrapperContent.module.scss';
const cx = classNames.bind(styles);

const WrapperContent = function ({ children }) {
    return (
        <div className={cx('container')}>{children}</div>
    );
};

export default WrapperContent;
