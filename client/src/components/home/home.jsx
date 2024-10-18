// import 'bootstrap/dist/css/bootstrap.css';
// import green from "./components/logo/green.webp"
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  return (
    <>
      <div class="carousel-container">
        <div id="carouselExampleCaptions" class="carousel slide">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div class="carousel-inner">
            <div class="carousel-item active" style={{ height: "40rem" }}>
              <div class="carousel-caption d-md-block">
                <h4 style={{ color: "black", backgroundColor:'white', textDecoration:'underline' }}>Fun Facts</h4>
                <br></br>
                <p style={{textDecoration:'green wavy underline'}}>Did you know that Black-footed ferrets are very chatty?</p>
                <p>They communicate with a variety of noises, including chatters, hisses, whimpers and even barking. Even though they are solitary creatures, they will let you know when they're near. </p>
                <br></br>
                <p style={{textDecoration:'green wavy underline'}}>How about lions being professional cat nappers?</p>
                <p>Just like house-cats, lions spend a good deal of their day napping. Unlike house-cats, a lion can spend up to 20 hours a day napping! Jealous?</p>
                <br></br>
                <p>Want to know more? Visit: <a href="https://www.worldwildlife.org/stories/relatable-facts-about-endangered-species" target="_blank"><p>World Wildlife Fund </p></a></p>
               
              </div>
            </div>

            <div class="carousel-item" style={{ height: "40rem" }}>
              <div class="carousel-caption d-md-block">
                <h5 style={{ color: "black", textDecoration:'underline' }}>Curious about your wildlife? Love to learn?</h5>
                <p>Well, check out these helpful resources!</p>
                <br></br>
                <p>The Wildlife <a href='https://thewildlife.blog/the-wild-life/blog/' target="_blank">Blog</a></p>
                <br></br>
                <p>Willdife <a href='https://blog.nwf.org/' target="_blank">Facts and Convservation Info</a></p>
                <br></br>
                <p>Conservation in <a href='https://www.wildlifeact.com/blog' target="_blank">South Africa</a></p>
                <br></br>
                <p><a href='https://defenders.org/blog' target="_blank">Wildlife Defenders</a></p>
                <br></br>
                <p><a href='https://www.wildlifetrusts.org/wildlife' target="_blank">Explore Wildlife</a></p>
                <br></br>
              </div>
            </div>

            <div class="carousel-item" style={{ height: "40rem",  }}>
              <div class="carousel-caption d-md-block">
                <h5 style={{ color: "black", textDecoration:'underline' }}>Need to know more? Or just like reading?</h5>
                <p>Here are a few fun reads for different ages:</p>
                <br></br>
                <p><a href='https://a.co/d/c0WSqrH ' target="_blank">The Fascinating Animal Book for Kids</a></p>
                <br></br>
                <p><a href='https://a.co/d/9QGMqSd' target="_blank">The Animal Book: A visual Encyclopedia of Life on Earth</a></p>
                <br></br>
                <p><a href='https://a.co/d/bf2kocW ' target="_blank">Zoology: Indeed the Secret World of Animals</a></p>
                <br></br>
                <p><a href='https://a.co/d/c8g6k1U' target="_blank">National Geographic: The Photo Ark</a></p>
                <br></br>
                <p><a href='https://a.co/d/80JJvPl' target="_blank">An Anthology of Intriguing Animals</a></p>
                <br></br>
              </div>
            </div>
          </div>

          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};
