const { userLang } = require('../../botUtils/language');

/**
 * @param msg
 * @returns {Promise<{chatId: *, messageId: *, user: *}>}
 */
const getUser = async (msg) => {
   const messageId = msg.message?.message_id || msg.message_id;
   const userID = msg.from?.id;

   const user = await strapi.db
     .query('api::telegram-user.telegram-user')
     .findOne({
        where: {
           telegramID: userID,
        },
        populate: true,
     })
     .catch(console.error);

   return {
      chatId: userID,
      messageId,
      user,
   };
};

/**
 * @param msg
 * @returns {Promise<*&{chatId: *, localisation: *, messageId: *, user: *}>}
 */
const modifyRequestWithUserData = async ({ msg }) => {
   let { user, messageId, chatId } = await getUser(msg);

   if (!user)
      user = await strapi.entityService
        .create('api::telegram-user.telegram-user', {
           data: {
              telegramID: msg.from.id,
              language: msg.from.language_code,
              username: msg.from.username,
           },
        })
        .catch(console.error);

   return {
      ...msg,
      user,
      localisation: userLang(user.language),
      messageId,
      chatId,
   };
};
/**
 * @type {{modifyRequestWithUserData: (function({msg: *}): Promise<*&{chatId: *, localisation: *, messageId: *, user: *}>), getUser: (function(*): Promise<{chatId: *, messageId: *, user: *}>)}}
 */
module.exports = {
   modifyRequestWithUserData,
   getUser,
};
