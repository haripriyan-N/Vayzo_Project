import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import Card from "./Card";

function StatCard({
  title,
  value,
  trend,
  icon: Icon,
  colorClass = "text-primary",
  bgClass = "bg-primary-light",
  className = "",
}) {
  const isPositive = trend && trend.includes("+");
  const isNegative = trend && trend.includes("-");

  return (
    <Card className={`flex flex-col justify-between relative overflow-hidden ${className}`}>
      {/* Decorative SVG wave for visual polish */}
      <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor" className={colorClass}>
           <path d="M0,50 C20,30 40,70 60,40 C80,10 100,50 100,50 L100,100 L0,100 Z" />
        </svg>
      </div>

      <div className="flex flex-col z-10">
        <p className="text-sm font-medium text-muted">{title}</p>
        <h3 className="mt-2 text-2xl font-bold text-foreground">{value}</h3>
      </div>

      <div className="mt-4 flex items-center justify-between z-10">
        {trend ? (
          <span
            className={`flex items-center text-xs font-medium ${
              isNegative ? "text-danger" : "text-success"
            }`}
          >
            {isNegative ? (
              <TrendingDown size={14} className="mr-1" />
            ) : (
              <TrendingUp size={14} className="mr-1" />
            )}
            {trend}
          </span>
        ) : (
          <div></div>
        )}
        <div className={`rounded-full p-2 ${bgClass} ${colorClass}`}>
          {Icon && <Icon size={20} />}
        </div>
      </div>
    </Card>
  );
}

export default StatCard;
