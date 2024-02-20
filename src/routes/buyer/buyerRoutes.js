//Layout
import { LayoutDefault, LayoutWithMenu, LayoutWithoutBanner } from '~/layouts/BuyerLayouts';

//Pages
import { Cart, DetailProduct, Home, Password, Profile, Search } from '~/views/buyer';

import * as BuyerRouteConstant from '~/constants/buyerRouteConstant';

//Path
const publicRoutes = [
    { path: '/', component: Home, layout: LayoutDefault },
    { path: '/cart', component: Cart, layout: LayoutWithoutBanner },
    { path: '/product/detail/:id', component: DetailProduct, layout: LayoutWithoutBanner },
    { path: '/search', component: Search, layout: null },
];

const privateRoutes = [
    { path: BuyerRouteConstant.USER_PROFILE_ROUTE, component: Profile, layout: LayoutWithMenu },
    { path: BuyerRouteConstant.USER_PASSWORD_ROUTE, component: Password, layout: LayoutWithMenu },
    { path: BuyerRouteConstant.USER_PURCHASE_ROUTE, component: Profile, layout: LayoutWithMenu },
    { path: BuyerRouteConstant.USER_NOTIFICATION_ROUTE, component: Profile, layout: LayoutWithMenu },
];

export { privateRoutes, publicRoutes };

