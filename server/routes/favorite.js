const express = require('express');
const router = express.Router();/* express에서 제공하는 router을 쓰는거 */
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {  /* post 요청으로 처리하니까 post로 처리 프런트에서 보낸 요청을 여기서 받은것 */

    //mongoDB에서   favorite 숫자를 가져오기 무비아이디는 request를 통해서 받는다. index.js에 있는 bodyparser가 있기때문에 body를 이용해서 
    //프런트에서 받은 movieId를 받을 수가 있다. 
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            // 그다음에   프론트에  다시   숫자 정보를 보내주기  
            res.status(200).json({ success: true, favoriteNumber: info.length })
        })

})



router.post('/favorited', (req, res) => {

    // 내가 이 영화를  Favorite 리스트에 넣었는지   정보를  DB 에서 가져오기 
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            // 그다음에   프론트에  다시   숫자 정보를 보내주기  

            let result = false;
            if (info.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result })
        })
})








router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, doc })
        })

})




router.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })

})




router.post('/getFavoredMovie', (req, res) => {

    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites })
        })

})

router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, result) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true })
        })

})



module.exports = router;
