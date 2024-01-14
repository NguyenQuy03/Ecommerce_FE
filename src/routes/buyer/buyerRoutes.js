
//Layout
import { LayoutWithMenu, LayoutWithoutBanner } from "~/layouts/BuyerLayouts";

//Pages
import { Cart, Home, Search, DetailProduct, Profile, Password, } from "~/views/buyer";

import * as BuyerRouteConstant from "~/constants/buyerRouteConstant";

//Path
const publicRoutes = [

    { path: '/', component: Home },
    { path: '/cart', component: Cart, layout: LayoutWithoutBanner },
    { path: '/product/detail/:id', component: DetailProduct, layout: LayoutWithoutBanner },
    { path: '/search', component: Search, layout: null },

    { path: BuyerRouteConstant.USER_PROFILE_ROUTE, component: Profile, layout: LayoutWithMenu },
    { path: BuyerRouteConstant.USER_PASSWORD_ROUTE, component: Password, layout: LayoutWithMenu },
    { path: BuyerRouteConstant.USER_PURCHASE_ROUTE, component: Profile, layout: LayoutWithMenu },
    { path: BuyerRouteConstant.USER_NOTIFICATION_ROUTE, component: Profile, layout: LayoutWithMenu },
]

const privateRoutes = [

]

export { privateRoutes, publicRoutes };

