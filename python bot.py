from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

BOT_TOKEN = "8735887668:AAG20snkuw8yoivx-iq-9p2ZZBkI3_wFZvc"
ADMIN_ID = 6521026373

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("مرحباً! أرسل رسالتك وسوف تصل للإدمن.")

async def forward_to_admin(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    if user.id == ADMIN_ID:
        return
    await update.message.reply_text("تم استلام رسالتك")
    await context.bot.send_message(chat_id=ADMIN_ID, text=f"رسالة من {user.first_name}:\n{update.message.text}")

async def reply_to_user(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_user.id != ADMIN_ID:
        return
    try:
        user_id = int(context.args[0])
        text = " ".join(context.args[1:])
        await context.bot.send_message(chat_id=user_id, text=f"رد من الإدمن:\n{text}")
        await update.message.reply_text("تم الإرسال")
    except:
        await update.message.reply_text("استخدم: /reply ايدي المستخدم رسالتك")

def main():
    app = Application.builder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("reply", reply_to_user))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, forward_to_admin))
    print("شغال")
    app.run_polling()

if __name__ == "__main__":
    main()