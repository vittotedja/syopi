import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Review.css';

const starVariants = {
  initial: {
    scale: 0
  },
  animate: i => ({
    scale: 1,
    transition: {
      delay: i * .04,
      duration: .25,
      type: 'spring',
      stiffness: 175
    }
  }),
  exit: (i: any) => ({
    scale: 0,
    transition: {
      duration: .25,
      delay: .2 - i * .04,
    }
  }),
  hovered: {
    scale: .8,
    transition: {
      duration: .2
    }
  }
}
const Star = ({ i, isHoveringWrapper, isClicked }) => {
  const [isHovering, setIsHovering] = useState(false);
  const starControls = useAnimation();
  const backgroundControls = useAnimation();
  useEffect(() => {
    if (isClicked && isHovering) starControls.start('hovered');
    else if (isClicked) starControls.start('animate');
    else starControls.start('exit');
  }, [isClicked, isHovering]);
  useEffect(() => {
    if (isHoveringWrapper) backgroundControls.start({ background: '#ffd700' });
    else backgroundControls.start({ background: '#aaaaaa' });
  }, [isHoveringWrapper]);
  return (
    <>
      <motion.div 
        className="star-background" 
        initial={{ background: '#aaaaaa' }}
        animate={backgroundControls}
      />
      <motion.i 
        className="fa fa-star" 
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        variants={starVariants}
        initial="initial"
        animate={starControls}
        custom={i}
      />
    </>
  )
}
const StarRating = (props:any) => {
  const [isClicked, setIsClicked] = useState(0);
  const [isHovering, setIsHovering] = useState(0);
  const [specificProduct, setSpecificProduct] = useState({});

  let navigate = useNavigate()

  function getAvgRating(ProductId: any){
    fetch(`http://127.0.0.1:5000/rating/${ProductId}`)
    .then((response)  => response.json())
    .then((data) => console.log(data))
  }

  function getSpecificProduct(ProductId: any){
    fetch(`http://127.0.0.1:5000/product/${ProductId}`)
    .then((response:any)  =>response.json())
    .then((data:any) => {
      console.log(data)
      setSpecificProduct(data)
    })
  }

  function giveRating() {
    const data = {
        product_id: props.ProductId,
        review_description: "ehehhehh",
        review_rating: isClicked,
        user_id: 2
    }
    fetch(`http://127.0.0.1:5000/giverating`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
  .then((response) => {
    response.json()
    getSpecificProduct(props.ProductId)
  })
  .then((data) => {
    const avgRating:any = getAvgRating(props.ProductId)
    console.log("Success:", data)
    setSpecificProduct({
      ...specificProduct,
      AvgRating: avgRating
    })
})
.then(() =>
{navigate('/')
})
  .catch((error) => {
    console.error("Error:", error);
  });
}
  
  return (
    <>
    <div className="star-rating" onMouseLeave={() => setIsHovering(0)}>
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div 
            className="star-wrapper"
            onMouseOver={() => setIsHovering(i)}
            onClick={() => {i!=isClicked ? setIsClicked(i) : setIsClicked(0)}}
            key={i}
          >
            <Star 
              i={i}   
              isHoveringWrapper={isHovering >= i} 
              isClicked={isClicked >= i}    
            />  
          </motion.div>
        ))}
      </div>
    <button disabled = {isClicked < 1} onClick={() => giveRating()}>Add Review</button>
    </div>
    </>
  )
}

export default StarRating;