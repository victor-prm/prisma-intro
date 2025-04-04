export default function(req, res, next){
    
    //Hvis ikke der er en header
    if (!req.headers.authorization){
        return res.status(401).json({message:"Du har ikke adgang til denne funktionalitet"});
    }
    //Hvis ikke token matcher
    if (req.headers.authorization != "Bearer 123456789"){
        return res.status(403).json({message:"Ugyldig nøgle"});
    }
    //Next er den funktion der skal kører hvis alt ovenover er på plads
    next();
}