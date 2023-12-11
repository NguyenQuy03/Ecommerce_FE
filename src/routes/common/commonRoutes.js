

//Layout
import { LayoutBlank } from "~/layouts/CommonLayouts/";

//Pages
import { Login, Register } from "~/views/common";

//Path
const publicRoutes = [
    { path: '/login', component: Login, layout: LayoutBlank },
    { path: '/register', component: Register, layout: LayoutBlank },
]

const privateRoutes = [

]

export { privateRoutes, publicRoutes };

