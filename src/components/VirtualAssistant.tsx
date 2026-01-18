import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Crown, Bot, X } from "lucide-react";
import PremiumBadge from "./PremiumBadge";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

const MOCK_RESPONSES = [
  "Hola 👋 Soy tu asistente virtual de Klimba. Puedo ayudarte a entender tus deudas.",
  "Esta función está disponible en la versión Premium. ¡Actualiza para obtener ayuda personalizada!",
  "Pagar a tiempo ayuda a que tu jardín crezca 🌱 ¡Sigue así!",
  "Un tip: Prioriza las deudas con mayor tasa de interés para ahorrar dinero.",
  "¿Sabías que cada 5 deudas pagadas desbloqueas una nueva planta? 🌸",
  "Para acceder a consejos personalizados, necesitas la versión Premium.",
];

const VirtualAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! 👋 Soy el Asistente Virtual Premium de Klimba. Esta es una demo - la versión completa está disponible en Premium.",
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 md:w-96 h-[480px] flex flex-col shadow-xl z-50 animate-scale-in">
      {/* Header */}
      <div className="p-4 border-b bg-accent/10 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-accent/20">
            <Bot className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">Asistente Klimba</h3>
            <div className="flex items-center gap-1">
              <PremiumBadge variant="badge" />
              <span className="text-xs text-muted-foreground">Demo</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                message.isBot
                  ? "bg-muted text-foreground"
                  : "bg-accent text-accent-foreground"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Premium Notice */}
      <div className="px-4 py-2 bg-accent/5 border-t border-b">
        <p className="text-xs text-center text-muted-foreground">
          <Crown className="h-3 w-3 inline mr-1" />
          Asistente Premium – respuestas simuladas para demostración
        </p>
      </div>

      {/* Input */}
      <div className="p-4 flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe un mensaje..."
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} size="icon" className="bg-accent hover:bg-accent/90">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default VirtualAssistant;
