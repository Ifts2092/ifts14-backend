import { CareerController } from "./controller/CareerController"
import { CategoryController } from "./controller/CategoryController";
import { DocumentController } from "./controller/DocumentController";
import { FrontendController } from "./controller/FrontendController";
import { PostController } from "./controller/PostController";
import { RoleController } from "./controller/RoleController";
import { SectionController } from "./controller/SectionController";
import { SubjectController } from "./controller/SubjectController";
import { UserController } from "./controller/UserController"
import { CategoryPermissionValidation, PostPermissionValidation, TokenValidation } from "./middlewares"


export const Controllers = [
    { 
        controller: UserController,
        routes:[{
            method: "post",
            route: "auth/login",
            action: "auth"
        },
        {
            method: "get",
            route: "users",
            middlewares: [TokenValidation],
            action: "all"
        }, {
            method: "get",
            route: "users/categories",
            //middlewares: [TokenValidation],
            action: "categories"
        },{
            method: "get",
            route: "users/:id",
            middlewares: [TokenValidation],
            action: "one"
        }, {
            method: "post",
            route: "users",
            middlewares: [TokenValidation],
            action: "save"
        }, {
            method: "delete",
            route: "users/:id",
            middlewares: [TokenValidation],
            action: "remove"
        }]
    },
    { 
        controller: CareerController,
        routes:[{
            method: "get",
            route: "career",
            middlewares: [TokenValidation],
            action: "all"
        }, {
            method: "get",
            route: "career/:id",
            middlewares: [TokenValidation],
            action: "one"
        }, {
            method: "post",
            route: "career",
            middlewares: [TokenValidation],
            action: "save"
        }, {
            method: "delete",
            route: "career/:id",
            middlewares: [TokenValidation],
            action: "remove"
        }]
    },
    { 
        controller: SubjectController,
        routes:[{
            method: "get",
            route: "subject",
            middlewares: [TokenValidation],
            action: "all"
        }, {
            method: "get",
            route: "subject/:id",
            middlewares: [TokenValidation],
            action: "one"
        }, {
            method: "post",
            route: "subject",
            middlewares: [TokenValidation],
            action: "save"
        }, {
            method: "delete",
            route: "subject/:id",
            middlewares: [TokenValidation],
            action: "remove"
        }]
    },
    { 
        controller: PostController,
        routes:[{
            method: "get",
            route: "posts",
            middlewares: [TokenValidation],
            action: "all"
        },
        {
            method: "get",
            route: "posts/:id",

            middlewares: [TokenValidation],
            action: "one"
        },
        {
            method: "post",
            route: "posts",
            middlewares: [TokenValidation],
            action: "save"
        }, {
            method: "delete",
            route: "posts/:id",
            middlewares: [TokenValidation],
            action: "remove"
        }]
    },
    { 
        controller: DocumentController,
        routes:[{
            method: "get",
            route: "documents",
            middlewares: [TokenValidation],
            action: "all"
        },{
            method: "get",
            route: "documents/:id",
            middlewares: [TokenValidation],
            action: "one"
        }, {
            method: "post",
            route: "documents",
            middlewares: [TokenValidation],
            action: "save"
        }, {
            method: "delete",
            route: "documents/:id",
            middlewares: [TokenValidation],
            action: "remove"
        }]
    },
    { 
        controller: CategoryController,
        routes:[{
            method: "get",
            route: "categories",
            middlewares: [TokenValidation],
            action: "all"
        },{
            method: "get",
            route: "categories/:id",
            middlewares: [TokenValidation],
            action: "one"
        }, {
            method: "post",
            route: "categories",
            middlewares: [TokenValidation],
            action: "save"
        }, {
            method: "delete",
            route: "categories/:id",
            middlewares: [TokenValidation],
            action: "remove"
        }]
    },{ 
        controller: SectionController,
        routes:[{
            method: "get",
            route: "sections",
            middlewares: [TokenValidation],
            action: "all"
        },{
            method: "get",
            route: "sections/:id",
            middlewares: [TokenValidation],
            action: "one"
        }, {
            method: "post",
            route: "sections",
            middlewares: [TokenValidation],
            action: "save"
        }, {
            method: "delete",
            route: "sections/:id",
            middlewares: [TokenValidation],
            action: "remove"
        }]
    },{ 
        controller: RoleController,
        routes:[{
            method: "get",
            route: "roles",
            middlewares: [TokenValidation],
            action: "all"
        },{
            method: "get",
            route: "roles/:id",
            middlewares: [TokenValidation],
            action: "one"
        }, {
            method: "post",
            route: "roles",
            middlewares: [TokenValidation],
            action: "save"
        }, {
            method: "delete",
            route: "role/:id",
            middlewares: [TokenValidation],
            action: "remove"
        }]
    },{ 
        controller: FrontendController,
        routes:[{
            method: "get",
            route: "front/posts",
            action: "all_posts"
        }]
    }
];
