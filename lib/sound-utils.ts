export function playSound(soundName: string): void {
  // Only run on client side
  if (typeof window === "undefined") return

  // Use a flag to prevent multiple instances
  const soundKey = `playing_${soundName}`
  if (window[soundKey as any]) return

  try {
    window[soundKey as any] = true

    // Create audio context to check if audio is supported
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContext) {
      console.log("Audio context not supported")
      window[soundKey as any] = false
      return
    }

    const audio = new Audio(`/sounds/${soundName}.mp3`)

    // Add event listeners to handle errors
    audio.addEventListener("error", (e) => {
      console.log(`Error loading sound: ${soundName}`, e)
      window[soundKey as any] = false
    })

    // Only play if the audio is successfully loaded
    audio.addEventListener("canplaythrough", () => {
      const playPromise = audio.play()

      // Handle the play promise to avoid uncaught promise rejections
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully
          })
          .catch((error) => {
            console.log("Playback prevented by browser", error)
          })
          .finally(() => {
            // Reset the flag when audio ends or fails
            setTimeout(() => {
              window[soundKey as any] = false
            }, 1000)
          })
      }
    })

    // Set a timeout to abort if loading takes too long
    setTimeout(() => {
      if (audio.readyState < 3) {
        audio.src = ""
        window[soundKey as any] = false
      }
    }, 2000)
  } catch (error) {
    console.log("Failed to play sound:", error)
    window[soundKey as any] = false
  }
}
