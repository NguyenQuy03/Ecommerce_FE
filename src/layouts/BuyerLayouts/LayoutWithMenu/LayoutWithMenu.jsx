import { Col, Menu, Row } from 'antd';
import { Footer, Header } from '~/layouts/BuyerLayouts/LayoutComponents';
import { Link } from 'react-router-dom';
import { Bell, Person, Receipt } from 'react-bootstrap-icons';

import { WrapperComponent } from '~/components/Buyer/Wrapper';
import * as BuyerRouteConstant from "~/constants/buyerRouteConstant";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('My Account', 'account', <Person />, [
        getItem(<Link to={BuyerRouteConstant.USER_PROFILE_ROUTE}>Profile</Link>, 'profile'),
        getItem(<Link to={BuyerRouteConstant.USER_PASSWORD_ROUTE}>Change Password</Link>, 'changePass'),
    ]),
    getItem(<Link to={BuyerRouteConstant.USER_PURCHASE_ROUTE}>My Purchase</Link>, 'purchase', <Receipt />),
    getItem(<Link to={BuyerRouteConstant.USER_NOTIFICATION_ROUTE}>My Notification</Link>, 'notification', <Bell />),
];

function LayoutWithMenu({ children }) {
    return (
        <>
            <Header />
            <Row align={'middle'}>
                <Col span={24}>
                    <Row align={'middle'} justify={'center'}>
                        <WrapperComponent>
                            <Row>
                                <Col span={5}>
                                    <Menu
                                        defaultSelectedKeys={['profile']}
                                        defaultOpenKeys={['account']}
                                        mode="inline"
                                        items={items}
                                    />
                                </Col>
                                <Col span={19}>{children}</Col>
                            </Row>
                        </WrapperComponent>
                    </Row>
                </Col>
            </Row>
            <Footer />
        </>
    );
}

export default LayoutWithMenu;
