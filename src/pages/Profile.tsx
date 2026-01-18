import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { ChevronLeft, User, Mail, Camera, LogOut, Calendar, Save, X, Crown, Check, Landmark, Bell, Gift, Smartphone, MessageCircle, Bot, Send } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import PremiumBadge from "@/components/PremiumBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock responses for the virtual assistant
const MOCK_RESPONSES = [
  "Hola 👋 Soy tu asistente virtual de Klimba. Puedo ayudarte a entender tus deudas.",
  "Esta función está disponible en la versión Premium. ¡Actualiza para obtener ayuda personalizada!",
  "Pagar a tiempo ayuda a que tu jardín crezca 🌱 ¡Sigue así!",
  "Un tip: Prioriza las deudas con mayor tasa de interés para ahorrar dinero.",
  "¿Sabías que cada 5 deudas pagadas desbloqueas una nueva planta? 🌸",
  "Para acceder a consejos personalizados, necesitas la versión Premium.",
];

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, setUser } = useApp();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });
  
  // Store original values to detect changes and restore on cancel
  const [originalData, setOriginalData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });

  // Premium demo state
  const [showPremiumDemo, setShowPremiumDemo] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "¡Hola! 👋 Soy el Asistente Virtual Premium de Klimba. Esta es una demo - la versión completa está disponible en Premium.",
      isBot: true,
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      const userData = {
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
      };
      setFormData(userData);
      setOriginalData(userData);
    }
  }, [user]);

  // Check if there are changes
  const hasChanges = 
    formData.name !== originalData.name || 
    formData.avatar !== originalData.avatar;

  // Validate name is not empty
  const isNameValid = formData.name.trim().length > 0;

  const handleStartEditing = () => {
    setOriginalData({
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
    });
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isNameValid) {
      toast({
        title: "Error",
        description: "El nombre no puede estar vacío",
        variant: "destructive",
      });
      return;
    }
    
    setUser({
      name: formData.name.trim(),
      email: user?.email || "", // Email stays unchanged (tied to auth)
      avatar: formData.avatar,
      registeredAt: user?.registeredAt,
    });

    // Update original data to new values
    setOriginalData({
      name: formData.name.trim(),
      email: user?.email || "",
      avatar: formData.avatar,
    });

    toast({
      title: "Perfil Actualizado",
      description: "Tus cambios han sido guardados exitosamente",
    });
    
    setIsEditing(false);
  };

  const handleLogout = () => {
    setUser(null);
    toast({
      title: "Sesión Cerrada",
      description: "Has cerrado sesión exitosamente",
    });
    navigate("/");
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No disponible";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: chatInput,
      isBot: false,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isBot: true,
      };
      setChatMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  // Premium features data
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

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mi Perfil</h1>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
                <AlertDialogDescription>
                  Estás a punto de cerrar tu sesión. ¿Deseas continuar?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90">
                  Cerrar Sesión
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-growth-light to-growth flex items-center justify-center">
                  {formData.avatar ? (
                    <img 
                      src={formData.avatar} 
                      alt="Avatar" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
                {isEditing && (
                  <button 
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-growth text-white hover:bg-growth/90 transition-colors"
                    onClick={() => {
                      const url = prompt("Ingresa la URL de tu avatar:");
                      if (url) setFormData({ ...formData, avatar: url });
                    }}
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* Show user name prominently */}
              {!isEditing && user?.name && (
                <h2 className="text-2xl font-semibold text-foreground mt-4">{user.name}</h2>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  readOnly={!isEditing}
                  className={`${
                    isEditing 
                      ? "border-primary ring-1 ring-primary/30 bg-background" 
                      : "bg-muted/30"
                  } ${!isNameValid && isEditing ? "border-destructive" : ""}`}
                />
                {!isNameValid && isEditing && (
                  <p className="text-xs text-destructive">El nombre no puede estar vacío</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    readOnly
                    className="flex-1 bg-muted/30 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  El correo está vinculado a tu cuenta y no puede modificarse
                </p>
              </div>

              {/* Registration date - read only */}
              <div className="space-y-2">
                <Label>Fecha de Registro</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(user?.registeredAt)}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {!isEditing ? (
                  <Button 
                    type="button"
                    onClick={handleStartEditing}
                    className="flex-1 bg-growth hover:bg-growth/90 text-white"
                  >
                    Editar Perfil
                  </Button>
                ) : (
                  <>
                    <Button 
                      type="submit"
                      disabled={!hasChanges || !isNameValid}
                      className="flex-1 bg-growth hover:bg-growth/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Guardar Cambios
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={handleCancelEditing}
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Card>

          {/* Klimba Premium Section */}
          <Card className="mt-6 p-6 bg-gradient-to-r from-accent/10 to-card border-accent/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-accent/20">
                <Crown className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Klimba Premium</h3>
                <p className="text-sm text-muted-foreground">
                  Desbloquea todas las funciones avanzadas
                </p>
              </div>
            </div>

            {/* Comparison: Free vs Premium */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Free */}
              <div className="p-4 bg-muted/30 rounded-lg border">
                <h4 className="font-semibold text-foreground mb-3">Versión Gratis</h4>
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
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
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

            {/* Demo Button */}
            <div className="text-center mb-6">
              <Button 
                onClick={() => setShowPremiumDemo(!showPremiumDemo)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Crown className="h-4 w-4 mr-2" />
                {showPremiumDemo ? "Ocultar demo Premium" : "Ver demo Premium"}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                * Esto es una demostración visual. No es una suscripción real.
              </p>
            </div>

            {/* Premium Demo: Virtual Assistant */}
            {showPremiumDemo && (
              <div className="animate-fade-in">
                <div className="p-4 bg-card rounded-lg border border-accent/20 mb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-full bg-accent/20">
                      <Bot className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">Asistente Klimba</h4>
                      <div className="flex items-center gap-1">
                        <PremiumBadge variant="badge" />
                        <span className="text-xs text-muted-foreground">Demo</span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="h-48 overflow-y-auto mb-4 space-y-3 p-3 bg-muted/30 rounded-lg">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg text-sm ${
                            message.isBot
                              ? "bg-background border text-foreground"
                              : "bg-accent text-accent-foreground"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Premium Notice */}
                  <div className="px-3 py-2 bg-accent/5 rounded-lg border border-accent/10 mb-3">
                    <p className="text-xs text-center text-muted-foreground">
                      <Crown className="h-3 w-3 inline mr-1" />
                      Asistente Premium – respuestas simuladas para demostración
                    </p>
                  </div>

                  {/* Chat Input */}
                  <div className="flex gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendChatMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendChatMessage} size="icon" className="bg-accent hover:bg-accent/90">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Simulated Premium Features */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Funciones en Desarrollo</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {simulatedFeatures.map((feature, i) => {
                      const Icon = feature.icon;
                      return (
                        <div key={i} className="p-3 bg-muted/30 rounded-lg border relative overflow-hidden opacity-75">
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
                            <div className="p-2 rounded-lg bg-background">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <h5 className="font-medium text-foreground text-sm">{feature.title}</h5>
                              <p className="text-xs text-muted-foreground">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-3 italic">
                    Estas funciones son conceptuales y no están implementadas en este prototipo académico.
                  </p>
                </div>
              </div>
            )}
          </Card>

          <Card className="mt-6 p-6 bg-gradient-to-r from-trust-light to-card border-trust/20">
            <h3 className="font-semibold text-foreground mb-2">Privacidad y Seguridad</h3>
            <p className="text-sm text-muted-foreground">
              Tus datos están seguros con nosotros. No solicitamos información bancaria 
              ni compartimos tus datos personales con terceros.
            </p>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
