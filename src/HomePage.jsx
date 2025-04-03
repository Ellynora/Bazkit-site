import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({ name: "Гість", bonuses: 10 });
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Привіт! Я Бубусік — твій фарм-гід 💊 Запитай щось або обери тему нижче." }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Ти з нами, ${email}! Очікуй лист із сюрпризом 💌`);
    setEmail("");
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} додано до кошика 🛒`);
  };

  const handleChatMessage = (text) => {
    setChatMessages([...chatMessages, { from: "user", text }, { from: "bot", text: getBotReply(text) }]);
  };

  const getBotReply = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("втома")) return "Спробуй Solvit Ferrum — твій персональний джерело енергії.";
    if (lower.includes("стрес")) return "Stressnol допомагає адаптуватися до стресу — без звикання.";
    if (lower.includes("сон")) return "МагнеФол — мʼяка підтримка твоєї нервової системи.";
    return "Я ще навчаюсь 😉 але можу підказати щось із каталогу.";
  };

  const products = [
    {
      name: "Solvit Ferrum",
      tags: ["#втома", "#залізо", "#робота"],
      image: "/images/ferrum.png",
      description: "Повертає енергію, коли організм каже 'досить'. Ідеальний для тих, хто втомлюється від самої думки про зум."
    },
    {
      name: "Stressnol",
      tags: ["#стрес", "#кава", "#нерви"],
      image: "/images/stressnol.png",
      description: "Мʼякий адаптоген, що не притуплює, а підтримує. Створений для міських амазонок."
    },
    {
      name: "МагнеФол",
      tags: ["#сон", "#вагітність", "#спокій"],
      image: "/images/magnekvin-f.png",
      description: "Хелатна форма магнію + B6 + фолат. Для глибокого сну та ще глибшого видиху."
    },
    {
      name: "Артифар",
      tags: ["#печінка", "#важкість", "#жовч"],
      image: "/images/artifar.png",
      description: "Твоя печінка скаже дякую. А ти просто знову зможеш зʼїсти щось смачне без відчуття каменя."
    },
    {
      name: "Гепанекс",
      tags: ["#травлення", "#детокс", "#комбо"],
      image: "/images/hepanex.png",
      description: "Працює в парі з Артифаром як добрий друг після важкого застілля. Проти важкості й токсинів."
    }
  ];

  const getUpsell = (cartItems) => {
    const allTags = cartItems.flatMap((item) => item.tags);
    const suggested = products.find(
      (p) => !cartItems.includes(p) && p.tags.some((tag) => allTags.includes(tag))
    );
    return suggested;
  };

  const upsell = getUpsell(cart);

  return (
    <div className="bg-white text-gray-900 px-6 py-20 lg:px-24 space-y-24 relative">

      {/* Каталог продуктів */}
      <div className="max-w-6xl mx-auto space-y-10">
        <h2 className="text-3xl font-bold text-center">Наші продукти</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <CardContent className="p-6 space-y-4">
                {product.image && (
                  <img src={product.image} alt={product.name} className="w-full h-48 object-contain rounded-xl" />
                )}
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.tags.join(' ')}</p>
                <p className="text-gray-700">{product.description}</p>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full" onClick={() => handleAddToCart(product)}>
                  Додати в кошик
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Чат з Бубусіком */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={() => setChatOpen(!chatOpen)} className="rounded-full p-4 shadow-xl bg-pink-500 text-white">
          💬
        </Button>
        {chatOpen && (
          <div className="w-80 h-96 bg-white border border-gray-300 shadow-lg rounded-xl p-4 mt-4 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-2">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`text-sm p-2 rounded-lg ${msg.from === "bot" ? "bg-blue-100 text-left" : "bg-green-100 text-right"}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const text = e.target.elements.chat.value;
              handleChatMessage(text);
              e.target.reset();
            }} className="flex gap-2 mt-2">
              <Input name="chat" placeholder="Напиши щось..." className="flex-1" />
              <Button type="submit">⬆</Button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}
