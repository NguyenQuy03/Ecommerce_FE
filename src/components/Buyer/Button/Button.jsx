
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from '../Button/Button.module.scss';

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    primary = false,
    outline = false,
    transparent = false,
    disabled = false,
    rounded = false,
    small = false,
    large = false,
    children,
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...passProps 
}) {

    let Comp = "button"

    const props = {
        onClick,
        ...passProps,
    }

    // Remove event listener when btn disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on')) {
                delete props[key]
            }
        })
    }

    if (to) {
        props.to = to;
        Comp = Link
    } else if (href) {
        props.href = href;
        Comp = "a"
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        disabled,
        transparent,
        rounded,
        small,
        large,
    })

    return (
        <Comp className={cx(classes)} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;