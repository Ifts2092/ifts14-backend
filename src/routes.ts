import { CareerController } from "./controller/CareerController"
import { DocumentController } from "./controller/DocumentController";
import { PostController } from "./controller/PostController";
import { UserController } from "./controller/UserController"
import { CategoryPermissionValidation, PostPermissionValidation, TokenValidation } from "./middlewares"


export const Controllers = [
    { 
        controller: UserController,
        routes:[{
            method: "post",
            route: "/auth/login",
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
            route: "/admin/posts",
            middlewares: [TokenValidation],
            action: "all"
        },
        {
            method: "get",
            route: "/admin/posts/:id",

            middlewares: [TokenValidation, PostPermissionValidation],
            action: "one"
        },
        {
            method: "post",
            route: "/admin/posts",
            middlewares: [TokenValidation, PostPermissionValidation],
            action: "save"
        }
    ]
    },
    { 
        controller: DocumentController,
        routes:[{
            method: "get",
            route: "/documents",
            middlewares: [TokenValidation],
            action: "all"
        },{
            method: "get",
            route: "/documents/:id",
            middlewares: [TokenValidation],
            action: "one"
        }, {
            method: "post",
            route: "/documents",
            middlewares: [TokenValidation],
            action: "save"
        }
    ]
    },
];
