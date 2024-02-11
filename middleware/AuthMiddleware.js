import jwt from 'jsonwebtoken';

export const authorization = (req, res, next)=>{
    const token = req.cookies.jwt
    if(token==undefined){
        return res.status(401).send({message:"unauthorized access"})
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = data.id
        res.setHeader('Cache-Control', 'no-store');
        next();
    } catch (error) {
        console.log(error)
    }
}

