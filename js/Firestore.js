import "https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.1.2/firebase-firestore.js";
// import "https://www.gstatic.com/firebasejs/8.1.2/firebase-auth.js";

export default class Firestore {
  constructor() {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyAA7EhvqsU84_G03JK4Z_98M_z0cxsua8c",
      authDomain: "ecommerce-ed019.firebaseapp.com",
      databaseURL:
        "https://ecommerce-ed019-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "ecommerce-ed019",
      storageBucket: "ecommerce-ed019.appspot.com",
      messagingSenderId: "366894312098",
      appId: "1:366894312098:web:1a7616c26abdb324c1c5fb",
      measurementId: "G-KC7EV6D3TM",
    });

    // Get a reference to the Firestore database
    this.db = firebase.firestore();
  }
  
  async googleSignIn() {
    try {
      const provider = new this.firebase.auth.GoogleAuthProvider();
      console.log("adkjfbdskfbjakj");
      const result = await this.firebase.auth().signInWithPopup(provider);
      this.user = result.user;
      console.log(result);
      console.log(result.user);
      return this.user;
    } catch (error) {
      console.log(error)
      return error;
    }
  }
  getUser() {
    return this.user;
  }

  // Create a document in a collection
 async createDocument(collectionName, data) {
   await this.db
      .collection(collectionName)
      .add(data)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  // Read all documents in a collection
  async readDocuments(collectionName) {
    let docs = [];
    await this.db
      .collection(collectionName)
      .orderBy("date", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
          // console.log(doc.id, "=>", doc.data());
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
    // console.log(docs)
    return docs;
  }

  // Update a document in a collection
  async updateDocument(collectionName, documentId, data) {
    await this.db
      .collection(collectionName)
      .doc(documentId)
      .update(data)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }

  // Delete a document from a collection
  async deleteDocument(collectionName, documentId) {
   await this.db
      .collection(collectionName)
      .doc(documentId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
}
