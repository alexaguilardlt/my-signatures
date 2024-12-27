import {ref} from 'vue';
import {navigateTo} from '#app';

export function useAuth() {
  const supabase = useSupabaseClient()
  const authStore = useAuthStore()
  const isAuthenticated = useState<boolean>('isAuthenticated', () => false);
  const error = ref<string | null>(null);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
  
    if (error) {
      if (error.message === 'Email not confirmed') {
      } else {
        console.error('Error en el login:', error.message)
      }
    } else {
      authStore.login()
      navigateTo('/welcome')
    }
    console.log('user', data)
  }

  const signUpNewUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
  
    if (error) {
      console.error('Error en el registro:', error.message)
    } else {
      authStore.login()
      navigateTo('/welcome')
    }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    authStore.logout()
    navigateTo('/login')
  }

  return { isAuthenticated, error, signUpNewUser, login, logout };
}
