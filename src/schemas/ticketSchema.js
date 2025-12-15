const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
    GuildID: String,
    MemberID: String,
    TicketID: String,
    ChannelID: String,
    Opened: Boolean,
});

module.exports = model('Ticket', ticketSchema);