import React from "react";
import Card from "./Card";

function ComplaintStatCard({ title, value, icon: Icon, colorClass, bgClass }) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bgClass} ${colorClass}`}>
        {Icon && <Icon size={24} />}
      </div>
      <div>
        <p className="text-sm font-medium text-muted">{title}</p>
        <h3 className="mt-1 text-2xl font-bold text-foreground">{value}</h3>
      </div>
    </Card>
  );
}

export default ComplaintStatCard;
