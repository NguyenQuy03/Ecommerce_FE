
import classNames from "classnames/bind";
import styles from './TitleSection.module.scss';

const cx = classNames.bind(styles)

function TitleSection({ children }) {
    return <div className={cx('wrapper')}>
        <h1 className={cx('section-title')}>
            <span className={cx('title')}>{children}</span>
        </h1>
    </div>;
}

export default TitleSection;
