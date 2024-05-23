import { createRouter, createWebHistory } from 'vue-router';

import RecorderComponent from './components/RecorderComponent.vue';
import SummariesView from './pages/SummariesView.vue';
import LoginView from './pages/LoginView.vue';
import { getToken } from './util';


const ROUTE = {
    LOGIN: {
        name: 'Login',
        path: '/',
        hash: '',
        component: LoginView,
    },
    HOME: {
        name: 'Home',
        path: '/home',
        hash: 'home',
        component: RecorderComponent,
    },
    SUMMARY: {
        name: 'Summary',
        path: '/summary/:id',
        component: SummariesView,
    },
}

// Define application routes
const routes = [
    ROUTE.LOGIN, ROUTE.HOME, ROUTE.SUMMARY
];



export default class RouterInstance {
    /**
     * Initializes a new instance of the Router class.
     *
     */
    constructor() {
        const router = createRouter({
            history: createWebHistory(),
            routes,
        });

        this.router = router;

        this.router.beforeEach((to, from, next) => {
            const isAuthenticated = getToken();
            console.log(from.name);
            if(isAuthenticated && to.name === 'Login') {
                next({ name: 'Home' })
            }
            else if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
            else next()
        })
    }
}
