

//Layout
import { LayoutWithoutSlider } from "~/layouts/BuyerLayouts";

//Pages
import { Following, Home, Profile, Search, Upload } from "~/Pages/buyer";

//Path
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: LayoutWithoutSlider },
    { path: '/search', component: Search, layout: null },
]

const privateRoutes = [

]

export { privateRoutes, publicRoutes };

