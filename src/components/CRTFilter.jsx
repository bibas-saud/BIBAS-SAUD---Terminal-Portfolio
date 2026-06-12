function CRTFilter() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 crt-scanlines" />
      <div className="absolute inset-0 crt-vignette" />
      <div className="absolute inset-0 crt-flicker" />
    </div>
  )
}

export default CRTFilter
