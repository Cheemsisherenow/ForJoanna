import { useState, useRef } from 'react'
import clsx from "clsx";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Snowfall from 'react-snowfall';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

function App() {
  const [open, setOpen] = useState(false)
  let dir = 15;
  const [showSnow, setShowSnow] = useState(false);
  const mailref1 = useRef(null);
  const mailref2 = useRef(null);
  const hachiRef = useRef(null);
  const title = useRef(null);
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const text = new SplitText("#myText", { type: "chars" });


  useGSAP(() => {
    // Set initial positions with GSAP (centers everything)
    gsap.set([mailref1.current, mailref2.current, hachiRef.current, title.current], {
      xPercent: -50,
      left: '50%'
    });
    gsap.set([textRef.current,textRef2.current, textRef3.current], { opacity: 0 });

    if (!open) return;

    const tl = gsap.timeline();

    // Animate mail down
    tl.to(
      hachiRef.current,
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=1.4"
    ).to([mailref1.current, mailref2.current, title.current], {
      y: 700,
      duration: 2,
      delay: 1,
      ease: "power2.out",
    }).to(
      hachiRef.current,
      {
        x: -550,
        delay: .5,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {setShowSnow(true)
          gsap.timeline({ repeat: -1 }) 
  .to(hachiRef.current, { rotation: -15, duration: 1.5, ease: "power1.inOut" })
  .to(hachiRef.current, { rotation: 0, duration: 1.5, ease: "power1.inOut" })   
  .to(hachiRef.current, { rotation: 15, duration: 1.5, ease: "power1.inOut" })  
  .to(hachiRef.current, { rotation: 0, duration: 1.5, ease: "power1.inOut" });
          const split = new SplitText(textRef.current, { type: "chars" });
          gsap.set(textRef.current, { opacity: 1 })
          gsap.from(split.chars, {
            duration: 0.05,
            opacity: 0,
            stagger: 0.05,
            ease: "none",
            onComplete: () => {
              gsap.delayedCall(1, ()=>{
                const splits = new SplitText(textRef2.current, { type: "words,chars" });
                split.words.forEach(word => {
                  gsap.set(word, { display: "inline-block", whiteSpace: "nowrap" });
                });
                gsap.set(textRef2.current, { opacity: 1 })
                gsap.from(splits.chars, {
                  duration: 0.1,
                  opacity: 0,
                  stagger: 0.08,
                  ease: "none",
                  onComplete: () => {
                    gsap.delayedCall(1, ()=>{
                      const splits = new SplitText(textRef3.current, { type: "chars" });
                      gsap.set(textRef3.current, { opacity: 1 })
                      gsap.from(splits.chars, {
                        duration: 0.1,
                        opacity: 0,
                        stagger: 0.08,
                        ease: "none",})
                          })
      
                  }})
                    })

            }
          });
        },
      },
      "-=1.4"
    );
  }, { dependencies: [open] });

  return (
    <div className="relative bg-[#ffa8d6] w-screen h-screen overflow-hidden">
      {showSnow && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <Snowfall 
            snowflakeCount={200}
            radius={[4, 4]}  
            speed={[0.5, 3.0]}
            wind={[-0.5, 2.0]}
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
            }}
          />
        </div>
      )}
      <button 
        ref={mailref1} 
        onClick={() => setOpen(true)} 
        className={clsx(
          "absolute z-5 bottom-[25%] overflow-hidden h-[60%] w-[35%] bg-no-repeat bg-center bg-[length:100%_100%]",
          open ? "bg-[url('/mailopen.png')]" : "bg-[url('/mailclose.png')]"
        )}
      >
      </button>
      
      <img 
        ref={mailref2} 
        src="/mailopen2.png" 
        className={clsx(
          "pixelated absolute bottom-[25%] h-[60%] w-[35%] pointer-events-none transition-opacity duration-300",
          open ? "z-15" : "z-0"
        )}
      />
      <p ref={title} className="absolute text-4xl bottom-[18%] text-[#c91e31] font-bold "> CLICK ME CLICK ME!!</p>

      <img 
        ref={hachiRef} 
        src="/hachiware.gif" 
        className="z-10 pixelated absolute bottom-[25%] w-1/5 pointer-events-none opacity-0"
      />
      <h2 ref={textRef} className="absolute top-10 left-[35%] text-4xl font-bold text-[#c91e31] z-20">
        HI JOANNA!!!
      </h2>
      <p ref={textRef2} style={{
    wordBreak: "normal",
    overflowWrap: "normal",
  }} className="absolute break-normal whitespace-normal pointer-events-none text-[#c91e31] top-25 left-[35%] max-w-[50%] text-xl font-bold  z-20">
        I'm sorry I got this message to you pretty late and I know its valentines 💔 BUT I just wanted to let you know that I LOVE YOU!!! AND I hope you had a great valentines day and I am sorry for not being able to spend any time with you both online and in real life BUT I REALLY DO LOVE YOU! ALSO I just wanted to say that I really appreciate having you as a part of my life and you're always helping me out both in school works and emotionally! Another thing is I really never felt any sparks with anyone UNTIL I MET YOU! I DONT KNOW its just you're very charming and lighthearted and everyday just being able to talk to you makes my day and everytime I see and hear you I'm always so flustered and nervous because your just so adorable and sweet AND like I said I really didn't know if i would be able to like a girl again after everything that happened before but you really brightened up my life and I love it! Sorry if this is a ton of yap and again I'm sorry for delivering this so late but I hope one day we could go out together, maybe hangout, watch a movie, cuddles, etc!! BUT YEAH THANK YOU JOANNA I LOVE YOU BABY AND I hope you have a great rest of your valentines day :p
      </p>
      <h2 ref={textRef3} className="absolute bottom-30 left-[35%] text-4xl font-bold text-[#c91e31] z-20">
        You mean the world to me, <br/>
        Zihong
      </h2>
    </div>
  )
}

export default App