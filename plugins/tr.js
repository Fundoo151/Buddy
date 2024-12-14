import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';

const handler = async (m, { args, usedPrefix, command }) => {
  const msg = `*USO CORRECTO DEL COMANDO ${usedPrefix + command} (idioma) (texto)*\n*EJEMPLO:*\n*${usedPrefix + command} es Hello*\n\n*CONOCE LOS IDIOMAS ADMITIDOS EN:*\n*- https://cloud.google.com/translate/docs/languages*`;
  
  if (!args || !args[0]) return m.reply(msg);
  
  let lang = args[0];
  let text = args.slice(1).join(' ');
  const defaultLang = 'es';

  if (lang.length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }

  if (!text.trim()) {
    return m.reply('*النص المطلوب ترجمته غير موجود. الرجاء إدخال النص بعد اللغة.*');
  }

  try {
    const result = await translate(text, { to: lang, autoCorrect: true });
    await m.reply('*TRADUCCION:* ' + result.text);
  } catch (error) {
    console.error(error);
    try {
      const lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${text}`);
      if (!lol.ok) throw new Error('API Response Error');
      const loll = await lol.json();
      const result2 = loll.result.translated;
      await m.reply('*TRADUCCION:* ' + result2);
    } catch (error2) {
      console.error(error2);
      await m.reply('خطأ في الترجمة. الرجاء المحاولة لاحقًا.');
    }
  }
};

handler.command = /^(translate|tr|trad)$/i;
export default handler;
