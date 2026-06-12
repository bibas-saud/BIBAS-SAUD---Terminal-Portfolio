import { AudioProvider } from './context/AudioContext'
import { TerminalProvider, useTerminalContext } from './context/TerminalContext'
import CRTFilter from './components/CRTFilter'
import BootScreen from './components/BootScreen'
import Terminal from './components/Terminal'
import StatusBar from './components/StatusBar'

function AppContent() {
  const { phase } = useTerminalContext()

  return (
    <div className="h-full w-full flex flex-col"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--fg-primary)' }}>
      <BootScreen />
      {phase === 'ready' && (
        <>
          <div className="flex-1 min-h-0">
            <Terminal />
          </div>
          <StatusBar />
        </>
      )}
      <CRTFilter />
    </div>
  )
}

function App() {
  return (
    <TerminalProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </TerminalProvider>
  )
}

export default App
