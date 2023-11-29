

//Layout
import { LayoutWithoutBanner } from "~/layouts/BuyerLayouts";

//Pages
import { Following, Home, Profile, Search, Upload } from "~/views/buyer";

//Path
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: LayoutWithoutBanner },
    { path: '/search', component: Search, layout: null },
]

const privateRoutes = [

]

export { privateRoutes, publicRoutes };

