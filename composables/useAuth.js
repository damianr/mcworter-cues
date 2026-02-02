export default function useAuth() {
  const nuxtApp = useNuxtApp();
  const user = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const $supabase = computed(() => nuxtApp.$supabase);

  // Initialize auth state
  const initAuth = async () => {
    if (!$supabase.value) {
      loading.value = false;
      return;
    }

    try {
      const { data: { session } } = await $supabase.value.auth.getSession();
      user.value = session?.user || null;

      // Listen for auth changes
      $supabase.value.auth.onAuthStateChange((event, session) => {
        user.value = session?.user || null;
      });
    } catch (e) {
      console.error('Auth init error:', e);
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  // Send magic link
  const sendMagicLink = async (email) => {
    if (!$supabase.value) {
      throw new Error('Supabase not initialized');
    }

    error.value = null;
    
    const { error: authError } = await $supabase.value.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
        shouldCreateUser: false, // Only allow pre-existing users
      },
    });

    if (authError) {
      error.value = authError.message;
      throw authError;
    }

    return true;
  };

  // Sign out
  const signOut = async () => {
    if (!$supabase.value) return;

    const { error: signOutError } = await $supabase.value.auth.signOut();
    if (signOutError) {
      error.value = signOutError.message;
      throw signOutError;
    }
    user.value = null;
  };

  // Check if user is authenticated
  const isAuthenticated = computed(() => !!user.value);

  // Initialize on client
  if (import.meta.client) {
    initAuth();
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    sendMagicLink,
    signOut,
    initAuth,
  };
}
