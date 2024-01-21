import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadAudio_clo(filePath){
    const result= await cloudinary.v2.uploader.upload(filePath, {
      folder: "audios",
      resource_type: "video",
    });
    return result;
}

export async function deleteAudio_clo(public_id){
    return await cloudinary.v2.api.delete_resources([public_id],{
        type:'upload',
        resource_type:'video'
    });

}