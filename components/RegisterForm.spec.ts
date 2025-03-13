import {render, fireEvent, cleanup, getByTestId} from '@testing-library/vue'
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest'
import RegisterForm from './RegisterForm.vue'
import {useAuth} from '@/composables/useAuth'
import { mountSuspended } from '@nuxt/test-utils/runtime'

const mockSignUpNewUser = vi.fn()
vi.mock('@/composables/useAuth', () => ({
  useAuth: () => ({
    signUpNewUser: mockSignUpNewUser,  // Mock de la función signUpNewUser
    login: vi.fn(),
    logout: vi.fn(),
    error: null,
    isAuthenticated: { value: false }  // Mock de la propiedad isAuthenticated
  })
}))

// describe('HelloNuxt', () => {
//   it('can mount the component', async () => {
//     const component = await mountSuspended(HelloNuxt)
//     expect(component.html()).toBeDefined()
//   })

//   it('contains p tag and text Hello Nuxt', async () => {
//     const component = await mountSuspended(HelloNuxt)
//     expect(component.html()).toBeDefined()
//     expect(component.html()).toContain('p')
//     expect(component.html()).toContain('Hello Nuxt')
//   })
// })

describe('RegisterForm', () => {
  beforeEach(() => {
    cleanup()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders correctly', () => {
    const { getByRole, getByLabelText } = render(RegisterForm)

    expect(getByRole('heading', { name: 'Registrarse' })).toBeTruthy()
    expect(getByLabelText('Correo Electrónico')).toBeTruthy()
    expect(getByLabelText('Contraseña')).toBeTruthy()
  });


  it('calls signUpNewUser on form submit', async () => {
    // const { signUpNewUser} = useAuth()

    const { getByLabelText, getByRole } = render(RegisterForm);
    const emailInput = getByLabelText('Correo Electrónico');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByRole('button', {name: 'Registrarse'});

    await fireEvent.update(emailInput, 'test@example.com');
    await fireEvent.update(passwordInput, 'password123');
    console.log('Firing submit')
    await fireEvent.click(submitButton);
    
    expect(mockSignUpNewUser).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('emits switch-view event on link click', async () => {
    const { getByText, getByLabelText, emitted } = render(RegisterForm)
    const loginLink = getByText('Inicia Sesión');
    
    await fireEvent.click(loginLink);
    
    expect(emitted()['switch-view']).toBeTruthy();
    expect(emitted()['switch-view'][0]).toEqual(['LoginForm']);
  });
})