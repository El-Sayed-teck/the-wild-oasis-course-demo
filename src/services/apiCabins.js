import supabase, { supabaseUrl } from "./superbase";

export async function getCabins(){
  const { data, error } = await supabase
    .from('cabins')/*now we'll quarry this supabase client, creating quaries */
    .select('*')/*that will return in this case from the "cabins" all the fields("*")*/

  /*let's check if there is an error,
 */
  if(error){
    console.error(error)
    throw new Error(`Cabins could not be loaded`)
  }
  return data; 
}


export async function deleteCabin(id){
  const {  error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
  
   if(error){
    console.error(error)
    throw new Error(`Cabin could not be deleted`)
  }
  
}


export async function createEditCabin(newCabin, id){  
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', "")

  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
   
  // 1. Create/edit the cabin
  let query = supabase.from("cabins")

  // A) Create
  if(!id) // if there is no id
    query = query
    /*here we'll pass an array with one obj, which is newCabin */
    .insert([{...newCabin, image: imagePath}])

    // B) for Edit
    /*this is for if there is actually an id */
    if(id)     
      query = query 
      .update({...newCabin, image: imagePath }) 
      .eq('id', id)

    const {data, error} = await query.select().single(); 

    if(error){
     console.error(error)
     throw new Error(`Cabin could not be created, sorry`)
    // console.error("CABIN DATABASE ERROR:", error);
    // throw new Error(error.message);
  }

  // 2. if creating is succesfull, upload the image
    /*for the duplication logic, if the image has already a path,
  in the case that an image has already been uploaded fro this cabin,
  then that means that we shoudn't uplaod anything here,
  so we'll do an if statment, if the image already has a path so it's alraedy uploaded,
  then return the data early, so the image is never uploaded*/
  if(hasImagePath) return data
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images') // the name of our bucket
    .upload(imageName, newCabin.image ); /*in .upload() we need to specify the name of the fileand the fileitself */
    
  // 3. Delete the cabin if there was a error uploading image
  
  if(storageError){
    await supabase
    .from('cabins')
    .delete()
    .eq('id', data.id);
    console.error(storageError)
    throw new Error(`Cabin image could not be uploaded and the cabin was not created`)
  }

  return data;
}