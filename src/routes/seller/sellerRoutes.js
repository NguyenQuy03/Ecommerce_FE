

//Layout

//Pages
import {
    OrderDetail,
    OrderTable,
    ProductForm,
    ProductTable,
    TransactionTable,
    SellerHome
} from '~/views/manager';

//Path
const publicRoutes = [
    { path: '/seller', component: SellerHome },

    { path: '/seller/order/list', component: OrderTable },
    { path: '/seller/order/detail', component: OrderDetail },

    { path: '/seller/transaction/list', component: TransactionTable },

    { path: '/seller/product/list', component: ProductTable },
    { path: '/seller/product', component: ProductForm },
];


const privateRoutes = [

]

export { privateRoutes, publicRoutes };

