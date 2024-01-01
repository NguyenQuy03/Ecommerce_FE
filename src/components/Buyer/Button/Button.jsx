import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

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

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.oneOf(['default', 'primary', 'outline', 'transparent']),
    size: PropTypes.oneOf(['normal', 'small', 'large', 'tiny']),
    shape: PropTypes.oneOf(['rounded', 'vertical']),
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
