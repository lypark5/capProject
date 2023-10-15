import './AboutMe.css';

const AboutMePage = () => {
  return (
    <div id='about-overlord'>
      <div id='about-meat'>
        <img src='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/specialCat.jpg' alt='special_cat' id='special-cat-pic'/>
        <div id='about-words-div'> 
          <span id='meet-title'>Meet the dev</span>
          <p id='ludia-sentence'>Hi, I'm <strong><span style={{color:'rgb(0, 103, 193)'}}>Ludia Park</span></strong>.<br />Enjoy this cat.</p>
          <div id='ludi-links-container'>
            <a href='https://github.com/lypark5' id='ludi-link1' target='_blank'>
              <i className='fab fa-github'></i>
            </a>
            <a href='https://www.linkedin.com/in/ludia-park-172496293/' id='ludi-link2' target='_blank'>
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


export default AboutMePage