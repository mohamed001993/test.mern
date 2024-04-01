const express=require("express")
const user=require("../Model/User")
const {registerCheck,loginCheck,validator}=require("../Middelwares/Validator")
const bcrypt=require("bcrypt")
const router=express.Router()
const jwt=require("jsonwebtoken")
const isAuth = require("../Middelwares/isAuth")
const isadmin=require("../Middelwares/isAdmin")
const upload = require("../utils/multer")



router.get("/",isAuth(),isadmin,async(req,res)=>{
    try {
        const result=  await  user.find()
        res.send(result)
 } 
     catch (error) {
     console.log(error)
 }
})
router.post("/register", upload("user").single("file"), registerCheck(), validator, async (req, res) => {
    try {
        // Vérifie si un fichier a été téléchargé
        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        // Traitement du fichier téléchargé
        const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;

        // Extraction des données de la requête
        const { email, password } = req.body;

        // Vérification si l'utilisateur existe déjà
        const existUser = await user.findOne({ email });
        if (existUser) {
            return res.status(400).send({ msg: "User already exists. Please login." });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création d'un nouvel utilisateur avec les données de la requête
        const newuser = new user({
            email,
            password: hashedPassword,
            img: url // Sauvegarde de l'URL du fichier téléchargé dans l'utilisateur
        });

        // Sauvegarde de l'utilisateur dans la base de données
        await newuser.save();
        
        // Renvoi de la réponse
        res.send(newuser);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server Error" });
    }
});
router.post('/login', loginCheck(), validator, async (req, res) => {
    const { email, password } = req.body
    try {
        const existUser = await user.findOne({ email })
        if (!existUser) {
            return res.status(400).send({ msg: "bad credential !!" })
        }
        const isMatched = await bcrypt.compare(password, existUser.password)

        if (!isMatched) {
            return res.status(400).send({ msg: "bad credential !!" })
        }
        existUser.password = undefined
        const payload = { _id: existUser._id }
        const token = jwt.sign(payload, process.env.secretKey)
        res.send({ user: existUser, token })
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: error.message })
}})
router.get("/current",isAuth(),(req,res)=>{
    res.send({User:req.user})
})

module.exports= router