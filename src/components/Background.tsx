export default function Background() {
  return (
    <>
      <div className="nebula fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="nebula-mid" />
      </div>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </>
  )
}
