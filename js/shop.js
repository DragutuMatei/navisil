// import Firestore from "./Firestore";

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
let prods = [];
const googleSignIn = async () => {
  try {
    const provider = new this.firebase.auth.GoogleAuthProvider();
    const result = await this.firebase.auth().signInWithPopup(provider);
    return result;
  } catch (error) {
    return error;
  }
};
// const firestore = new Firestore();

const getCategories = async () => {
  cats = [];
  await db
    .collection("categories")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        cats.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((err) => {});
};

async function cats_maps() {
  await getCategories();
  $(".categories").html("");
  //   console.log(cats);

  cats.map((cat) => {
    $(".categories").append(`
        <a  href="" class="nav-item nav-link">
            ${cat.categorie}
            </a>`);
  });
  await getProducts();
  $(".products").html("");
  prods.map((prod) => {
    $(".products").append(`
      <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
            <div class="product-item bg-light mb-4">
              <div class="product-img position-relative overflow-hidden">
                <img class="img-fluid w-100" src="img/product-1.jpg" alt="" />
                <div class="product-action">
                  <a class="btn btn-outline-dark btn-square" href=""
                    ><i class="fa fa-shopping-cart cos"></i
                  ></a>
                  <a class="btn btn-outline-dark btn-square" href=""
                    ><i class="far fa-heart"></i
                  ></a>
                  <a class="btn btn-outline-dark btn-square" href=""
                    ><i class="fa fa-sync-alt"></i
                  ></a>
                  <a class="btn btn-outline-dark btn-square" href=""
                    ><i class="fa fa-search"></i
                  ></a>
                </div>
              </div>
              <div class="text-center py-4">
                <a class="h6 text-decoration-none text-truncate" href=""
                  >${prod.nume}</a
                >
                <div
                  class="d-flex align-items-center justify-content-center mt-2"
                >
                  <h5>${prod.pret} RON</h5>
                 <!-- <h6 class="text-muted ml-2"><del>${prod.pret} RON</del></h6>
                -->
                 </div>
                <div
                  class="d-flex align-items-center justify-content-center mb-1"
                >
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small>(${prod.rating})</small>
                </div>
              </div>
            </div>
          </div>
      `);
  });
  const coss = document.querySelectorAll(".cos");
  // await getProducts(10);
}

async function click_cos(id) {
  // await
}

document.querySelector("#signin").addEventListener("click", async () => {
  const user = await googleSignIn();
  alert("logged in");
  console.log(user.user);
  // document.querySelector("#idk")
});

cats_maps();

const getProducts = async () => {
  prods = [];
  await db
    .collection("products")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        prods.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((err) => {});
};
