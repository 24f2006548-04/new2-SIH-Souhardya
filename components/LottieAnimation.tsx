'use client'

import * as React from 'react'
import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'
import Lottie from 'lottie-react'

// Simple farming animation data (you can replace this with actual Lottie JSON)
const farmingAnimationData = {
  "v": "5.7.4",
  "fr": 30,
  "ip": 0,
  "op": 90,
  "w": 400,
  "h": 400,
  "nm": "Farming Animation",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Plant",
      "sr": 1,
      "ks": {
        "o": {"a": 0, "k": 100},
        "r": {"a": 0, "k": 0},
        "p": {"a": 0, "k": [200, 300, 0]},
        "a": {"a": 0, "k": [0, 0, 0]},
        "s": {
          "a": 1,
          "k": [
            {"i": {"x": [0.667, 0.667, 0.667], "y": [1, 1, 1]}, "o": {"x": [0.333, 0.333, 0.333], "y": [0, 0, 0]}, "t": 0, "s": [0, 0, 100]},
            {"i": {"x": [0.667, 0.667, 0.667], "y": [1, 1, 1]}, "o": {"x": [0.333, 0.333, 0.333], "y": [0, 0, 0]}, "t": 30, "s": [100, 100, 100]},
            {"i": {"x": [0.667, 0.667, 0.667], "y": [1, 1, 1]}, "o": {"x": [0.333, 0.333, 0.333], "y": [0, 0, 0]}, "t": 60, "s": [0, 0, 100]}
          ]
        }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": {"a": 0, "k": [20, 20]},
              "p": {"a": 0, "k": [0, 0]},
              "nm": "Ellipse Path 1"
            },
            {
              "ty": "fl",
              "c": {"a": 0, "k": [0.2, 0.8, 0.2, 1]},
              "o": {"a": 0, "k": 100},
              "r": 1,
              "bm": 0,
              "nm": "Fill 1"
            }
          ],
          "nm": "Plant"
        }
      ],
      "ip": 0,
      "op": 90,
      "st": 0,
      "bm": 0
    }
  ],
  "markers": []
}

export default function LottieAnimation() {
  const lottieRef = useRef<any>(null) as MutableRefObject<any>

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.play()
    }
  }, [])

  return (
    <div className="w-full max-w-md mx-auto">
      <Lottie
        lottieRef={lottieRef}
        animationData={farmingAnimationData}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: 'auto' }}
        aria-label="Farming animation showing plant growth"
      />
    </div>
  )
}
