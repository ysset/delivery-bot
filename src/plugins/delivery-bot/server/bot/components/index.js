const { modifyRequestWithUserData } = require('../../../botUtils/userController');
const callbacks = require('./componentList');

const index = {
    START: {
        regex: /\/start/,
        fn: async (msg) => {
            await modifyRequestWithUserData({ msg });
            await inlineCallBacks.ENTER_COMMAND(msg);
            return inlineCallBacks.DELETE_MESSAGE(msg);
        },
    },
};

const inlineCallBacks = {
    ENTER_COMMAND: callbacks.ENTER_COMMAND,
    DELETE_MESSAGE: callbacks.DELETE_MESSAGE,
};

module.exports = {
    commands: index,
    inlineCallBacks,
};
