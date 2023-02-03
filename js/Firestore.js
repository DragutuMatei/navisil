class Firestore {
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Get a reference to the Firestore database
    this.db = firebase.firestore();
  }

  // Create a document in a collection
  createDocument(collectionName, data) {
    this.db
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
  readDocuments(collectionName) {
    this.db
      .collection(collectionName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }

  // Update a document in a collection
  updateDocument(collectionName, documentId, data) {
    this.db
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
  deleteDocument(collectionName, documentId) {
    this.db
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
