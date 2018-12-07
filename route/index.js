var App = require('../src/app');
var RoutesConfig = {
    component: 'div',
    childRoutes: [ 
        {
            path: '/', 
            component: App,
            // indexRoute: { component: Home },
        },
        // {
        //     path:'/register',
        //     component: App,
        //     indexRoute: { component: RoutelineMap }
        // },
        // {
        //     path: "/login",
        //     component: App,
        //     indexRoute: { component: Application }
        // },
        // {
        //     path: "/reset-password",
        //     component: App,
        //     indexRoute: { component: Appsetting }
        // }
    ]
};
module.exports = RoutesConfig;