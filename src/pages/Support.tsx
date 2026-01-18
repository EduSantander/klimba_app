import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { ChevronLeft, MessageCircle, Send, Mail, HelpCircle, Shield, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/contexts/AppContext";

const Support = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useApp();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Mensaje Enviado",
      description: "Nuestro equipo te responderá pronto",
    });
    
    setFormData({ name: user?.name || "", email: user?.email || "", message: "" });
  };

  const faqs = [
    {
      question: "¿Cómo funciona el Jardín Financiero?",
      answer: "El jardín crece cuando pagas tus deudas. Cada vez que liquidas completamente una deuda, tu progreso histórico aumenta +1. Al completar 5 deudas, desbloqueas una planta florecida y una insignia. ¡Tu progreso es permanente!",
    },
    {
      question: "¿Cómo funcionan las montañas de deuda?",
      answer: "Cada montaña representa una deuda. Su altura refleja el saldo pendiente: mientras más pagas, más baja la montaña. Cuando conquistas (pagas) completamente una deuda, la montaña se marca como conquistada con nieve en la cima.",
    },
    {
      question: "¿Cómo se ganan las insignias?",
      answer: "Hay dos tipos de insignias: (1) Insignias del Jardín: se ganan al completar 5 deudas pagadas (una planta florecida = una insignia). (2) Insignias de Actividad: se ganan completando retos semanales y manteniendo rachas de actividad.",
    },
    {
      question: "¿Necesito conectar mi cuenta bancaria?",
      answer: "No, Klimba NO requiere acceso a tu cuenta bancaria. Registras manualmente tus deudas, pagos e ingresos para mantener tu privacidad y seguridad. La conexión bancaria es una función futura en desarrollo.",
    },
    {
      question: "¿Qué son los retos semanales?",
      answer: "Son objetivos que cambian cada semana, como ahorrar cierta cantidad o completar micro-lecciones. Al completarlos, ganas insignias especiales y fortaleces tus hábitos financieros.",
    },
    {
      question: "¿Por qué varían los montos de pago?",
      answer: "El monto mensual puede variar ligeramente debido a: (1) Intereses calculados según la tasa anual, (2) Redondeo para evitar centavos, (3) Ajustes del plan de pago. Siempre mostramos un desglose explicativo con capital e interés estimado.",
    },
    {
      question: "¿Qué incluye la versión Premium?",
      answer: "Premium incluye: asistente virtual personalizado, deudas ilimitadas, análisis avanzado, y acceso anticipado a nuevas funciones. Nota: Esta es una demo académica, no hay pagos reales.",
    },
    {
      question: "¿Mis datos están seguros?",
      answer: "Sí. No solicitamos datos bancarios reales. Toda la información se almacena localmente en tu navegador. Este es un prototipo educativo para aprender sobre manejo de deudas.",
    },
  ];

  const tips = [
    "Pagar a tiempo ayuda a que tu jardín crezca más rápido 🌱",
    "Prioriza las deudas con mayor tasa de interés para ahorrar dinero",
    "Mantén una racha de actividad para ganar insignias especiales",
    "Revisa el simulador de mora antes de atrasarte en un pago",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Volver al Panel
        </Button>

        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-bold text-foreground">Soporte y Ayuda</h1>
        </div>
        <p className="text-muted-foreground mb-8">Todo lo que necesitas saber sobre Klimba</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: FAQ Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 animate-fade-in">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-accent" />
                Preguntas Frecuentes
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-growth">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            {/* Tips Card */}
            <Card className="p-6 bg-gradient-to-r from-growth/10 to-trust/10 animate-scale-in">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-6 w-6 text-growth flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Tips Rápidos</h3>
                  <ul className="space-y-2">
                    {tips.map((tip, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-growth">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Contact Form */}
          <div className="space-y-6">
            <Card className="p-6 animate-scale-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-accent/20">
                  <MessageCircle className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Contáctanos</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    placeholder="¿En qué podemos ayudarte?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensaje
                </Button>
              </form>
            </Card>

            {/* Email Info */}
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-growth" />
                <div>
                  <p className="text-sm font-medium text-foreground">Correo de Soporte</p>
                  <p className="text-sm text-growth">soporte@klimba.com</p>
                </div>
              </div>
            </Card>

            {/* Privacy Notice */}
            <Card className="p-4 bg-growth/5 border-growth/20">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-growth flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Tu Privacidad</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    No solicitamos datos bancarios. Este es un prototipo educativo.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
