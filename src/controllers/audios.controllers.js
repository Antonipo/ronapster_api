import Audio from '../models/audio.model.js';
import { uploadAudio_clo,deleteAudio_clo } from '../utils/cloudinary.js';
import fs from 'fs-extra';


export const getAudios =  async (req,res)=>{
    try {
        const audios = await Audio.find()   
        res.json(audios) 
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}

export const getAudio = async(req,res)=>{
    try {
        const audio = await Audio.findById(req.params.id)
        if (!audio) return res.status(404).json({
            message:'Product does not exists'
        })
        return res.json(audio)    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const createAudios = async (req,res)=>{
    try {
        const {name,author} =req.body
        const newAudio = new Audio({
            name,
            author,
        })

        if(req.file){
            const result = await uploadAudio_clo(req.file.path)
            newAudio.audio={
                audioURL:result.secure_url,
                public_id:result.public_id
            }
            // audio.audioURL = result.secure_url;
            // audio.public_id = result.public_id;
            await fs.unlink(req.file.path)
        }
        
        await newAudio.save()
        res.json(newAudio)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateAudios = async(req,res)=>{
    const {id}= req.params;
    try {
        const audioUpdating = await Audio.findByIdAndUpdate(id, req.body,{new: true})
        return res.json(audioUpdating)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}

export const delateAudios = async(req,res)=>{
    try {
        const audio = await Audio.findByIdAndDelete(req.params.id);
        if (!audio)
            return res.status(404).json({message: "Product does not exists",});

        if(audio.audio.public_id){
            await deleteAudio_clo(audio.audio.public_id)
        }
        return res.json(audio);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}