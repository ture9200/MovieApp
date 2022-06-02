import React from 'react'
import { Col } from 'antd';

/*rfce 자동으로 functional component 가 완성 */ 
function GridCards(props) {

    if (props.landingPage) {
        return ( /* 창 크기를 줄일 때마다 보여지는 그림의 개수 설정 
        large 기준 6 (*4 =24) , medium 기준 8 (*3 =24) , xsmall 기준 24 (*1 =24)
        prop으로 받은 걸 넣어준다. */ 
            <Col lg={6} md={8} xs={24}> 
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`} > 
                        <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </Col>
        )
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>

                    <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.characterName} />

                </div>
            </Col>
        )
    }

}

export default GridCards
