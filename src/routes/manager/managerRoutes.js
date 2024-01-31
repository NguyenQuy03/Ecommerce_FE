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
    TransactionTable,
    ProductTable,
    ProductForm
} from '~/views/manager';

import Test from '~/views/test/Test';

//Path
const publicRoutes = [
    { path: '/manager', component: Home },

    { path: '/manager/order/list', component: OrderTable },
    { path: '/manager/order/detail', component: OrderDetail },

    { path: '/manager/transaction/list', component: TransactionTable },

    { path: '/manager/account', component: RegisterForm },
    { path: '/manager/account/seller/list', component: AccountTable },
    { path: '/manager/account/buyer/list', component: AccountTable },
    { path: '/manager/account/detail', component: AccountDetail },

    { path: '/manager/category/list', component: CategoryTable },
    { path: '/manager/category', component: CategoryForm },

    { path: '/manager/product/list', component: ProductTable },
    { path: '/manager/product', component: ProductForm },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
