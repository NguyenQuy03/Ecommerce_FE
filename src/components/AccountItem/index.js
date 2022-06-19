
import classNames from "classnames/bind";
import styles from '../AccountItem/AccountItem.module.scss'
import { AiFillCheckCircle } from 'react-icons/ai';

const cx = classNames.bind(styles)

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} alt="avatar" src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/e99846f00ab6702d7716ba8d72a98d7a~c5_300x300.webp?x-expires=1655773200&x-signature=XhE1b43N62MCAARILWekpPP%2BYV0%3D" />
            <div className={cx('info')}>
                <p className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <AiFillCheckCircle className={cx('check')} />
                </p>
                <span className={cx('username')}>nguyenvana</span>

            </div>
        </div>
    );
}

export default AccountItem;