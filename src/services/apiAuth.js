import supabase from "./superbase";

/*a function to sign up new users */
export async function signup({fullName, email, password}){
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    
    options: {data:{
      
      fullName,
      avatar: "",
          }
    }
    
  })

  if(error)
    throw new Error(error.message)
  //console.log(data)
  return data;

}

/*here we'll pass an obj that conatine email and password which is deconstruscted, */
export async function login({email, password}){
  /*.auth is a sub method, with it come many methods,
  and signInWithPassword() is one of them */
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    // or just email,
    password,
    // or just password,
  })

  if(error)
    throw new Error(error.message)
  console.log(data)
  return data;
}

/*a function to load the user from supabase*/
export async function getCurrentUser(){
  
  const {data: session} = await supabase.auth.getSession()
  
  if(!session?.session) return null;
  
  const {data, error} = await supabase.auth.getUser() /*so from checking in session exist, 
  we return data of the current user */
  console.log(data) // then we loged that user, which is inside the data obj

  if(error) throw new Error(error.message)
  return data?.user; // we are only interested in retuning the current user itself
}

// a funtion to logout the user
export async function logout(){
  const {error} = await supabase.auth.signOut()

  if(error) throw new Error(error.message)
}

// function to allow uset to update password and uplaod image
export async function updateCurrentUser({password, fullName, avatar}){
  // 1. Update password or fullName
  
  // let's create the obj that will be passed in
  let updateData;
 
  if(password) updateData = {password}
  
  if(fullName) updateData = {data: {fullName}}

  const {data, error} = await supabase.auth.updateUser(updateData)
  
  if(error) throw new Error(error.message)

  /*if there is no avatar then we are done at this point */
  if(!avatar) return data;

  // 2. Upload the avatar image
  
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  /*and just like cabins images we have a storage bukest for avatars,
  so for this we'll receive the error not the data */
  const {error: storageError} = await supabase.storage.from("avatars")
  .upload(fileName, avatar, { upsert: true  })
  /*the fileName we are gonna get it from the data that we get from handleSubmit function
  from updateUserDataFrom.jsx,  */
   if(storageError) throw new Error(storageError.message)

  
  // 3. Get the public URL
  const {
    data: { publicUrl }, // publicUrl is not an invented name, it's a property of data obj
    // and it containe the url of the avatar that we get from .getPublicUrl(fileName)
        } = 
        /*"I want to work with the avatars storage bucket." */
        supabase.storage
          .from("avatars")
        /*"I want to work with the avatars storage bucket." */  
          .getPublicUrl(fileName); // it's a supabase method
  

  const {data: updatedUser, error: error2} = await supabase.auth.updateUser({
    /*of course this avatar needs to go to the data obj,
    and we'll specify the url of that avatar with the fileName that we created */
    data: {
      avatar: publicUrl,
    }
  });

  if(error2) throw new Error(error2.message)
  return updatedUser  
}