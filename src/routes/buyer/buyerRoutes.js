
//Layout
import { LayoutWithoutBanner } from "~/layouts/BuyerLayouts";

//Pages
import { Cart, Home, Profile, Search, DetailProduct } from "~/views/buyer";

//Path
const publicRoutes = [

    { path: '/', component: Home },
    { path: '/cart', component: Cart, layout: LayoutWithoutBanner },
    { path: '/profile', component: Profile },
    { path: '/product/detail/:id', component: DetailProduct, layout: LayoutWithoutBanner },
    { path: '/search', component: Search, layout: null },
]

const privateRoutes = [

]

export { privateRoutes, publicRoutes };

