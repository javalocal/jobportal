const { flatten } = require('express/lib/utils')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    role: {
        type: String,
        required: false
    },
   first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    tmp_lahir: {
        type: String,
        required: false
    },
    tgl_lahir: {
        type: Date,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    provinsi: {
        type: String,
        required: true
    },
    pendidikan_terakhir: {
        type: Number,
        required: false
    },
    pendidikan_text: {
        type: String,
        required: false
    },
    pendidikan: {
        type: String,
        required: false
    },
    jurusan: {
        type: String,
        required: false
    },
    pengalaman: {
        type: Number,
        required: false
    },
    nomor: {
        type: String,
        required: false
    },
    ket: {
        type: String,
        required: false
    },
    pengalaman_text: {
        type: String,
        required: false
    },
    skill: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    name: {
        type: String,
        required: false
    },
    umur: {
        type: Number,
        required: false
    },
})

module.exports = mongoose.model('User', userSchema, 'account')