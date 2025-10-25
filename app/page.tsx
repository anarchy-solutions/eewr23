"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

const lines = [
  "Nico",
  "Lo siento",
  "He sido un completo idiota",
  "Yo quiero",
  "Hacer las cosas bien",
  "Hagamos nuestra vida juntos bien",
  "Yo te amo mucho",
  "No te dejare Nunca, mi amor",
  "Te amo",
  "No lo olvides, siempre me tendrás",
  "Y yo, siempre seré tuyo",
  "Mi Nico",
]

function Heart({
  initialX,
  initialY,
  dispersed,
  id,
}: { initialX: number; initialY: number; dispersed: boolean; id: number }) {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [opacity] = useState(Math.random() * 0.3 + 0.3)
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    if (dispersed) {
      setVelocity({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20 - 10,
      })
    }
  }, [dispersed])

  useEffect(() => {
    const animate = () => {
      const now = Date.now()
      const deltaTime = (now - lastTimeRef.current) / 16.67 // Normalize to 60 FPS
      lastTimeRef.current = now

      if (!dispersed) {
        setPosition((prev) => {
          const newY = prev.y + 2 * deltaTime
          if (newY > window.innerHeight + 50) {
            return {
              x: Math.random() * window.innerWidth,
              y: -50,
            }
          }
          return {
            x: prev.x + Math.sin(Date.now() / 1000 + id) * 0.5 * deltaTime,
            y: newY,
          }
        })
      } else {
        setPosition((prev) => ({
          x: prev.x + velocity.x * 0.1 * deltaTime,
          y: prev.y + velocity.y * 0.1 * deltaTime,
        }))
        setVelocity((prev) => ({
          x: prev.x * 0.98,
          y: prev.y * 0.98 + 0.5 * deltaTime,
        }))
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [dispersed, id, velocity])

  return (
    <div
      className="absolute text-2xl pointer-events-none will-change-transform"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: dispersed && Math.abs(velocity.x) < 0.1 && Math.abs(velocity.y) < 0.1 ? 0 : opacity,
        transition: "opacity 0.3s ease-out",
      }}
    >
      ❤️
    </div>
  )
}

function ClickHeart({ x, y, angle, id }: { x: number; y: number; angle: number; id: number }) {
  const [position, setPosition] = useState({ x, y })
  const [opacity, setOpacity] = useState(1)
  const speed = Math.random() * 5 + 5
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const animate = () => {
      const now = Date.now()
      const deltaTime = (now - lastTimeRef.current) / 16.67
      lastTimeRef.current = now

      setPosition((prev) => ({
        x: prev.x + Math.cos(angle) * speed * deltaTime * 0.5,
        y: prev.y + Math.sin(angle) * speed * deltaTime * 0.5 + 2 * deltaTime,
      }))
      setOpacity((prev) => Math.max(0, prev - 0.02 * deltaTime))

      if (opacity > 0) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [angle, speed, opacity])

  if (opacity <= 0) return null

  return (
    <div
      className="absolute text-xl pointer-events-none will-change-transform"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity,
      }}
    >
      ❤️
    </div>
  )
}

