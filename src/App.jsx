import { useState, useEffect, useRef } from 'react';
import './App.css';
import ConfettiExplosion from './ConfettiExplosion.jsx';
import ImageScroller from './ImageScroller.jsx';
import DiaryPage from './DiaryPage.jsx';

// Get data from .env
const data = {
  name: import.meta.env.VITE_NAME || 'Jainish 👋',
};

function App() {
  const [sec, setSec] = useState(0);
  const [step, setStep] = useState(1); // Main flow (1 = intro, 2 = wish)
  const [introStep, setIntroStep] = useState(1); // Sub-flow (1 = "Hey", 2 = "I wanted to...")
  const [showConfetti, setShowConfetti] = useState(false);
  
  // --- FIX 1: Add new state for Diary Modal ---
  const [isDiaryOpen, setIsDiaryOpen] = useState(false);

  // Ref for the audio files
  const audioRef = useRef(null);
  const confettiSfxRef = useRef(null);

  // Refs for animation targets
  const nameRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);
  const oneRef = useRef(null);
  const wishHbdRef = useRef(null);
  const wishTextRef = useRef(null);
  const heartRef = useRef(null);
  const refreshBtnRef = useRef(null);
  const heartIconRef = useRef(null);

  // Re-usable animateCSS function
  const animateCSS = (element, animation, delay, prefix = 'animate__') =>
    new Promise((resolve) => {
      const animationName = `${prefix}${animation}`;
      const node = element.current;
      if (node) {
        node.classList.add(`${prefix}animated`, animationName);

        function handleAnimationEnd(event) {
          event.stopPropagation();
          node.classList.remove(`${prefix}animated`, animationName);
          if (delay !== 0) {
            setTimeout(() => {
              node.classList.add('invisible');
            }, delay * 1000);
          }
          resolve('Animation ended');
        }
        node.addEventListener('animationend', handleAnimationEnd, { once: true });
      } else {
        resolve('Element not found');
      }
    });

  // Balloon creation function
  function createBalloons(num) {
    const balloonContainer = document.getElementById('balloon-container');
    if (!balloonContainer) return;

    function random(num) {
      return Math.floor(Math.random() * num);
    }

    function getRandomStyles() {
      var h = random(180) + 60;
      var s = random(25) + 70;
      var l = random(20) + 70;
      var mt = random(200);
      var dur = random(5) + 5;
      var l_shadow = l - 10;
      var left = random(95);
      var sparkleDelay = (random(20) / 10).toFixed(1);

      return `
        background-color: hsla(${h},${s}%,${l}%, 0.7);
        color: hsla(${h},${s}%,${l}%, 0.7); 
        box-shadow: inset -7px -3px 10px hsla(${h},${s}%,${l_shadow}%, 0.7);
        margin-top: ${mt}px;
        left: ${left}vw;
        animation: float ${dur}s ease-in infinite;
        --sparkle-delay: ${sparkleDelay}s;
      `;
    }

    for (var i = num; i > 0; i--) {
      var balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.style.cssText = getRandomStyles();
      balloonContainer.append(balloon);
    }
  }

  // Timer function
  function pad(val) {
    return val > 9 ? val : '0' + val;
  }

  // Refresh page function
  function refreshPage() {
    window.location.reload();
  }
  
  // --- FIX 1: Add functions to open/close the diary ---
  const openDiary = () => setIsDiaryOpen(true);
  const closeDiary = () => setIsDiaryOpen(false);


  // --- Step 1: Initial animations ---
  useEffect(() => {
    // Load the audio files
    // audioRef.current = new Audio('/assets/birthday-music.mp3');
    audioRef.current = new Audio('/assets/dost.mp3');
    audioRef.current.loop = true;
    
    // Preload the confetti sound
    confettiSfxRef.current = new Audio('/assets/confetti-sfx.mp3');
    confettiSfxRef.current.preload = 'auto';

    // Animate in the elements
    animateCSS(nameRef, 'zoomIn', 0);
    animateCSS(twoRef, 'zoomIn', 0);

    // Create balloons
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      createBalloons(25);
    } else {
      createBalloons(50);
    }

    // Show confetti
    const confettiTimeout = setTimeout(() => {
      setShowConfetti(true);
    }, 2500); // Show after 2.5 seconds

    // Set timer to switch to intro step 2
    const switchTimeout = setTimeout(() => {
        if (oneRef.current) {
          // Animate out div.one
          animateCSS(oneRef, 'zoomOut', 0).then(() => {
            // After it's gone, show intro step 2
            setIntroStep(2);
          });
        }
    }, 5000); // Switch after 5 seconds

    return () => {
      clearTimeout(switchTimeout);
      clearTimeout(confettiTimeout);
    };
  }, []); // Runs only once on mount

  // --- Effect to run when introStep changes to 2 ---
  useEffect(() => {
    if (introStep === 2) {
      // Animate in div.three
      setTimeout(() => {
        animateCSS(threeRef, 'fadeIn', 0);
      }, 100);
    }
  }, [introStep]); // Runs when introStep changes

  // --- Effect to run when step changes to 2 (main wish) ---
  useEffect(() => {
    if (step === 2) {
      // Show confetti again!
      setShowConfetti(true);

      // Run animations
      animateCSS(wishHbdRef, 'fadeInUpBig', 0);
      animateCSS(wishTextRef, 'fadeIn', 0);
      animateCSS(heartRef, 'bounceInLeft', 0);
      animateCSS(refreshBtnRef, 'bounceIn', 0);
      animateCSS(heartIconRef, 'heartBeat', 0);

      // Start count-up timer
      const timer = setInterval(() => {
        setSec((prevSec) => prevSec + 1);
      }, 1000);

      const timerTimeout = setTimeout(() => {
        clearInterval(timer);
      }, 22000);

      return () => {
        clearInterval(timer);
        clearTimeout(timerTimeout);
      };
    }
  }, [step]); // This effect depends on 'step'

  // --- Function to handle the gift click ---
  const handleGiftClick = () => {
    // Play music
    audioRef.current.play().catch(e => console.error("Audio play failed:", e));

    // Play the confetti sound on click
    if (confettiSfxRef.current) {
      confettiSfxRef.current.currentTime = 0; // Rewind
      confettiSfxRef.current.play().catch(e => console.error("SFX play failed:", e));
    }

    setShowConfetti(false);

    // Animate out div.three
    animateCSS(threeRef, 'zoomOut', 0).then(() => {
      // After animation, go to the main step 2
      setStep(2);
    });
  };

  return (
    <div className="container">
      {/* These are permanent and exist in the background */}
      {showConfetti && <ConfettiExplosion />}
      <div id="balloon-container" /> 

      {/* --- STEP 1: Intro --- */}
      {step === 1 && (
        <>
          {introStep === 1 ? (
            // Show "Hey Ana"
            <div id="one" className="one" ref={oneRef}>
              <h1>
                Hey <span id="name" className="name" ref={nameRef}>{data.name}</span>
              </h1>
              <p className="two" id="greetingText" ref={twoRef}>
                It's your birthday!!! :Dear
              </p>
            </div>
          ) : (
            // Show "I wanted to..." + Gift
            <div className="three" ref={threeRef}>
              I wanted to do something special, so I made this for you :)
              <div className="gift-box" onClick={handleGiftClick}>
                <img
                  src="/assets/giftbox.png"
                  alt="gift box"
                  className="gift-img"
                />
                <p className="gift-text">Click on the Giftbox!</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* --- STEP 2: The Wish --- */}
      {step === 2 && (
        <div className="step2-wrapper">
          <div className="wish-card">
            <div className="wish">
              <div className="wish-columns">
                <div className="column-svg">
                  <img
                    src="/assets/01152 Happy Birthday.svg"
                    className="wish-hbd"
                    alt="happy birthday"
                    ref={wishHbdRef}
                  />
                </div>
                <div className="column-scroller">
                  <ImageScroller />
                </div>
              </div>
              <br />
              <br />
              <h5 className="wishText" ref={wishTextRef}>
                
                {/* --- FIX 2: Use data from .env file --- */}
                {/* The text you want (like the Hindi text) MUST be in your .env file */}
                <span id="wishText">
                  Dear Ruchita, <br />
                  कोई दिन खास नहीं चाहिए<br />
                  याद दिलाने के लिए कि तू कितनी special है ✨<br />
                  जहाँ जाती है, वहाँ मुस्कान छोड़ देती है 🌸<br />
                  बस यही दुआ — तेरी ज़िन्दगी<br />
                  हमेशा खुशियों से भरी रहे 🤍<br />
                  Happy Birthday, meri best dost 💫<br /> <br />
                  ~ Tera dost, Jainish 💌
                </span>
                
                <br />
                <span id="gradient-text">
                  Happy 19
                  <span id="seconds">{pad(sec % 60)}</span>
                  <sup>th</sup> Birthday
                </span>{' '}
                <span role="img" aria-label="smile">
                  😊
                </span>
              </h5>
            </div>

            <div className="buttons">
              {/* --- FIX 1: Add the Diary trigger button --- */}
              <a
                type="button"
                className="diary-trigger-btn"
                onClick={openDiary}
              >
                <span>Read My Note 💌</span>
              </a>
              <a
                type="button"
                href="https://www.linkedin.com/in/jainish-dabgar-87474a320"
                title="Follow your friend Jainish"
                target='_blank'
                rel="noopener noreferrer" 
              >
                <span className="heart" ref={heartRef}>
                  <span>Made with </span>
                  <img
                    className="heart-icon"
                    src="/assets/icons8-diamond-heart-48.png"
                    style={{ width: '18px', height: '15px' }}
                    alt="3"
                    title="Hey D, :)"
                    ref={heartIconRef}
                  />{' '}
                  by Your Friend, Jainish 🫂
                </span>
              </a>


              <a
                type="button"
                className="refresh-btn"
                onClick={refreshPage}
                ref={refreshBtnRef}
              >
                <img
                  src="/assets/icons8-refresh-30.png"
                  style={{ width: '23px', height: '23px' }}
                  alt="Refresh"
                  title="Refresh"
                />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --- FIX 1: Render Diary Modal Conditionally --- */}
      {isDiaryOpen && <DiaryPage onClose={closeDiary} />}
      
    </div>
  );
}

export default App;