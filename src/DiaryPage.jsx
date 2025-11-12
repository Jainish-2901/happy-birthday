import React, { useEffect } from 'react';
import './DiaryPage.css';

const DiaryPage = ({ onClose }) => { // It must accept 'onClose' as a prop
  
  // This effect adds the 'Escape' key to close the modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    // The modal overlay (the dark background)
    <div className="diary-modal-overlay" onClick={onClose}>
      
      {/* The diary page itself. Clicking this won't close it. */}
      <div className="diary-page-container" onClick={(e) => e.stopPropagation()}>
        
        {/* The exit button */}
        <button className="diary-exit-btn" onClick={onClose} title="Close">
          &times;
        </button>

        {/* Your content goes inside this scrolling container */}
        <div className="diary-content">
          <div className="box">
            कभी-कभी कुछ रिश्ते <span className="emoji">💭</span><br/>
            नाम से नहीं, एहसास से जुड़ते हैं<br/>
            और हमारी ये दोस्ती…<br/>
            उनमें से एक है <span className="emoji">✨</span><br/>
            जो बिना बोले भी बहुत कुछ कह जाती है <span className="emoji">🤍</span>
          </div>
          <div className="box">
            तू जब मुस्कुराती है ना <span className="emoji">😊</span><br/>
            तो लगता है जैसे दिन थोड़ा बेहतर हो गया <span className="emoji">🌸</span><br/>
            पर जब तू चुप होती है,<br/>
            तो समझ आता है —<br/>
            अंदर बहुत कुछ छिपा है…<br/>
            पर फिर भी तू मज़बूत है <span className="emoji">💫</span>
          </div>
          <div className="box">
            कभी सब उलझा लगे,<br/>
            तो याद रखना —<br/>
            हर चीज़ वक़्त लेती है <span className="emoji">🌿</span><br/>
            तू बस खुद पे भरोसा रख,<br/>
            क्योंकि तेरे अंदर वो ताक़त है<br/>
            जो किसी भी मुश्किल को हरा सकती है <span className="emoji">💪</span>
          </div>
          <div className="box">
            मैं ज़्यादा बोल नहीं पाता,<br/>
            पर जब तू उदास होती है,<br/>
            दिल से फिक्र होती है <span className="emoji">🕊️</span><br/>
            कभी लगे कोई नहीं समझ रहा —<br/>
            तो जान ले, मैं सुनने के लिए हूँ,<br/>
            बिना किसी judgement के <span className="emoji">🤝</span>
          </div>
          <div className="box">
            तेरे जैसी दोस्त मिलना किस्मत की बात होती है <span className="emoji">🍀</span><br/>
            कभी खुद को कम मत समझना…<br/>
            तेरे अंदर अब भी वो चमक है <span className="emoji">✨</span><br/>
            जो सबका दिन बदल सकती है <span className="emoji">☀️</span><br/>
            <div className="signature">
              ~ Tera dost, Jainish <span className="emoji">💌</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;