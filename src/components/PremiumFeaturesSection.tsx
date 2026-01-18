import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Bell, Landmark, Gift, Calendar, Smartphone, Check, X } from "lucide-react";
import PremiumBadge from "./PremiumBadge";

const PremiumFeaturesSection = () => {
  const freeFeatures = [
    "Registro de hasta 5 deudas",
    "Jardín financiero básico",
    "Calculadora de pagos",
    "Insignias de actividad",
  ];

  const premiumFeatures = [
    { name: "Deudas ilimitadas", available: true },
    { name: "Asistente virtual personalizado", available: true },
    { name: "Recordatorios por SMS/calendario", available: false, label: "Próximamente" },
    { name: "Conexión bancaria", available: false, label: "Próximamente" },
    { name: "Análisis avanzado de deudas", available: true },
    { name: "Beneficios exclusivos", available: false, label: "Próximamente" },
  ];

  const simulatedFeatures = [
    {
      icon: Landmark,
      title: "Conectar banco",
      description: "Sincroniza tus cuentas automáticamente",
      label: "Próximamente",
    },
    {
      icon: Bell,
      title: "Recordatorios SMS",
      description: "Notificaciones antes de cada vencimiento",
      label: "Premium",
    },
    {
      icon: Calendar,
      title: "Sincronizar calendario",
      description: "Exporta pagos a Google/Apple Calendar",
      label: "Premium",
    },
    {
      icon: Gift,
      title: "Beneficios exclusivos",
      description: "Descuentos con aliados financieros",
      label: "Próximamente",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Comparison Table */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Crown className="h-5 w-5 text-accent" />
          Gratis vs Premium
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="p-4 bg-muted/30 rounded-lg border">
            <h4 className="font-semibold text-foreground mb-4">Versión Gratis</h4>
            <ul className="space-y-2">
              {freeFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-growth" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Premium */}
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              Versión Premium
              <PremiumBadge />
            </h4>
            <ul className="space-y-2">
              {premiumFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  {feature.available ? (
                    <Check className="h-4 w-4 text-growth" />
                  ) : (
                    <span className="h-4 w-4 flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                    </span>
                  )}
                  <span className="text-muted-foreground">{feature.name}</span>
                  {feature.label && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {feature.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Crown className="h-4 w-4 mr-2" />
            Ver versión Premium (demo)
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            * Esta es una demo académica. No hay pagos ni suscripciones reales.
          </p>
        </div>
      </Card>

      {/* Simulated Features */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Funciones en Desarrollo</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {simulatedFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card key={i} className="p-4 relative overflow-hidden opacity-75">
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    feature.label === "Premium" 
                      ? "bg-accent/20 text-accent" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {feature.label}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        <p className="text-xs text-center text-muted-foreground mt-4 italic">
          Estas funciones son conceptuales y no están implementadas en este prototipo académico.
        </p>
      </div>
    </div>
  );
};

export default PremiumFeaturesSection;
