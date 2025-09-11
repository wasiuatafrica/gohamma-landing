import { useState, useEffect } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function WhatsAppWidget() {
        const [isOpen, setIsOpen] = useState(false);
        const [shouldBlink, setShouldBlink] = useState(true);
        const whatsappNumber = "+234 906 556 6388";
        const whatsappLink = `https://wa.me/2349065566388?text=Hi! I'm interested in learning more about Hamma trading platform.`;

        // Stop blinking after 5 seconds
        useEffect(() => {
                const timer = setTimeout(() => {
                        setShouldBlink(false);
                }, 5000);

                return () => clearTimeout(timer);
        }, []);

        const handleWhatsAppClick = () => {
                window.open(whatsappLink, '_blank');
                setIsOpen(false);
        };

        return (
                <>
                        {/* Floating Chat Button */}
                        <div className="fixed bottom-6 right-6 z-50">
                                {!isOpen && (
                                        <Button
                                                onClick={() => setIsOpen(true)}
                                                className={`w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110 ${shouldBlink ? 'animate-pulse' : ''}`}
                                                size="sm"
                                        >
                                                <MessageCircle className="w-8 h-8 text-white" />
                                        </Button>
                                )}

                                {/* Chat Widget */}
                                {isOpen && (
                                        <Card className="w-80 bg-white dark:bg-gray-900 shadow-2xl border-0 animate-in slide-in-from-bottom-5 duration-300">
                                                <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                                                        <MessageCircle className="w-6 h-6" />
                                                                </div>
                                                                <div>
                                                                        <h3 className="font-semibold">Chat with us</h3>
                                                                        <p className="text-sm text-green-100">We're here to help!</p>
                                                                </div>
                                                        </div>
                                                        <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => setIsOpen(false)}
                                                                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                                                        >
                                                                <X className="w-4 h-4" />
                                                        </Button>
                                                </div>

                                                <CardContent className="p-6">
                                                        <div className="space-y-4">
                                                                {/* Welcome Message */}
                                                                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                                                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                                                                👋 Welcome to Hamma!
                                                                        </p>
                                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                                                Have questions about our trading platform? We're ready to help you get started!
                                                                        </p>
                                                                </div>

                                                                {/* Contact Info */}
                                                                <div className="border rounded-lg p-3 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                                                                        <div className="flex items-center space-x-2 mb-2">
                                                                                <Phone className="w-4 h-4 text-green-600" />
                                                                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                                        WhatsApp Support
                                                                                </span>
                                                                        </div>
                                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                                                {whatsappNumber}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                                                                Available: Mon-Fri, 9AM-6PM WAT
                                                                        </p>
                                                                </div>

                                                                {/* Quick Topics */}
                                                                <div className="space-y-2">
                                                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                                Quick Questions:
                                                                        </p>
                                                                        <div className="space-y-1">
                                                                                <button
                                                                                        onClick={() => window.open(`https://wa.me/2349065566388?text=Hi! How do I get started as a student on Hamma?`, '_blank')}
                                                                                        className="text-left w-full text-xs bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
                                                                                >
                                                                                        💡 How do I get started as a student?
                                                                                </button>
                                                                                <button
                                                                                        onClick={() => window.open(`https://wa.me/2349065566388?text=Hi! How can I become a mentor on Hamma?`, '_blank')}
                                                                                        className="text-left w-full text-xs bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
                                                                                >
                                                                                        🎓 How can I become a mentor?
                                                                                </button>
                                                                                <button
                                                                                        onClick={() => window.open(`https://wa.me/2349065566388?text=Hi! Tell me about the N10M prop accounts and 90% profit splits.`, '_blank')}
                                                                                        className="text-left w-full text-xs bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
                                                                                >
                                                                                        💰 About N10M prop accounts
                                                                                </button>
                                                                                <button
                                                                                        onClick={() => window.open(`https://wa.me/2349065566388?text=Hi! How does the fair refund system work?`, '_blank')}
                                                                                        className="text-left w-full text-xs bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
                                                                                >
                                                                                        🔒 Fair refund system
                                                                                </button>
                                                                        </div>
                                                                </div>

                                                                {/* Main WhatsApp Button */}
                                                                <Button
                                                                        onClick={handleWhatsAppClick}
                                                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3"
                                                                >
                                                                        <MessageCircle className="w-4 h-4 mr-2" />
                                                                        Start WhatsApp Chat
                                                                </Button>

                                                                {/* Privacy Note */}
                                                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                                                        By clicking above, you'll be redirected to WhatsApp. Your privacy is protected.
                                                                </p>
                                                        </div>
                                                </CardContent>
                                        </Card>
                                )}
                        </div>

                        {/* Backdrop */}
                        {isOpen && (
                                <div
                                        className="fixed inset-0 bg-black/20 z-40"
                                        onClick={() => setIsOpen(false)}
                                />
                        )}
                </>
        );
}