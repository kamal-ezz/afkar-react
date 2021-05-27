import { useContext, useState } from 'react'
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap'
import { UserContext } from '../UserContext'
import Paginate from './Paginate'
import { Link } from 'react-router-dom'

function Profile() {


  const { user } = useContext(UserContext)
  const [ userStories,  setUserStories ] = useState([
    {
      id: 1,
      title: 'blabla',
      subtitle: 'uu',
      storyImage: 'imgs/story_img.jpeg'
    },
    {
      id: 1,
      title: 'blabla',
      subtitle: 'uu',
      storyImage: 'imgs/story_img.jpeg'
    }
  ])

  return (
    <Container fluid>
      <Row >
        <Col md={4} 
          style={{ backgroundImage: 'linear-gradient(lightblue,blue)', height: '100vh' }}
          className="d-flex align-items-center justify-content-center flex-column">
          <Row>
              <Image src="imgs/zeke.png" roundedCircle style={{ width: 200, height: 200 }}/>
          </Row>
          <Row style={{ marginTop: 30 }}>
              <h2 className="text-white">Kamal Ezzarmou</h2>   
          </Row> 
        </Col>
        <Col md={8}>
          <h2 className="mt-4">Information</h2>
          <hr />
          <h3 style={{ marginTop: 50 }}>Email</h3>
          <span style={{ fontSize: 18 }}>kamalezzarmou1999@gmail.com</span>
          <h3 style={{ marginTop: 50 }}>Stories</h3>
          <div className="d-flex">
           { (userStories.length !== 0) ? 
                    (
                        userStories.map( story => (
                          <Card style={{ width: '16rem', marginTop: 30, marginLeft: 30 }}>
                            <Card.Img variant="top" src={story.storyImage} />
                            <Card.Body>
                              <Card.Title>{story.title}</Card.Title>
                              <Card.Text>
                                {story.subtitle}
                              </Card.Text>
                              <Link to={`/story/${story.id}`}>
                                <Button variant="dark" >Voir story</Button>
                              </Link>
                            </Card.Body>
                        </Card>
                        ))
                    )
                : (
                    <>
                    <p>No stories found!!</p> 
                    <hr />
                    </>
                ) }
          </div>
          <Paginate />        
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
