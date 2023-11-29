import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from '../Button/Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    type,
    size,
    shape,
    disabled = false,
    children,
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const sizes = ['normal', 'small', 'large'];
    const types = ['normal', 'primary', 'outline', 'transparent'];
    const shapes = ['normal', 'rounded', 'vertical'];

    const props = {
        onClick,
        ...passProps,
    };

    // Remove event listener when btn disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on')) {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    if (!size || !sizes.includes(size)) {
        size = 'normal';
    }

    if (!type || !types.includes(type)) {
        type = 'primary';
    }

    const classes = cx('wrapper', {
        [className]: className,
        disabled,
        [size]: size,
        [type]: type,
        [shape]: shape,
    });

    return (
        <Comp className={cx(classes)} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
