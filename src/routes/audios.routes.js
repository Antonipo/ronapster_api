import { Router } from 'express';
import { getAudios,createAudios,updateAudios,delateAudios,getAudio } from '../controllers/audios.controllers.js';

// 
import path, {dirname} from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// for upload file 

const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename: (req,file,cb)=>{
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});


const router = Router();

router.get('/audios',getAudios)
router.post('/audios',multer({storage}).single('audio'),createAudios)
router.put('/audios/:id',updateAudios)
router.delete('/audios/:id',delateAudios)
router.get('/audios/:id',getAudio)

export default router;
