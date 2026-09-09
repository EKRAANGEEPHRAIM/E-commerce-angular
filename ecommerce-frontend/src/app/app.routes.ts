import { Routes } from '@angular/router';
import { Login } from './pages/admin/login/login';
import { Layout } from './pages/admin/layout/layout';
import { Product } from './pages/admin/product/product';

export const routes: Routes = [
    {
        path:'',
        redirectTo : 'login',
        pathMatch:'full'
    },

    {
        path:'login',
        component:Login

    },
    {
        path:'',
        component: Layout,
        children: [
            {
                path:'product',
                component: Product
            }
        ]
    }
];
