import { CareerController } from "./controller/CareerController"
import { PostController } from "./controller/PostController";
import { UserController } from "./controller/UserController"
import { PostPermissionValidation, TokenValidation } from "./middlewares"


export const Controllers = [
    { 
        controller: UserController,
        routes:[{
            method: "post",
            route: "/auth",
            action: "auth"
        },
        {
            method: "get",
            route: "/users",
            middlewares: [TokenValidation],
            action: "all"
        }, {
            method: "get",
            route: "/users/:id",
            middlewares: [TokenValidation],
            action: "one"
        }, {
            method: "post",
            route: "/users",
            middlewares: [TokenValidation],
            action: "save"
        }, {
            method: "delete",
            route: "/users/:id",
            middlewares: [TokenValidation],
            action: "remove"
        }]
    },
    { 
        controller: CareerController,
        routes:[{
            method: "get",
            route: "/career",
            middlewares: [TokenValidation],
            action: "all"
        }, {
            method: "get",
            route: "/career/:id",
            middlewares: [TokenValidation],
            action: "one"
        }, {
            method: "post",
            route: "/career",
            middlewares: [TokenValidation],
            action: "save"
        }, {
            method: "delete",
            route: "/career/:id",
            middlewares: [TokenValidation],
            action: "remove"
        }]
    },
    { 
        controller: PostController,
        routes:[{
            method: "get",
            route: "/posts",
            middlewares: [TokenValidation, PostPermissionValidation],
            action: "all"
        }]
    },
];

// export const Routes = [
// //USERS
// {
//     method: "post",
//     route: "/auth",
//     controller: UserController,
//     action: "auth"
// },
// {
//     method: "get",
//     route: "/users",
//     controller: UserController,
//     middleware: TokenValidation,
//     action: "all"
// }, {
//     method: "get",
//     route: "/users/:id",
//     controller: UserController,
//     middleware: TokenValidation,
//     action: "one"
// }, {
//     method: "post",
//     route: "/users",
//     controller: UserController,
//     middleware: TokenValidation,
//     action: "save"
// }, {
//     method: "delete",
//     route: "/users/:id",
//     controller: UserController,
//     middleware: TokenValidation,
//     action: "remove"
// }
// ]