'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
// import { useGoogleLogin } from '@react-oauth/google'
import { AuthHeader } from '@/components/auth-header'
import { loginService } from './loginService'
import { handleApiError } from '@/core/api/apiError'
// import { toast } from 'sonner'


export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [email,setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try { 
      const response = await loginService.login({ email, password })
      if (!response?.token) {
        setError('Login succeeded but token was not returned')
        return
      }
      localStorage.setItem('accessToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      document.cookie = `accessToken=${encodeURIComponent(response.token)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
      router.push('/app')
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
    // setTimeout(() => {
    //   setLoading(false);
    //   if (email && password) {
    //     toast.success("Login successful");
    //     navigate("/dashboard");
    //   } else {
    //     toast.error("Please enter valid credentials");
    //   }
    // }, 800);
  };

  // const loginWithGoogle = useGoogleLogin({
  //   scope: 'openid email profile',
  //   onSuccess: async (tokenResponse) => {
  //     setIsGoogleLoading(true)
  //     setError(null)
  //     try {
  //       const response = await loginService.googleLogin({
  //         accessToken: tokenResponse.access_token,
  //       })
  //       if (!response?.token) {
  //         setError('Login succeeded but token was not returned')
  //         return
  //       }
  //       localStorage.setItem('accessToken', response.token)
  //       localStorage.setItem('user', JSON.stringify(response.user))
  //       document.cookie = `accessToken=${encodeURIComponent(response.token)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
  //       router.push('/app')
  //       toast.success('Login with Google successful')
  //     } catch (err) {
  //       setError(handleApiError(err))
  //     } finally {
  //       setIsGoogleLoading(false)
  //     }
  //   },
  //   onError: () => {
  //     setError('Google sign-in failed. Please try again.')
  //     setIsGoogleLoading(false)
  //   },
  // })

  return (
    <div className="space-y-6">
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to your Memory Vault account"
      />

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        {/* <button
          type="button"
          disabled={isGoogleLoading || isLoading}
          onClick={() => {
            setError(null)
            setIsGoogleLoading(true)
            loginWithGoogle()
          }}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden className="text-[#4285F4]">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {isGoogleLoading ? 'Connecting to Google...' : 'Sign in with Google'}
        </button> */}

        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">or continue with email</span>
          </div>
        </div> */}

        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-muted-foreground">
                <Mail className="h-4 w-4" />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-muted-foreground">
                <Lock className="h-4 w-4" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-2.5 text-sm focus:border-vault-teal focus:outline-none focus:ring-2 focus:ring-vault-teal/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full rounded-lg bg-vault-teal px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-vault-teal-dark disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Sign in'}
        </button>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-vault-teal hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </form>

      <div className="flex items-center justify-center">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-vault-teal hover:underline font-medium"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  )
}
