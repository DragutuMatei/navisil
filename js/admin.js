// import "https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js";
// import "https://www.gstatic.com/firebasejs/8.1.2/firebase-firestore.js";

// // pula

// var firebaseConfig = {
//   apiKey: "AIzaSyAA7EhvqsU84_G03JK4Z_98M_z0cxsua8c",
//   authDomain: "ecommerce-ed019.firebaseapp.com",
//   databaseURL:
//     "https://ecommerce-ed019-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "ecommerce-ed019",
//   storageBucket: "ecommerce-ed019.appspot.com",
//   messagingSenderId: "366894312098",
//   appId: "1:366894312098:web:1a7616c26abdb324c1c5fb",
//   measurementId: "G-KC7EV6D3TM",
// };
// firebase.initializeApp(firebaseConfig);

// // Initialize Firestore
// var db = firebase.firestore();

// async function adaugaCategorie(data) {
//   data.preventDefault();

//   const cate = data.target.categorie.value;
//   db.collection("categories")
//     .add({
//       categorie: cate,
//       date: firebase.firestore.FieldValue.serverTimestamp(),
//     })
//     .then(function (docRef) {
//       //console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function (error) {
//       //console.error("Error adding document: ", error);
//     });

//   await cats_maps();

//   document.querySelectorAll("#cate input").forEach((input) => {
//     input.value = "";
//   });
// }
// document.querySelector("#cate").onsubmit = adaugaCategorie;
// let cats = [];

// const getCategories = async () => {
//   cats = [];
//   await db
//     .collection("categories")
//     .orderBy("date", "desc")
//     .get()
//     .then((snapshot) => {
//       snapshot.forEach((doc) => {
//         cats.push({ ...doc.data(), id: doc.id });
//         //console.log(doc.id, "=>", doc.data());
//       });
//     })
//     .catch((err) => {
//       //console.log("Error getting documents", err);
//     });
// };

// const adauga_clicks_cat = () => {
//   const hiddens_cat = document.querySelectorAll(".cat .id_cat");
//   document.querySelectorAll(".delete").forEach((del, index) => {
//     del.addEventListener("click", async () => {
//       //console.log("click la ", index);
//       await detele_orice("categories", hiddens_cat[index].value);
//     });
//   });
// };

// const cats_maps = async () => {
//   await getCategories();
//   $(".catmap").html("");

//   cats.map((cat) => {
//     $(".catmap").append(`
//       <div class="cat">
//           <h1>${cat.categorie}</h1>
//           <input type='hidden' value="${cat.id}" class='id_cat'/>
//           <button class='delete'>delete</button>

//           </div>`);
//   });
//   adauga_clicks_cat();
// };
// await cats_maps();

// async function detele_orice(col, id) {
//   await db
//     .collection(col)
//     .doc(id)
//     .delete()
//     .then(() => {
//       //console.log("Document successfully deleted!");
//     })
//     .catch((error) => {
//       //console.error("Error removing document: ", error);
//     });
//   await cats_maps();
// }

import Firestore from "./Firestore.js";

const fire = new Firestore();

document.querySelector("#cate").onsubmit = async (e) => {
  e.preventDefault();

  const cate = e.target.categorie.value;

  await fire.createDocument("categories", {
    categorie: cate,
    date: firebase.firestore.FieldValue.serverTimestamp(),
  });
  document.querySelectorAll("#cate input").forEach((input) => {
    input.value = "";
  });
  await updates();
};

const updates = async () => {
  $(".catmap").html("");
  $("#categ_select").html("<option value=''>chose one</option>");
  const docss = await fire.readDocuments("categories");
  docss.map((cat) => {
    $(".catmap").append(`
        <div class="cat">
            <h1>${cat.categorie}</h1>
            <input type='hidden' value="${cat.id}" class='id_cat'/>
            <button class='delete'>delete</button>
        </div>`);
    $("#categ_select").append(
      `<option value="${cat.categorie}">${cat.categorie}</option>`
    );
  });
  adauga_clicks_cat();
};
const adauga_clicks_cat = async () => {
  const hiddens_cat = document.querySelectorAll(".cat .id_cat");
  document.querySelectorAll(".delete").forEach((del, index) => {
    del.addEventListener("click", async () => {
      console.log("click la ", hiddens_cat[index].value, index);
      await fire.deleteDocument("categories", hiddens_cat[index].value);
      await updates();
    });
  });
};

await updates();

//------------------------------PRODUCTS-------------------------
document.querySelector("#prod").onsubmit = async (e) => {
  e.preventDefault();

  const data = e.target;
  await fire.createDocument("products", {
    nume: data.nume.value,
    descriere_lunga: data.descriereL.value,
    descriere_scurta: data.descriereS.value,
    info: data.info.value,
    categories: data.categorie.value,
    cantitate: data.cantitate.value,
    pret: data.pret.value,
    rating: data.rating.value,
    date: firebase.firestore.FieldValue.serverTimestamp(),
  });
  document
    .querySelectorAll("#produse input, #produse textarea")
    .forEach((input) => {
      input.value = "";
    });
  await updates_P();
};

const updates_P = async () => {
  $(".produ").html("");
  $("#categ_select").html("<option value=''>chose one</option>");
  const docss = await fire.readDocuments("products");
  console.log(docss);
  docss.map((prod) => {
    $(".produ").append(`
        <div class="prod">
            <h1>${prod.nume}</h1>
            <p>${prod.descriere_lunga}</p>
            <p>${prod.descriere_scurta}</p>
            <p>${prod.info}</p>
            <input type='hidden' value="${prod.id}" class='id_prod'/>
            <h1>Categorie: ${prod.categories}</h1>
            <h1>Cantitate: ${prod.cantitate}</h1>
            <h1>Pret: ${prod.pret}</h1>
            <h1>Rating: ${prod.rating}</h1>
            <button class='deleteP'>delete</button>
        </div>`);
  });
  const cats = await fire.readDocuments("categories");
  cats.map((cat) => {
    $("#categ_select").append(
      `<option value="${cat.categorie}">${cat.categorie}</option>`
    );
  });
  adauga_clicks_cat_P();
};
const adauga_clicks_cat_P = async () => {
  const hiddens_cat = document.querySelectorAll(".prod .id_prod");
  document.querySelectorAll(".deleteP").forEach((del, index) => {
    del.addEventListener("click", async () => {
      console.log("click la ", hiddens_cat[index].value, index);
      await fire.deleteDocument("products", hiddens_cat[index].value);
      await updates_P();
    });
  });
};

await updates_P();

// document.querySelector("#login").addEventListener("click", async () => {
//   await fire.googleSignIn();
//   console.log(fire.getUser());
// });
