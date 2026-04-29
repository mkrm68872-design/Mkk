import os
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# ========== إعدادات البوت (عدلهم هنا) ==========
BOT_TOKEN = "8735887668:AAG20snkuw8yoivx-iq-9p2ZZBkI3_wFZvc" 
ADMIN_ID = 6521026373         # 🚨 حط رقم معرفك الشخصي هنا (رقم فقط)
# =============================================

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """رسالة ترحيبية للمستخدمين الجدد"""
    await update.message.reply_text(
        "👋 أهلاً بك! أنا بوت وسيط.\n"
        "✅ أي رسالة هتبعتها هتوصلك للإدمن المسؤول.\n"
        "🙏 من فضلك اكتب رسالتك، وهيوصلها له بأسرع وقت."
    )

async def forward_to_admin(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """وظيفة إعادة توجيه أي رسالة من المستخدم إلى الأدمن"""
    user = update.effective_user
    user_id = user.id
    user_name = user.first_name
    username = f"@{user.username}" if user.username else "لا يوجد يوزرنيم"

    # لو الرسالة من الأدمن نفسه، نتجاهلها عشان ما نعملش حلقة لا نهائية
    if user_id == ADMIN_ID:
        return

    # إعلام المستخدم إن رسالته وصلت
    await update.message.reply_text("📨 تم استلام رسالتك، شكراً لك!")

    # تجهيز النص اللي هيتوجه للأدمن
    admin_message = (
        f"📩 **رسالة جديدة من مستخدم**\n"
        f"👤 **الاسم:** {user_name}\n"
        f"🆔 **المعرف:** {username}\n"
        f"🆔 **الـ ID:** `{user_id}`\n"
        f"📝 **النص:** {update.message.text}"
    )

    # إرسال الرسالة للأدمن
    await context.bot.send_message(chat_id=ADMIN_ID, text=admin_message, parse_mode="Markdown")

async def reply_to_user(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """وظيفة رد الأدمن على مستخدم معين"""
    # التأكد إن اللي بيكتب الأمر هو الأدمن نفسه
    if update.effective_user.id != ADMIN_ID:
        await update.message.reply_text("⛔ هذا الأمر مخصص للإدمن فقط.")
        return

    # التأكد إن الأدمن كتب المعرف والرسالة
    if not context.args or len(context.args) < 2:
        await update.message.reply_text(
            "❗ **طريقة الاستخدام:**\n"
            "`/reply [معرف المستخدم] [رسالتك]`\n\n"
            "📌 **مثال:**\n"
            "`/reply 123456789 مرحباً بك في خدمة الدعم!`",
            parse_mode="Markdown"
        )
        return

    try:
        # استخراج معرف المستخدم (أول رقم بعد الأمر)
        target_user_id = int(context.args[0])
        
        # استخراج نص الرسالة (كل الكلام بعد المعرف)
        reply_text = " ".join(context.args[1:])
        
        # إرسال الرد للمستخدم
        await context.bot.send_message(
            chat_id=target_user_id, 
            text=f"📩 **رد من الإدمن:**\n{reply_text}",
            parse_mode="Markdown"
        )
        
        # تأكيد للأدمن إن الرد ات发送
        await update.message.reply_text(f"✅ تم إرسال الرد إلى المستخدم `{target_user_id}` بنجاح!", parse_mode="Markdown")
        
    except ValueError:
        await update.message.reply_text("❌ المعرف يجب أن يكون رقماً فقط!\nمثال: `/reply 123456789 نص الرسالة`", parse_mode="Markdown")
    except Exception as e:
        await update.message.reply_text(f"❌ فشل إرسال الرد: {str(e)}")

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """عرض الأوامر المتاحة"""
    await update.message.reply_text(
        "📖 **الأوامر المتاحة:**\n\n"
        "/start - بدء المحادثة مع البوت\n"
        "/help - عرض هذه المساعدة\n\n"
        "👑 **أوامر الإدمن فقط:**\n"
        "/reply [ID] [رسالة] - الرد على مستخدم معين\n\n"
        "💡 **ملاحظة:** أي رسالة ترسلها للبوت توصل تلقائياً للإدمن.",
        parse_mode="Markdown"
    )

def main():
    """تشغيل البوت"""
    # إنشاء التطبيق
    app = Application.builder().token(BOT_TOKEN).build()
    
    # إضافة معالجات الأوامر
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("reply", reply_to_user))
    
    # معالجة أي رسالة نصية (ما عدا الأوامر)
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, forward_to_admin))
    
    # تشغيل البوت
    print("✅ البوت شغال... في انتظار الرسائل")
    app.run_polling()

if __name__ == "__main__":
    main()