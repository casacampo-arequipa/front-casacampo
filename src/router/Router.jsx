const router = createBrowserRouter(
    [
        {
            path:"/",
            element: <App/>,
            
            children:[
                {
                    index:true,
                    element: <Home/>,
                    errorElement: <Error404/>
                },
                {
                    path:"/productos",
                    element: <Products/>,
                    errorElement: <Error404/>
                },
                {
                    path:"/contactanos",
                    element: <Contact/>,
                    errorElement: <Error404/>
                },
                {
                    path:"/productos/:id",
                    element: <ProductDetails/>,
                   
                },
                {
                    path:"/carrito",
                    element: <Cart/>,
                    errorElement: <Error404/>
                },
            ]
        },
        {
            path:"/login",
            element: <Login/>,
         
        },
        {
            path:"/register",
            element: <Register/>,
         
        },
        {
            path: "/admin",
            element: <Admin/>,
            children:[
                {
                    path:"/admin/productos",
                    element: <Table/>,
                 
                },
                {
                    path:"/admin/productos/crear",
                    element: <Form/>,
                 
                },
                {
                    path:"/admin/productos/editar/:id",
                    element: <Form/>,
                 
                }, 
            ]
        }       
    ]
)

export default router