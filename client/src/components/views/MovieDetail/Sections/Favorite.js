import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd';

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime


    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    let variables = {
        userFrom: userFrom,  /* 누가 좋아요를 눌렀는지 */
        movieId: movieId,  /* 어떤 영화를 좋아하는지에 대해서 정보  */ 
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }


    useEffect(() => {  /* 리액트라이브러리에서 useEffect가져옴,  얼마나 많은 사람이 이 영화를 favorite 리스트에 넣었는지 그 숫자 정보 얻기 */ 


        Axios.post('/api/favorite/favoriteNumber', variables)  /* 데이터를 post 방식을 사용해서 db정보들을 가져온다  서버에서 가져올 때 어떤 무비의 정보를 원하고 
          어떤 사람이 favorite 을 했는지 등에 대한 정보를 줘야 서버에서 정보 ( 위에 있는 variables) 를 줘야 올바른 정보를 받을 수 있다.   */
            .then(response => { /* 요청을 처리해야 그 값을 주는데 결과값은 그 response 에 들어오게 된다 */ 
                setFavoriteNumber(response.data.favoriteNumber)
                if (response.data.success) {  /* response data 가 성공적으로 들어오면 처리를 해야한다 */ 
                } else {  /* 실패를 했으면 실패에 대한 처리를 경고창을 띄움 */ 
                    alert('숫자 정보를 가져오는데 실패 했습니다.')
                }
            })


        Axios.post('/api/favorite/favorited', variables) /* 또 데이터를 가져오는데 같은 방식으로 처리 */ 
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('정보를 가져오는데 실패 했습니다.')
                }
            })



    }, [])


    const onClickFavorite = () => {

        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 지우는 걸 실패했습니다.')
                    }
                })


        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)

                    } else {
                        alert('Favorite 리스트에서 추가하는 걸 실패했습니다.')
                    }
                })
        }

    }



    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? " Not Favorite" : "Add to Favorite "}  {FavoriteNumber}  </Button>

        </div>
    )
}

export default Favorite
