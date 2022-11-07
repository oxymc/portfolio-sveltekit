import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, addDoc, getFirestore, getDocs, updateDoc, deleteDoc } from "firebase/firestore/lite";
import sha256 from 'crypto-js/sha256';
import { updateAdminStatus } from "./lib/stores/userStore";
import { updateAboutData } from './lib/stores/aboutStore';
import { updateLearnData } from './lib/stores/learnStore';
import { updateSkillsDataList, resetDataForAdd } from './lib/stores/skillsStore';
import { updateLoading } from './lib/stores/globalStore';
import { updateDB } from "./lib/functions/updateDB";

// Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_DB_API_KEY}`,
  authDomain: "portfolio-2f4f1.firebaseapp.com",
  projectId: "portfolio-2f4f1",
  storageBucket: "portfolio-2f4f1.appspot.com",
  messagingSenderId: "133697041942",
  appId: "1:133697041942:web:32d7893cfa78f5689fa737"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ABOUT_DB_ID = `${import.meta.env.VITE_DB_ABOUT_ID}`

//Get About info
const getAboutDoc = async (id: string) => {
  const docRef = doc(db, "about", id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    updateAboutData(docSnap.data());
    updateLoading(false)
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
//Get skills info
const getSkillsDoc = async () => {
  const querySnapshot = await getDocs(collection(db, "skills"));
  const skillsArray: any[] = []
  
  querySnapshot.forEach((doc) => {
    const allData: any = doc.data()
    allData.id = doc.id 
    skillsArray.push(allData)
  });
  updateSkillsDataList(skillsArray);
  return skillsArray;
}
//Get learning now info
const getLearningDoc = async () => {
  const querySnapshot = await getDocs(collection(db, "learning_now"));
  const learningArray: any[] = []
  
  querySnapshot.forEach((doc) => {
    const allData: any = doc.data()
    allData.id = doc.id 
    learningArray.push(allData)
  });
  updateLearnData(learningArray);
  return learningArray;
}

//Add Skills info
async function addSkillsDoc(thisObject: any, name: string, description: string, icon: string, status: boolean, order: number) {
  if(name) {
    await addDoc(collection(db, "skills"), {
      name: name,
      description: description || '',
      icon: icon || '',
      status: status || false,
      order: order
    }).then(
      () => {
        thisObject.reset()
        resetDataForAdd()
        getSkillsDoc()
        updateDB(false)
      }
    ).catch(error => updateDB(error.message));
  }
  else {
    return false;
  }
}
//Add Learning now info
async function addLearningDoc(thisObject: any, name: string, value: number) {
  if(name) {
    await addDoc(collection(db, "learning_now"), {
      name: name,
      value: value || 0
    }).then(
      () => {
        thisObject.reset()
        getLearningDoc()
        updateDB(false)
      }
    ).catch(error => updateDB(error.message));
  }
  else {
    return false;
  }
}

//change About info
const setAboutDoc = async (aboutData: { current_position: string; current_skills: string; full_desc: string; }) => {
  const docRef = doc(db, "about", ABOUT_DB_ID);
  await updateDoc(docRef, {
    current_position: aboutData.current_position,
    current_skills: aboutData.current_skills,
    full_desc: aboutData.full_desc
  }).then(
      () => {
        getAboutDoc(ABOUT_DB_ID)
        updateDB(false);
      }
    ).catch(error => updateDB(error.message));
}
//change Learning now info
const setLearningDoc = async (data: any) => {
  const docRef = doc(db, "learning_now", data.id);
  await updateDoc(docRef, data).then(
      () => {
        getLearningDoc();
        updateDB(false);
      }
    ).catch(error => updateDB(error.message));
}
//change Skills info
const setSkillDoc = async (data: any) => {

  const docRef = doc(db, "skills", data.id);

  await updateDoc(docRef, data).then(
      () => {
        getSkillsDoc();
        updateDB(false);
      }
    ).catch(error => updateDB(error.message));
}

//delete Learning now info
const removeLearnItem = async (data: any) => {
  await deleteDoc(doc(db, "learning_now", data.id)).then(
    () => {
      getLearningDoc();
      updateDB(false);
    }
  ).catch(error => updateDB(error.message));
}

//Auth for admin
const login = (userdata: { email: string; pass: string }) => {
    if(userdata.email && userdata.pass){
      const hashedPass = sha256(userdata.pass);
      signInWithEmailAndPassword(auth, userdata.email, hashedPass.toString())
        .then(() => {
          sessionStorage.setItem('logined', 'true');
          updateAdminStatus(true)
        })
        .catch((error) => {
          const errorMessage = error.message;
          sessionStorage.setItem('logined', 'false');
          updateAdminStatus(false)
          console.log(errorMessage)
        });
    } 
  else {
      console.log('fill in both fields');
  } 
}
const logout = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    sessionStorage.setItem('logined', 'false');
    updateAdminStatus(false)
  }).catch((error) => {
    console.log(error.message)
  });
}

export {
    auth,
    login,
    logout,
    getAboutDoc,
    getSkillsDoc,
    getLearningDoc,
    addSkillsDoc,
    addLearningDoc,
    setAboutDoc,
    setLearningDoc,
    setSkillDoc,
    removeLearnItem
}