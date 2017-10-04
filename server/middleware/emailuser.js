export default {
    checkEmailUser:(req,res,next)=>{
        
            let email = req.body.email;
            let username = req.body.username;
            let password = req.body.password;

            let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if (!req.body.username)
                return res.status(400).json({ message: "Username required" });
            else if (!req.body.email)
                return res.status(400).json({ message: "Email required" });
        
            if (username && username.length<5)
                return res.status(400).json({ message: "Username must be a minimum of 5 characters!" });
            else if (!filter.test(email))
                return res.status(400).json({ message: "Invalid email address!" });
            else if (password && password.length<7)
                return res.status(400).json({ message: "Password must be a minimum of 7 characters!" });
            else
                next();           
    }
}