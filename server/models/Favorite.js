const mongoose = require('mongoose');
const Schema = mongoose.Schema; /* mongoose에서 가져온다. */ 

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,  /* ID로 모든 정보를 다 가져올 수 있다. */ 
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
}, { timestamps: true }) /* 생성된 시간을 자동으로 처리 */ 

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite } /* EXPORT 의 역할은 다른 곳에도 쓸 수 있게 해준다 */ 