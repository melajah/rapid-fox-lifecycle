//  saya ingin membuat fitur login
    // email dan password
    // ketika saya click btn login, maka saya akan menyimpan localstorage

function canvas() {
    document.getElementById("canvas").innerHTML = "<h1>Ini adalah canvas</h1>"
}
new Vue({
    el: "#app",
    data: {
        email: "",
        password: "",
        isLoggedIn: false,
        users: [],
        message: "",
        msgAlert: ""
    },
    watch: {
        message(newVal, oldVal) {
            console.log(newVal, "newVal from message")
            console.log(oldVal, "oldVal from message")
        },
        isLoggedIn(newVal) {
            if (newVal) {
                this.msgAlert = "kamu berhasil login"
                setTimeout(() => {
                    this.msgAlert = ""
                }, 1000)
            }else {
                this.msgAlert = "kamu berhasil logout"
                setTimeout(() => {
                    this.msgAlert = ""
                }, 1000)
            }
        }
    },
    computed: {
        reversedMsg() {
            return this.message.split('').reverse().join('')
        },
        usersByInstruktur() {
            return this.users.filter(user => user.jabatan == "instruktur")
        },
        usersByMurid() {
            return this.users.filter(user => user.jabatan == "murid")
        }
    },
    methods: {
        login() { 
            localStorage.setItem("token", "fake token")
            this.isLoggedIn = true
            this.getUsers()
        },
        getUsers() {
            axios({
                method: "get",
                url: "http://localhost:3000/users",
                headers: {
                    access_token: localStorage.token
                }
            })
            .then(response => {
                console.log(response)
                this.users = response.data
            })
            .catch(err => console.log(err))
        }
    },
    created() {
        console.log("ini adalah created")
        console.log(document.getElementById("app"))
        if (localStorage.token) {
            this.isLoggedIn = true
            this.getUsers()
        }
    },
    mounted() {
        console.log("ini adalah mounted")
        console.log(document.getElementById("app"))
        // canvas()
    }
})

// created => data sudah bisa digunakan
/*case created => {
    1. pengecekan token (apakah sudah login ?)
    2. memanggil proses async
}*/ 

// mounted => html sudah tercompile menjadi html biasa
/*
    memanipulasi dom
      - penggunakan canvas library
*/ 


/*
    jadi saya memiliki data users dari database
    dan saya menampilkan di aplikasi yang sekarang buat.
    hit server, akan saya panggil setelah login
    setelah browser di refresh dan dialam condition pengecekan token
*/ 

/*
    computed: biasa digunakan untuk mengolah data/ngfilter data dan mengembalikan nilai
*/ 

/*
    watch: 
*/ 