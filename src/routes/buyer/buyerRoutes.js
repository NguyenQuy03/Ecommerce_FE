

//Layout
import { WithOutSidebarLayout } from "~/layouts/BuyerLayouts";

//Pages
import { Home, Following, Profile, Upload, Search } from "~/Pages/buyer";

//Path
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: WithOutSidebarLayout },
    { path: '/search', component: Search, layout: null },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }