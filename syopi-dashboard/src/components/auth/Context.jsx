import React, { useContext, useState, useEffect } from 'react'
import { supabase } from './client'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    async function login(email, password){
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password, 
          }, { 
            headers : {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          })
          // .then(() => {
          //   setUser(data.user)
          // })
          // supabase.auth.session().then(({ access_token }) => {
          //   supabase.auth.setAuth(access_token)
          })
          
          localStorage.setItem('user', JSON.stringify(data.user));
          console.log(user.)
          setUser(data.user);
          localStorage.setItem('jwt', data.access_token);

      } catch(e){
        console.log(e)
      }
   }

   async function logout(){
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setUser(null);
        localStorage.removeItem('user');
      }
    } catch(e){
      console.log(e);
    }
  }
  
  

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      
      const { unsubscribe } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session.user);
          localStorage.setItem('user', JSON.stringify(session.user));
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.clear();
        }
        setLoading(false);
      });
      
      return unsubscribe;
    }, []);
    
      
      // return () => {
      //   if (Listener) {
      //     console.log(Listener)
      //     Listener.unsubscribe;
      //   }}
      // }      
  
    // Will be passed down to Signup, Login and Dashboard components
    const value = {
      signUp: (data) => supabase.auth.signUp(data),
      signIn: (data) => supabase.auth.signIn(data),
      signOut: () => supabase.auth.signOut(),
      user,
      login,
      logout,
      
    }
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
   
  }


