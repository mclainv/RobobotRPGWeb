import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/discord', passport.authenticate('discord'), (req, res) => {
    res.send(200);
    return;
});

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.redirect('http://localhost:3000/menu');
    return;
});

router.get('/status', (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.status(401).send({
            msg: 'Unauthorized'
        });
    }
    return;
});

export default router;