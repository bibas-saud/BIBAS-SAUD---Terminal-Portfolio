import { useEffect, useCallback } from 'react'
import { useTerminalContext } from '../context/TerminalContext'
import { useAudio } from './useAudio'
import { useSuggestions } from './useSuggestions'

export function useKeyboard(inputRef) {
  const {
    input, setInput,
    executeCommand, navigateHistory,
    setSuggestions, setSelectedSuggestionIndex,
    suggestions, selectedSuggestionIndex,
    clearOutput,
    menuItems,
    closeMenu,
    menuNext, menuPrev, confirmMenu,
  } = useTerminalContext()

  const { initAudio, playKeyClick, playBackspace, playEnter, playError } = useAudio()
  const { getSuggestions } = useSuggestions()

  const updateSuggestions = useCallback((value) => {
    if (!value) {
      setSuggestions([])
      return
    }
    const filtered = getSuggestions(value)
    setSuggestions(filtered)
    setSelectedSuggestionIndex(filtered.length > 0 ? 0 : -1)
  }, [getSuggestions, setSuggestions, setSelectedSuggestionIndex])

  const handleKeyDown = useCallback((e) => {
    const key = e.key

    if (menuItems.length > 0) {
      if (key === 'ArrowUp') {
        e.preventDefault()
        menuPrev()
        return
      }
      if (key === 'ArrowDown') {
        e.preventDefault()
        menuNext()
        return
      }
      if (key === 'Enter') {
        e.preventDefault()
        playEnter()
        confirmMenu()
        return
      }
      if (key === 'Escape') {
        e.preventDefault()
        closeMenu()
        return
      }
      return
    }

    if (key === 'Tab') {
      e.preventDefault()
      if (suggestions.length > 0) {
        const best = suggestions[selectedSuggestionIndex >= 0 ? selectedSuggestionIndex : 0]
        setInput(best)
        updateSuggestions(best)
      }
      return
    }

    if (key === 'Enter') {
      e.preventDefault()
      playEnter()
      if (suggestions.length > 0 && selectedSuggestionIndex >= 0) {
        const best = suggestions[selectedSuggestionIndex]
        setInput(best)
        executeCommand(best)
      } else {
        executeCommand()
      }
      setSuggestions([])
      return
    }

    if (key === 'ArrowUp' || key === 'ArrowDown') {
      e.preventDefault()
      if (suggestions.length > 0) {
        setSelectedSuggestionIndex(prev => {
          if (key === 'ArrowUp') {
            return prev <= 0 ? suggestions.length - 1 : prev - 1
          } else {
            return prev >= suggestions.length - 1 ? 0 : prev + 1
          }
        })
      } else {
        navigateHistory(key === 'ArrowUp' ? 'up' : 'down')
      }
      return
    }

    if (key === 'Escape') {
      setSuggestions([])
      return
    }

    if (key === 'l' && e.ctrlKey) {
      e.preventDefault()
      clearOutput()
      return
    }
  }, [
    suggestions, selectedSuggestionIndex,
    setInput, setSuggestions, setSelectedSuggestionIndex,
    executeCommand, navigateHistory, clearOutput,
    updateSuggestions, playEnter,
    menuItems.length, menuNext, menuPrev, confirmMenu, closeMenu,
  ])

  const handleChange = useCallback((e) => {
    if (menuItems.length > 0) return
    const value = e.target.value
    setInput(value)
    updateSuggestions(value)
    if (value.length > 0) {
      initAudio()
      playKeyClick()
    }
  }, [setInput, updateSuggestions, initAudio, playKeyClick, menuItems.length])

  const handleBackspaceKeyUp = useCallback((e) => {
    if (menuItems.length > 0) return
    if (e.key === 'Backspace') {
      initAudio()
      playBackspace()
    }
  }, [initAudio, playBackspace, menuItems.length])

  return { handleKeyDown, handleChange, handleBackspaceKeyUp }
}
