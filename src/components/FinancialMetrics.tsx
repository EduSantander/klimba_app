import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { formatCurrency } from "@/lib/utils";

const FinancialMetrics = () => {
  const { debts, transactions } = useApp();

  const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0);
  const totalPaid = debts.reduce((sum, d) => sum + d.paid, 0);
  const totalPending = totalDebt - totalPaid;
  
  const activeDebts = debts.filter(d => d.paid < d.amount).length;
  const completedDebts = debts.filter(d => d.paid >= d.amount).length;
  
  const monthlyIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4 bg-gradient-to-br from-destructive/10 to-card border-destructive/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/20">
            <TrendingDown className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Deudas</p>
            <p className="text-lg font-bold text-foreground">${formatCurrency(totalDebt)}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-accent/10 to-card border-accent/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <AlertCircle className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Deudas Activas</p>
            <p className="text-lg font-bold text-foreground">{activeDebts}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-growth/10 to-card border-growth/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-growth/20">
            <CheckCircle2 className="h-5 w-5 text-growth" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Completadas</p>
            <p className="text-lg font-bold text-foreground">{completedDebts}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-trust/10 to-card border-trust/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-trust/20">
            <TrendingUp className="h-5 w-5 text-trust" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Ingresos/Mes</p>
            <p className="text-lg font-bold text-foreground">${formatCurrency(monthlyIncome)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FinancialMetrics;
