
import classNames from 'classnames/bind';
import styles from './WrapperContent.module.scss';
const cx = classNames.bind(styles);

const WrapperContent = function ({ children, className}) {

    const classes = cx('container', {
        [className]: className,
    });

    return (
        <div className={cx(classes)}>{children}</div>
    );
};

export default WrapperContent;
