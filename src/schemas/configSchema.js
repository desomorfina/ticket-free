const { Schema, model } = require('mongoose');

const configSchema = new Schema({
    GuildID: String,
    PanelTitle: String,
    PanelDescription: String,
    PanelImage: String,
    TicketTitle: String,
    TicketDescription: String,
});

module.exports = model('Config', configSchema);