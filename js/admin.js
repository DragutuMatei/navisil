import "https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.1.2/firebase-firestore.js";

var firebaseConfig = {
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
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
var db = firebase.firestore();

async function adaugaCategorie(data) {
  data.preventDefault();

  const cate = data.target.categorie.value;
  db.collection("categories")
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

  await cats_maps();

  document.querySelectorAll("#cate input").forEach((input) => {
    input.value = "";
  });
}
document.querySelector("#cate").onsubmit = adaugaCategorie;
let cats = [];

const getCategories = async () => {
  cats = [];
  await db
    .collection("categories")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        cats.push({ ...doc.data(), id: doc.id });
        //console.log(doc.id, "=>", doc.data());
      });
    })
    .catch((err) => {
      //console.log("Error getting documents", err);
    });
};

const adauga_clicks_cat = () => {
  const hiddens_cat = document.querySelectorAll(".cat .id_cat");
  document.querySelectorAll(".delete").forEach((del, index) => {
    del.addEventListener("click", async () => {
      //console.log("click la ", index);
      await detele_orice("categories", hiddens_cat[index].value);
    });
  });
};

const cats_maps = async () => {
  await getCategories();
  $(".catmap").html("");

  cats.map((cat) => {
    $(".catmap").append(`
      <div class="cat">
          <h1>${cat.categorie}</h1>
          <input type='hidden' value="${cat.id}" class='id_cat'/>
          <button class='delete'>delete</button>

          </div>`);
  });
  adauga_clicks_cat();
};
await cats_maps();

async function detele_orice(col, id) {
  await db
    .collection(col)
    .doc(id)
    .delete()
    .then(() => {
      //console.log("Document successfully deleted!");
    })
    .catch((error) => {
      //console.error("Error removing document: ", error);
    });
  await cats_maps();
}

// import DataBase from "./Database.js";

// const database = new DataBase();
// database.cats_maps();
// document.querySelector("#cate").onsubmit = await database.adaugaCategorie;
