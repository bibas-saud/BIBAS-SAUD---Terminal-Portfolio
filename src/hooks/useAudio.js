import { useAudioContext } from '../context/AudioContext'

export function useAudio() {
  const {
    initAudio,
    playKeyClick,
    playBackspace,
    playEnter,
    playError,
    playBootChime,
  } = useAudioContext()

  return {
    initAudio,
    playKeyClick,
    playBackspace,
    playEnter,
    playError,
    playBootChime,
  }
}
