"use client"

import { useRef, useState } from "react"

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.playbackRate = 1.5
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden mb-2" style={{ background: "#000" }} onClick={toggle}>
      <video ref={videoRef} src={src} playsInline muted style={{ display: "block", width: "100%", height: "auto" }} />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.95)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          }}>
            <svg viewBox="0 0 24 24" style={{ width: 32, height: 32, marginLeft: 4 }} fill="#000">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}