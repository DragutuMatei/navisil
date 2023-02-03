import "https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.1.2/firebase-firestore.js";

export default class DataBase {
  #firebaseConfig = {
    apiKey: "AIzaSyAA7EhvqsU84_G03JK4Z_98M_z0cxsua8c",
    authDomain: "ecommerce-ed019.firebaseapp.com",
    databaseURL:
      "https://ecommerce-ed019-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ecommerce-ed019",
    storageBucket: "ecommerce-ed019.appspot.com",
    messagingSenderId: "366894312098",
    appId: "1:366894312098:web:1a7616c26abdb324c1c5fb",
    measurementId: "G-KC7EV6D3TM",
  };
  db;
  #cats = [];

  constructor() {
    firebase.initializeApp(this.#firebaseConfig);
    this.db = firebase.firestore();
  }

  async getCategories() {
    this.#cats = [];
    await this.db
      .collection("categories")
      .orderBy("date", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.#cats.push({ ...doc.data(), id: doc.id });
          //console.log(doc.id, "=>", doc.data());
        });
      })
      .catch((err) => {
        //console.log("Error getting documents", err);
      });
  }

  adauga_clicks_cat() {
    const hiddens_cat = document.querySelectorAll(".cat .id_cat");
    document.querySelectorAll(".delete").forEach((del, index) => {
      del.addEventListener("click", async () => {
        //console.log("click la ", index);
        await this.detele_orice("categories", hiddens_cat[index].value);
      });
    });
  }

  async cats_maps() {
    await this.getCategories();
    $(".catmap").html("");

    this.#cats.map((cat) => {
      $(".catmap").append(`
        <div class="cat">
            <h1>${cat.categorie}</h1>
            <input type='hidden' value="${cat.id}" class='id_cat'/>
            <button class='delete'>delete</button>
  
            </div>`);
    });
    this.adauga_clicks_cat();
  }

  async adaugaCategorie(data) {
    data.preventDefault();

    const cate = data.target.categorie.value;
    // console.log(data.target.categorie.value);
    await this.db
      .collection("categories")
      .add({
        categorie: cate,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function (docRef) {
        //console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        //console.error("Error adding document: ", error);
      });

    await this.cats_maps();

    document.querySelectorAll("#cate input").forEach((input) => {
      input.value = "";
    });
  }

  async detele_orice(col, id) {
    await this.db
      .collection(col)
      .doc(id)
      .delete()
      .then(() => {
        //console.log("Document successfully deleted!");
      })
      .catch((error) => {
        //console.error("Error removing document: ", error);
      });
    await this.cats_maps();
  }
}
