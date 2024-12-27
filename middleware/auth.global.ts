export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useSupabaseUser()
    const authStore = useAuthStore()
    const publicRoutes = ['/', '/login']

    if (!authStore.isAuthenticated && !publicRoutes.includes(to.path)) {
        return navigateTo('/login')
    }

    if (authStore.isAuthenticated && publicRoutes.includes(to.path)) {
        return navigateTo('/welcome')
    }
})