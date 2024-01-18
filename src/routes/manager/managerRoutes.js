

//Layout

//Pages
import { CategoryTable, CategoryForm } from "~/views/manager";

//Path
const publicRoutes = [
    { path: '/manager/category/list', component: CategoryTable },
    { path: '/manager/category', component: CategoryForm }
]

const privateRoutes = [

]

export { privateRoutes, publicRoutes };

