import dbDummy from './recipes'

const db=dbDummy.db;

export default {
    createDummy:(req,res)=>{
        for (let i = 0; i < db.length; i++) 
        {
            
            if (parseInt(db[i].id, 10) === parseInt(req.params.recipeId, 10)) 
            {
                if (!db[i].reviews)
                    db[i].reviews = [req.body.content];
                else
                    db[i].reviews.push(req.body.content);

                return res.status(201).json(db[i]);
            }

            if (parseInt(db[i].id, 10) !== parseInt(req.params.recipeId, 10)&&i===db[i].length-1)
                return res.status(404).json({ message: "Recipe not found" })
          }
    }
}