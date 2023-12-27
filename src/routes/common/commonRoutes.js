
//Pages
import { Login, Missing, Register } from "~/views/common";

//Path
const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/*', component: Missing, layout: null },
]

const privateRoutes = [

]

export { privateRoutes, publicRoutes };

