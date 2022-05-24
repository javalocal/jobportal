const { flatten } = require('express/lib/utils')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    divisi: {
        type: String,
        required: true
    },
   id_com: {
        type: String,
        required: true
    },
    name_com: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    u_date: {
        type: Date,
        required: true
    },
    last_edu: {
        type: String,
        required: true
    },
    edu: {
        type: Number,
        required: true
    },
    pengalaman: {
        type: Number,
        required: false
    },
    pengalaman_text: {
        type: String,
        required: false
    },
    kriteria: {
        type: String,
        required: true
    },
    fasilitas: {
        type: String,
        required: true
    },
    min_umur: {
        type: Number,
        required: true
    },
    max_umur: {
        type: String,
        required: true
    },
    
    
})

module.exports = mongoose.model('Jobs', userSchema, 'jobs')