import React from 'react';
import './Home.css';

import {Carousel, Row, Col} from 'react-bootstrap';

function Home() {
    return (
        <div>
          <section className="bg-black text-light mt-2 pt-3 font-weight-bold">
                <div className = "d-sm-flex align-items-center justify-content-center">
                    <h1>
                        All Horror 50% Off!
                    </h1>
                    <img className ="img-fluid w-25" alt = 'bat' src = "https://ak.picdn.net/shutterstock/videos/7297471/thumb/1.jpg"></img>
                </div> 
          </section>

          <section className = "mt-3 mb-3">

            <Carousel>
              <Carousel.Item className = "item">               
                <img
                  style = {{maxHeight: "100%", maxWidth: "100%"}}
                  className="w-100 img-fluid"
                  src="https://th.bing.com/th/id/R.12b961bd9422214328569afc4440395f?rik=fBSO5JjIkbZHig&riu=http%3a%2f%2f4.bp.blogspot.com%2f-uiQT7mu68k0%2fU2FqvQS_MnI%2fAAAAAAAARRU%2f1yM3fCmi6lM%2fs1600%2fcoconut%2boil%2bcoffee%2bgreen%2bclean%2beating%2bliving%2brecipe.jpg&ehk=89jFlRpBsoGb4tuanLggseCNyTwf32u7cRg6ZHSqEYc%3d&risl=&pid=ImgRaw&r=0"
                  alt="Comfortable Setting" />
                
                <Carousel.Caption>
                  <h1 className="caption">Grab Some Coffee And A Book</h1>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item className = "item">
                <img
                  style = {{maxHeight: "100%", maxWidth: "100%"}}
                  className="w-100 img-fluid"
                  src="https://i1.wp.com/www.monstersandcritics.com/wp-content/uploads/2020/10/Golden-Kamuy-Season-4-Release-Date-Anime-Asirpa-Sugimoto.jpg?fit=1200%2C675&ssl=1"
                  alt="Manga" />

                <Carousel.Caption>
                  <h1 className="caption">Buy 1 Get 2 Free When Buying Manga</h1>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item className = "item">
                <img
                  style = {{maxHeight: "100%", maxWidth: "100%"}}
                  className="w-100 img-fluid"
                  src="https://www.gannett-cdn.com/presto/2021/09/30/USAT/5e9163d8-23ca-45a6-a4b0-fe038d3964b8-My_Post.jpg?crop=2549,1434,x0,y85&width=2549&height=1434&format=pjpg&auto=webp"
                  alt="Arrivals"/>

                <Carousel.Caption>
                  <h1 className="caption">New Arrivals</h1>
                </Carousel.Caption>
              </Carousel.Item>

            </Carousel>
          </section>

          <section className = "m-2 ms-3">
            <Row className = "mb-2">
              <Col className = 'col-7 d-flex justify-content-center text-center align-items-center p-4' style = {{background: "pink"}}>
                <h1 className = "valentines display-3">
                  Get in the mood for Valentine's Day with these recommended picks!
                </h1>
              </Col>

              <Col className= "col-5">
                <Row>
                  <Col> 
                    <img 
                      src = "https://images-na.ssl-images-amazon.com/images/I/71z7DezQzkL.jpg"
                      alt = 'romance book'
                      style = {{height: "25rem", width: "100%"}}/>
                  </Col>
                </Row>

                <Row>
                  <Col> 
                    <img 
                      src = "https://shereads.com/wp-content/uploads/2020/02/81gHqxKP2sL.jpg"
                      alt = 'romance book'
                      style = {{height: "25rem", width: "100%"}}/>
                  </Col>
                </Row>
              </Col>
            </Row>            
          </section>

          <section className ="author_feature">
            <h1> Featured Author </h1>
            <div className = "d-md-flex">
              <img 
                src = "https://i.guim.co.uk/img/media/ba1363b55f8abc5182d3902853d1955649cc362f/0_1088_2832_1699/master/2832.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=c7d6746750a5f1d27c432a1ded9d2192" 
                className = "img-fluid w-25 me-2"
                alt = 'Neil Gaiman'/>
              <div>
                <h2> Neil Gaiman </h2>
                <hr />
                <p> Neil Richard MacKinnon Gaiman, born Neil Richard Gaiman on 10 November 1960,is an English 
                  author of short fiction, novels, comic books, graphic novels, nonfiction, audio theatre, and 
                  films. His works include the comic book series The Sandman and novels Stardust, 
                  American Gods, Coraline, and The Graveyard Book. He has won numerous awards, 
                  including the Hugo, Nebula, and Bram Stoker awards, as well as the Newbery and 
                  Carnegie medals. He is the first author to win both the Newbery and the Carnegie medals 
                  for the same work, The Graveyard Book (2008). In 2013, The Ocean at the End of the Lane 
                  was voted Book of the Year in the British National Book Awards. It was later adapted into 
                  a critically acclaimed stage play at the Royal National Theater in London, England that The 
                  Independent called "...theater at its best".</p>
            </div>
          </div>
        </section>

      </div>

    );
};

export default Home;