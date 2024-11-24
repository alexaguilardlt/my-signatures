export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useSupabaseUser()
    const publicRoutes = ['/', '/login']

    if (!user.value && !publicRoutes.includes(to.path)) {
        return navigateTo('/login')
    }
})