const { flatten } = require('express/lib/utils')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    
    date: {
        type: String,
        required: true
    },
    idjob: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    divisi: {
        type: String,
        required: true
    },
    iduser: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    last_edu: {
        type: String,
        required: true
    },
    pengalaman: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Apply', userSchema, 'apply')