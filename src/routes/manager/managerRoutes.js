//Layout

//Pages
import {
    CategoryTable,
    CategoryForm,
    AccountTable,
    RegisterForm,
    AccountDetail,
    Home,
    OrderTable,
    OrderDetail,
} from '~/views/manager';

//Path
const publicRoutes = [
    { path: '/manager', component: Home },

    { path: '/manager/account', component: RegisterForm },
    { path: '/manager/account/seller/list', component: AccountTable },
    { path: '/manager/account/buyer/list', component: AccountTable },
    { path: '/manager/account/detail', component: AccountDetail },

    { path: '/manager/category/list', component: CategoryTable },
    { path: '/manager/category', component: CategoryForm },

    { path: '/manager/order/list', component: OrderTable },
    { path: '/manager/order/detail', component: OrderDetail },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
