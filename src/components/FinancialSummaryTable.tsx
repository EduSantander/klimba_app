import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApp } from "@/contexts/AppContext";
import { formatCurrency } from "@/lib/utils";

const FinancialSummaryTable = () => {
  const { debts, transactions } = useApp();

  const monthlyIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPending = debts.reduce((sum, d) => sum + (d.amount - d.paid), 0);

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b bg-muted/30">
        <h3 className="font-semibold text-foreground">Resumen Financiero Rápido</h3>
        <p className="text-xs text-muted-foreground mt-1">Vista general de tu situación actual</p>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Concepto</TableHead>
            <TableHead>Detalle</TableHead>
            <TableHead className="text-right">Monto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-destructive">¿Cuánto debo?</TableCell>
            <TableCell className="text-muted-foreground">Saldo pendiente total</TableCell>
            <TableCell className="text-right font-bold text-destructive">
              ${formatCurrency(totalPending)}
            </TableCell>
          </TableRow>
          
          {debts.filter(d => d.paid < d.amount).slice(0, 3).map((debt) => (
            <TableRow key={debt.id}>
              <TableCell className="font-medium">¿A quién debo?</TableCell>
              <TableCell className="text-muted-foreground">{debt.name}</TableCell>
              <TableCell className="text-right font-medium">
                ${formatCurrency(debt.amount - debt.paid)}
              </TableCell>
            </TableRow>
          ))}
          
          <TableRow className="bg-growth/5">
            <TableCell className="font-medium text-growth">Ingresos del mes</TableCell>
            <TableCell className="text-muted-foreground">Total registrado</TableCell>
            <TableCell className="text-right font-bold text-growth">
              ${formatCurrency(monthlyIncome)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default FinancialSummaryTable;
