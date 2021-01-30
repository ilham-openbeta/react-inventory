import {
    Error, UnitForm,
    UnitList
}
    from "../pages";
import {nanoid} from "nanoid";

const routes = [
    {
        id: nanoid(),
        path: '/units/add',
        component: <UnitForm/>,
        exact: true
    },
    {
        id: nanoid(),
        path: '/units/:id',
        component: <UnitForm/>,
        exact: true
    },
    {
        id: nanoid(),
        path: '/units/',
        component: <UnitList/>,
        exact: true
    },
    {
        id: nanoid(),
        path: '*',
        component: <Error/>
    }

];

export default routes