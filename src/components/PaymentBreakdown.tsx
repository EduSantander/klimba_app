import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PaymentBreakdownProps {
  principal: number;
  totalAmount: number;
  months: number;
  monthlyPayment: number;
  interestRate: number;
}

const PaymentBreakdown = ({
  principal,
  totalAmount,
  months,
  monthlyPayment,
  interestRate,
}: PaymentBreakdownProps) => {
  const totalInterest = (monthlyPayment * months) - principal;
  const estimatedInterestPerMonth = totalInterest / months;
  const estimatedCapitalPerMonth = principal / months;

  return (
    <Card className="p-4 bg-trust/5 border-trust/20">
      <div className="flex items-start gap-2 mb-3">
        <Info className="h-4 w-4 text-trust mt-0.5 flex-shrink-0" />
        <p className="text-xs text-muted-foreground">
          El monto puede variar ligeramente por intereses o ajustes del plan de pago.
        </p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Capital por mes (estimado)</span>
          <span className="font-medium text-foreground">${formatCurrency(estimatedCapitalPerMonth)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Interés por mes (estimado)</span>
          <span className="font-medium text-trust">${formatCurrency(estimatedInterestPerMonth)}</span>
        </div>
        <div className="h-px bg-border my-2" />
        <div className="flex justify-between font-semibold">
          <span className="text-foreground">Total mensual</span>
          <span className="text-growth">${formatCurrency(monthlyPayment)}</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3 italic">
        * Este es un cálculo simulado para fines educativos. Los montos reales pueden variar según la entidad financiera.
      </p>
    </Card>
  );
};

export default PaymentBreakdown;
