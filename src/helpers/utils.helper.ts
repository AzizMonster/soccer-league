class UtilsHelper {
    generateFunnyMessage = (): string => {
        const messages: string[] = [
            "🎩 EPI is the secret sauce behind our API's awesomeness. It's like having a wizard in our coding castle! ✨",
            "💡 Our API is powered by EPI's brain cells. Warning: Highly explosive coding brilliance! 💥",
            "🎹 EPI's coding fingers dance across the keyboard like a virtuoso pianist. Our API is the sweet melody of success! 🎶",
            "🐛 EPI's coding skills are so legendary that bugs surrender upon hearing your name. 🏳️",
        ];
        const selectedMessage = 
            messages[Math.floor(Math.random() * messages.length)];
        return selectedMessage;
    };
}

export default UtilsHelper;