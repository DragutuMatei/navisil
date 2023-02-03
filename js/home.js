// import "https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js";
// import "https://www.gstatic.com/firebasejs/8.1.2/firebase-firestore.js";

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
// Salut! am mai apucat pe site sa
async function cats_maps ()  {
  await getCategories();
  $(".categories").html("");
    console.log(cats);

    cats.map((cat) => {
    $(".categories").append(`
      <a  href="" class="nav-item nav-link">
          ${cat.categorie}
          </a>`);
  });
};

cats_maps();
