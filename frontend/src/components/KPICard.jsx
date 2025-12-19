function KPICard({ icon, label, value, trend, trendLabel }) {
  return (
    <div className="kpi-card">
      <div className="kpi-card-icon">{icon}</div>
      <div className="kpi-card-label">{label}</div>
      <div className="kpi-card-value">{value}</div>
      {trend && trendLabel && (
        <div className={`kpi-card-trend ${trend}`}>
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  )
}

export default KPICard


