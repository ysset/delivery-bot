const {
   enterCommand,
   deleteCurrentMessage,
} = require('./inlineCommands');

const commands = {
   ENTER_COMMAND: enterCommand,
   DELETE_MESSAGE: deleteCurrentMessage,
};

module.exports = commands;