function SparkleText({ text }: { text: string }) {
  const words = text.split(" ")

  return (
    <>
      {words.map((word, index) => {
        const lowerWord = word.toLowerCase().replace(/[,.]/, "")
        const shouldSparkle = lowerWord === "nico" || lowerWord === "yo" || lowerWord === "mio" || lowerWord === "mi"
        const isNico = lowerWord === "nico"

        if (shouldSparkle) {
          return (
            <span key={index} className="relative inline-block mx-2">
              <span
                className={
                  isNico
                    ? "bg-gradient-to-r from-purple-500 via-green-400 to-purple-500 bg-clip-text text-transparent animate-[gradient_3s_ease-in-out_infinite] bg-[length:200%_auto]"
                    : ""
                }
              >
                {word}
              </span>
              <span
                className={`absolute -top-2 -left-2 w-1 h-1 rounded-full animate-[sparkle_1.5s_ease-in-out_infinite] ${isNico ? "bg-purple-400" : "bg-green-400"}`}
                style={{ animationDelay: "0s" }}
              />
              <span
                className={`absolute -top-2 -right-2 w-1 h-1 rounded-full animate-[sparkle_1.5s_ease-in-out_infinite] ${isNico ? "bg-green-400" : "bg-green-300"}`}
                style={{ animationDelay: "0.3s" }}
              />
              <span
                className={`absolute -bottom-2 -left-2 w-1 h-1 rounded-full animate-[sparkle_1.5s_ease-in-out_infinite] ${isNico ? "bg-green-500" : "bg-green-500"}`}
                style={{ animationDelay: "0.6s" }}
              />
              <span
                className={`absolute -bottom-2 -right-2 w-1 h-1 rounded-full animate-[sparkle_1.5s_ease-in-out_infinite] ${isNico ? "bg-purple-500" : "bg-green-400"}`}
                style={{ animationDelay: "0.9s" }}
              />
              <span
                className={`absolute top-1/2 -left-3 w-0.5 h-0.5 rounded-full animate-[sparkle_1.5s_ease-in-out_infinite] ${isNico ? "bg-purple-300" : "bg-green-300"}`}
                style={{ animationDelay: "0.4s" }}
              />
              <span
                className={`absolute top-1/2 -right-3 w-0.5 h-0.5 rounded-full animate-[sparkle_1.5s_ease-in-out_infinite] ${isNico ? "bg-green-300" : "bg-green-500"}`}
                style={{ animationDelay: "0.7s" }}
              />
            </span>
          )
        }

        return <span key={index}>{word} </span>
      })}
    </>
  )
}

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false)
  const [completedLines, setCompletedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [dispersed, setDispersed] = useState(false)
  const [clickHearts, setClickHearts] = useState<Array<{ id: number; x: number; y: number; angle: number }>>([])
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const clickHeartIdRef = useRef(0)

  useEffect(() => {
    const heartCount = 30
    const newHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * -window.innerHeight * 2,
    }))
    setHearts(newHearts)
  }, [])

  useEffect(() => {
    if (!hasStarted || currentLineIndex >= lines.length) return

    const currentLine = lines[currentLineIndex]

    if (displayedText.length < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentLine.slice(0, displayedText.length + 1))
      }, 80)
      return () => clearTimeout(timeout)
    } else if (displayedText.length === currentLine.length) {
      const timeout = setTimeout(() => {
        setCompletedLines([...completedLines, displayedText])
        setDisplayedText("")
        setCurrentLineIndex(currentLineIndex + 1)
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [displayedText, currentLineIndex, hasStarted, completedLines])

  const handleStart = () => {
    setHasStarted(true)
    setDispersed(true)

    if (audioRef.current) {
      audioRef.current.volume = 0.2
      audioRef.current.playbackRate = 0.85

      // Try to play, but catch any errors gracefully
      audioRef.current.play().catch((error) => {
        console.log("Audio playback failed:", error)
      })

      try {
        const audioContext = new AudioContext()
        audioContextRef.current = audioContext

        const source = audioContext.createMediaElementSource(audioRef.current)
        const gainNode = audioContext.createGain()
        const lowpassFilter = audioContext.createBiquadFilter()
        const convolver = audioContext.createConvolver()

        const sampleRate = audioContext.sampleRate
        const length = sampleRate * 3
        const impulse = audioContext.createBuffer(2, length, sampleRate)
        for (let channel = 0; channel < 2; channel++) {
          const channelData = impulse.getChannelData(channel)
          for (let i = 0; i < length; i++) {
            channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2)
          }
        }
        convolver.buffer = impulse

        lowpassFilter.type = "lowpass"
        lowpassFilter.frequency.value = 1500
        gainNode.gain.value = 0.3

        source.connect(lowpassFilter)
        lowpassFilter.connect(convolver)
        convolver.connect(gainNode)
        gainNode.connect(audioContext.destination)
      } catch (error) {
        console.log("Audio context setup failed:", error)
      }
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!hasStarted) return

    const heartCount = 12
    const newClickHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: clickHeartIdRef.current++,
      x: e.clientX,
      y: e.clientY,
      angle: (Math.PI * 2 * i) / heartCount,
    }))

    setClickHearts((prev) => [...prev, ...newClickHearts])

    setTimeout(() => {
      setClickHearts((prev) => prev.filter((h) => !newClickHearts.find((nh) => nh.id === h.id)))
    }, 3000)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black p-4" onClick={handleClick}>
      <div className="fixed inset-0 pointer-events-none z-0">
        {hearts.map((heart) => (
          <Heart key={heart.id} initialX={heart.x} initialY={heart.y} dispersed={dispersed} id={heart.id} />
        ))}
        {clickHearts.map((heart) => (
          <ClickHeart key={heart.id} x={heart.x} y={heart.y} angle={heart.angle} id={heart.id} />
        ))}
      </div>

      <div className="max-w-2xl w-full text-center space-y-3 py-8 relative z-10">
        {completedLines.map((line, index) => (
          <p key={index} className="text-sm md:text-base text-white leading-relaxed">
            <SparkleText text={line} />
          </p>
        ))}

        {hasStarted && currentLineIndex < lines.length && (
          <p className="text-sm md:text-base text-white leading-relaxed">
            <SparkleText text={displayedText} />
            <span className="inline-block w-0.5 h-4 bg-white ml-1 animate-pulse" />
          </p>
        )}
      </div>

      {!hasStarted && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center cursor-pointer z-20"
          onClick={handleStart}
        >
          <p className="text-white text-sm md:text-base animate-pulse">haz click donde sea...</p>
        </div>
      )}

      <audio ref={audioRef} src="/er.mp3" loop className="hidden" crossOrigin="anonymous" />
    </div>
  )
}
