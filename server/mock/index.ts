import mockProductsHandler from '@/server/api/products'
// 這裡可以多個 mock handler
// import mockUsersHandler from '@/server/api/users.get'

export const mockRoutes = {
    '/api/products': mockProductsHandler,
    // '/api/users': mockUsersHandler
}
