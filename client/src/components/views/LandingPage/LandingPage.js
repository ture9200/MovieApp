import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import axios from 'axios';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {


    const [Movies, setMovies] = useState([]) /* 처음 state는 array 가 되어야함 , 많은 정보들을 담고 있어서 하나하나 array  에다가 넣어준다. */ 
    const [MainMovieImage, setMainMovieImage] = useState(null) 
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => { /* 첫번째 20개의 무비 정보를 가져오는것  useEffect 는 react에서 가져온다. */ 
    /* endpoint 로 이용해서 무비를 가져올 수 있다. */ 
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        /* api key config 상수처리해서 가져오고 인기있는 영화를 불러오고 싶으니까 popular , 언어도 영어로 해주고 싶어서 en-us 처리, 페이징 처리 해야하는데 
        우선 첫페이지만 처리하기 위해서 1페이지로 함 */ 
        fetchMovies(endpoint)
        /* endpoint를 fetch 라는 function을 이용해서 넣으면 인기있는 영화드릉ㄹ 가져온다. */ 

    }, [])


    const fetchMovies = (endpoint) => { /* 로드되자마자 endpoint 이용한다. */ 
        fetch(endpoint)
            .then(response => response.json()) /* response 를 json 으로 해서 가져오는데 */ 
            .then(response => { /* 그 결과값을 다시 response로 가져오면 20개가 보이는데 이름, overview, poster image등을 보여주게 된다. */ 
                console.log(response)
                setMovies([...Movies, ...response.results])  /* response 에 가져온것들을 movie state 에 넣기 위해서 set movies 한다음 result 넣어주면 movie state에 들어가 있다. */ 
                /* ... response.results 하면 처음 20개는 사라지고 다음 20개가 덮어진다. 덮어씌우는게 아니라 있던거에 추가를 하려면 movie state 를 넣어주면 된다. */ 
                setMainMovieImage(response.results[0]) 
                setCurrentPage(response.page) /* 현재 페이지 정보를 넣어준다 */ 
            })
    }

    const loadMoreItems = () => {
    /* 버튼을 누를때마다 다음 20개가 로딩 될 수 있도록한다 */ 
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        /* page 2 부터 시작인데 2 이후에도 load more 버튼을 눌러야하니까 그떼는 페이지가 2,3,4 이렇게 되서 current page라는 state 를 만들어주는데
        currentpage  가 1일때는 2가 되고 2일때는 3 이 된다 */ 
        fetchMovies(endpoint)

    }


    return (
        <div style={{ width: '100%', margin: '0' }}>

            {/* Main Image */}
            {MainMovieImage &&
                <MainImage

                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}  /* Main image 가 있으면 이렇게 하라 */ 
                    title={MainMovieImage.original_title} /* 이미지의 title 을 가져오기 위해서 title 부여 */ 
                    text={MainMovieImage.overview} /* 이미지의 텍스트를 가져오기 위해서 text 부여 */ 
                />
            }


            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}

                <Row gutter={[16, 16]} > 
                    
                    {Movies && Movies.map((movie, index) => (  /* movies가 있으면 메서드를 이용해서 하나하나 컨트롤 할 수 있게 하나의  무비들을 가져온다 
                    리액트의 fragment 로 감싸준다. 키값을 넣어줘야 에러가 안난다.  Row gutter 주면 가로 세로 여백 설정된다.*/ 
                        <React.Fragment key={index}> 
                            <GridCards      /* prop으로 grid card 의 정보들을 뿌려줘야한다. prop을 넣어준다. */  
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}  /* 이미지 정보를 movie 에 넣어준다 사이즈를 500으로 준다. 
                                    posterpath 가 없는것도 처리해줘야한다. 없으면 null 로처리  */ 
                                movieId={movie.id} /* 고유 영화정보가 들어가야 하기 때문에 아이디를 줘야한다. */ 
                                movieName={movie.original_title} /* 영화의 네임정보 제공 */ 
                            />
                        </React.Fragment>
                    ))}

                </Row>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}> Load More</button> 
            </div>

        </div>
    )
}

export default LandingPage
